<?php

namespace App\Resolvers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Auth;
use \App\Models\User\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

/**
 * Created by PhpStorm.
 * User: halphass
 * Date: 15/03/16
 * Time: 10:13
 */
class StatusResolver
{
    protected $model;
    protected $status;
    protected $user;
    protected $flow;


    protected $statusController;
    protected $statusForeignKey;
    protected $flow_tree;

    protected $next_statuses=[];

    /*
    TODO: [MAYBE] trovare modo furbo x aggiungere la possibilità di fare delle azioni prima e dopo il cambio status: es: notifica e/o email ?
            'before'    =>  [],
            'after'    =>  [],
    */

    public function __construct(Model $model, $user=false)
    {
        if(!$model->exists)
            throw (new ModelNotFoundException)->setModel(get_class($model));

        $this->model = $model;

        $this->status = $this->model->status;

        if(!is_bool($user) && $user instanceof User)
            $this->user = $user;
        else
            $this->user = \Auth::user();

        /*
         * Status Change Flow Tree
         */
        $this->flow_tree = config('nilde_flow.status_resolver.'.get_class($this->model).'.flow_tree');

        /*
         * check status change possibilities
         */
        $this->verifyNextStatuses();

        return $this;
    }

    /**
     * Define the status's possibility to change.
     *
     * @param  void
     * @return $this
     */
    public function verifyNextStatuses(){
        $this->flow = collect($this->flow_tree[$this->status]);
        if($this->flow->has('next_statuses'))
        {
            foreach ($this->flow->get('next_statuses') as $next) {
                $this->next_statuses[$next] = [
                    'name'  => $next,
                    'user_could_proceed' => $this->checkRole($next),
                    'errors'    =>  $this->checkConstraint($next)
                ];
            }
        }
        $this->next_statuses = collect($this->next_statuses);
        return $this;
    }


    /**
     * Verify all Constraints for the status change.
     *
     * @param  string status
     * @return array errors
     */
    public function checkConstraint($status)
    {
        $errors = [];
        if(Arr::has($this->flow_tree,"$status.constraints"))
        foreach ($this->flow_tree[$status]['constraints'] as $constraint)
        {
            $verify = $this->model->$constraint();
            if( is_bool($verify) && !$verify )
                $errors[] = trans(get_class($this->model).'.status.not_'.$constraint);
            elseif( (is_array($verify) && count($verify)>0) )
                $errors = array_merge($errors,$verify);
        }
//        if(count($errors))
//            exit(print_r($errors));
        return $errors;
    }



    /**
     * Verify users permissions to change status.
     *
     * @param  string status
     * @return boolean
     */
    public function checkRole($status)
    {
        return $this->user->hasRole($this->flow_tree[$status]['role']);
    }


    /**
     * Change Status Process.
     *
     * @param  string $newStatus
     * @return request's response
     */
    public function changeStatus($newStatus,$others=null,$userCheck=true)
    {
       
        if($newStatus === $this->status)
            return $this->model->status;
        /*
         * check if status could be changed
         */
        if(!$this->next_statuses->has($newStatus))
            throw new \Illuminate\Auth\Access\AuthorizationException('Unacceptable Status Change.');

        $possibility = $this->next_statuses->get($newStatus);

        /*
         * check if user can change status
         */
        if($userCheck && !$possibility['user_could_proceed'])
            throw new \Illuminate\Auth\Access\AuthorizationException('This User has no right to Change Status.');

        /*
         * validate change
         */
        if(count($possibility['errors']) > 0)
            throw new \Dingo\Api\Exception\ValidationHttpException([$possibility['errors']]);

        $status = [
            'status'    =>  $newStatus,
        ];
        if(is_array($others))
            $status = array_merge($others,$status);

        foreach ($status as $k=>$v)
        {
            $this->model->setAttribute($k,$v);
        }    

        $this->model->save();

        //jobs() => chiamare la dispatch sui singoli jobs....
        //notify()...
        return $this->model;
    }

    public function jobs() {
        //executing jobs
    }

    public function notify()
    {
        //TODO: PULIRE PULIRE PULIRE.
        $this->flow = collect($this->flow_tree[$this->model->status()->first()->status]);
        $collection = new Collection();
        if($this->flow->has('notify'))
        {
            foreach ($this->flow->get('notify') as $entity=>$method) {
                switch ($entity){
                    case 'Model':
                        $items = $this->model->$method()->get();
                        if($items->count())
                        {
                                foreach ($items as $item) {
                                    $collection->add($item);
                                }
                        }
                        break;
                    case 'User':
                        $items = User::$method()->get();
                        if($items->count())
                        {
                                foreach ($items as $item) {
                                    $collection->add($item);
                                }
                        }
                        break;
                }
            }
            return $collection->unique();
        }
        return false;
    }

}
