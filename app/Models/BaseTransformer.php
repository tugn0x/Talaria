<?php
/**
 * Created by INKODE soc. coop.
 * User: Giorgio Resci
 * Email: giorgio@inkode.it
 */

namespace App\Models;

use League\Fractal\TransformerAbstract;
use Illuminate\Database\Eloquent\Model;
use Auth;


class BaseTransformer extends TransformerAbstract
{

    private $disallow_policy;

    protected $policy = [
        // 'permission_name' => ['fields_or_includes_to_hide']
    ];

    public function __construct($disallow_policy = false)
    {
        $this->disallow_policy = $disallow_policy;
    }

    private function getPolicy()
    {
        return $this->policy;
    }

    public function isPolicyDisallowed()
    {
        return $this->policy;
    }

    protected function applyPolicy(Model $model, $to_merge)
    {
        if($this->disallow_policy !== true)
        {
            $policy = $this->getPolicy();
            $excludes = [];

            foreach ($policy as $permission => $fields)
            {
                $user = Auth::user();
                //se l'utente non è settato nessun campo viene nascosto
                //utile per le azioni che lanciate da command o dalla queue
                if($user && $user->cannot($permission, $model))
                {
                    $model->addHidden($fields);

                    $this->defaultIncludes = array_diff($this->defaultIncludes, $fields);
                    $this->availableIncludes = array_diff($this->availableIncludes, $fields);

                    foreach ($fields as $field)
                    {
                        if(array_key_exists($field, $to_merge))
                        {
                            unset($to_merge[$field]);
                        }
                    }

                }
            }

            if(count($excludes))
            {
                $this->getCurrentScope()->getManager()->parseExcludes($excludes);
            }
        }

        return array_merge($model->toArray(), $to_merge);
    }

//    protected function applyDateFormat(Model $model, $fields)
//    {
//        $dateFields = $model->getDates();
//
//        foreach ($dateFields as $dateField)
//        {
//            if(isset($fields[$dateField]))
//            {
//                if($fields[$dateField] instanceof \Carbon\Carbon)
//                {
//                    $fields[$dateField] = $fields[$dateField]->format(config('api.date.transformer'));
//                }
//                else
//                {
//                    $fields[$dateField] = ($model->$dateField) ? $model->$dateField->format(config('api.date.transformer')) : null;
//                }
//            }
//        }
//        $dateFields = $model->getDatesWithoutTimezone();
//
//        foreach ($dateFields as $dateField)
//        {
//            if(isset($fields[$dateField]))
//            {
//                if($fields[$dateField] instanceof \Carbon\Carbon)
//                {
//                    $fields[$dateField] = $fields[$dateField]->format(config('api.ignore_tz.transformer'));
//                }
//                else
//                {
//                    $fields[$dateField] = ($model->$dateField) ? $model->$dateField->format(config('api.ignore_tz.transformer')) : null;
//                }
//            }
//        }
//
//        return $fields;
//    }

    public function applyTransform(Model $model, $to_merge=[])
    {
        $fields = $this->applyPolicy($model, $to_merge);

//        $fields = $this->applyDateFormat($model, $fields);

        return $fields;
    }
}
