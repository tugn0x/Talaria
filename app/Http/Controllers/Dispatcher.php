<?php  namespace App\Http\Controllers;

use Dingo\Api\Auth\Auth;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Event;
use Gate;
//use Dingo\Api\Http\Request; // Request sostituito per poter utilizzare le form request anche richiamando il dispatcher. FormRequest estende le request base anzichpè quelle di dingo!
use Illuminate\Http\Request;
use Illuminate\Validation\Validator;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Routing\Controller as BaseController;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class Dispatcher extends BaseController
{
    use AuthorizesRequests;

    public $haveToAuthorize = true;

    public $verifyUpdateTime = false;

    public function __construct(\Dingo\Api\Dispatcher $dispatcher)
    {
        $this->api = $dispatcher;
    }

    public function index(Builder $collection, Request $request, callable $onIndexing=null, callable $onIndexed=null)
    {
        if($this->haveToAuthorize)
        {
            $this->authorize($collection->getModel());
            if (Gate::denies('indexOthers', $collection->getModel()))
            {
                $collection = $collection->indexPolicyDenies();
            }
        }

        $includeIds = $request->input('includeIds');
        $excludeIds = $request->input('excludeIds');
        $count = $request->input('pageSize', config('api.page_size'));
        $sort = $request->input('sort', 'id');
        $order = $request->input('sortInfo', 'desc');
        $trashed = $request->input('trashed');
        $q = $request->input('q');

        if($trashed == 'true')
        {
            $collection->onlyTrashed();
        }

        if($includeIds)
        {
            $includeIds = explode(',', $includeIds);
            $collection->whereIn('id', $includeIds);
        }

        if($excludeIds)
        {
            $excludeIds = explode(',', $excludeIds);
            $collection->whereNotIn('id', $excludeIds);
        }

        if( $q )
        {
            $collection->simpleSearch($q);
        }

        $collection->orderBy($sort, $order);

        if( $onIndexing )
            $collection = call_user_func_array($onIndexing, [$collection, $request]);


        $collection = $collection->paginate($count);

        if( $onIndexed )
            $collection = call_user_func_array($onIndexed, [$collection, $request]);

        return $collection;
    }

    public function optionList(Model $model, Request $request, callable $onListing=null, callable $onListed=null)
    {
        if($this->haveToAuthorize)
            $this->authorize($model);

        $includeIds = $request->input('includeIds');
        $excludeIds = $request->input('excludeIds');
        $label = $request->input('label', 'id');
        $value = $request->input('value', 'id');
        $sort = $request->input('sort', 'id');
        $order = $request->input('sortInfo', 'desc');
        $q = $request->input('q');

        $collection = $model->select( array_unique(array_merge([$label], explode(',', $value))) );

        if($excludeIds)
        {
            $excludeIds = explode(',', $excludeIds);
            $collection->whereNotIn('id', $excludeIds);
        }

        if($includeIds)
        {
            $includeIds = explode(',', $includeIds);
            $collection->whereIn('id', $includeIds);
        }

        if( $q )
        {
            $collection->simpleSearch($q);
        }

        $collection->orderBy($sort, $order);

        if( $onListing )
            $collection = call_user_func_array($onListing, [$collection, $request]);

        $collection = $collection->get();

        if( $onListed )
            $collection = call_user_func_array($onListed, [$collection, $request]);

        return $collection;
    }

    public function show(Model $model, Request $request, $id=null, callable $onShowed=null)
    {

        if($this->haveToAuthorize)
        {
            $this->authorize($model);
            if (Gate::denies('showOthers', $model))
            {
                $model = $model->indexPolicyDenies();
            }
        }

        $model = $id ? $model->findOrFail($id) : $model;

        if( $onShowed )
            $model = call_user_func_array($onShowed, [$model, $request]);

        return $model;
    }

    public function store(Model $model, Request $request, callable $onStored = null, callable $onStoring = null)
    {

        if($this->haveToAuthorize)
        {
            $this->authorize($model);
            if (!Gate::denies('storeOthers', $model) && $request->input('user_id'))
            {
                $model->user_id = $request->input('user_id');
            }
        }

        Event::fire($model->getTable() . '.store', $model);

        $fillable = $model->getFillable();
        $new_model = array_filter($request->only($fillable), function($val)
        {
            return !is_null($val);
        });

        $model = $model->fill($new_model);

        if( $onStoring )
            $model = call_user_func_array($onStoring, [$model, $request]);

        $model->save();

        //If create fails
        if(!$model->exists)
        {
            throw new \Dingo\Api\Exception\StoreResourceFailedException(trans('apiclu::response.create_failed'), $model->getInternalErrors());
        }

        if( $onStored )
            $model = call_user_func_array($onStored, [$model, $request]);

        //Fire events
        Event::fire($model->getTable() . '.stored', $model);

        return $model;
    }


    public function update(Model $model, Request $request, $id=null, callable $onUpdated=null, callable $onUpdate=null)
    {

        if($this->haveToAuthorize)
        {
            $this->authorize($model);
            if (Gate::denies('updateOthers', $model))
            {
                $model = $model->updatePolicyDenies();
            }
        }

        $model = $id ? $model->findOrFail($id) : $model;

        if($this->verifyUpdateTime && $request->get('updated_at'))
        {
            if( \Schema::hasColumn($model->getTable(), 'updated_at') && $model->updated_at->ne(\Carbon\Carbon::parse($request->input('updated_at'))) )
            {
                throw new \Symfony\Component\HttpKernel\Exception\ConflictHttpException(trans('apiclu::response.update_failed'));
            }
        }

        Event::fire($model->getTable() . '.update', $model);

        $fillable = $model->getFillable();
        $new_model = array_filter($request->only($fillable), function($val)
        {
            return !is_null($val);
        });

        /*
         * fill the model with attributes
         */
        $model->fill($new_model);

        /*
         * launch callback
         */
        if( $onUpdate )
            $model = call_user_func_array($onUpdate, [$model, $request]);

        /*
         * make update
         */
        if(!$model->update())
        {
            throw new \Dingo\Api\Exception\UpdateResourceFailedException(trans('apiclu::response.update_failed'), $model->getInternalErrors());
        }

        if( $onUpdated )
            $model = call_user_func_array($onUpdated, [$model, $request]);

        Event::fire($model->getTable() . '.updated', $model);

        return $model;
    }

    public function delete(Model $model, Request $request, $id=null, callable $onDeleted=null, callable $onDelete=null)
    {

        if($this->haveToAuthorize)
        {
            $this->authorize($model);
            if (Gate::denies('deleteOthers', $model))
            {
                $model = $model->updatePolicyDenies();
            }
        }

        $model = $id ? $model->findOrFail($id) : $model;

        Event::fire($model->getTable() . '.delete', $model);

        if( $onDelete )
            $model = call_user_func_array($onDelete, [$model, $request]);

        if(!$model->delete())
        {
            throw new \Dingo\Api\Exception\UpdateResourceFailedException(trans('apiclu::response.delete_failed'), $model->getInternalErrors());
        }

        if( $onDeleted )
            $model = call_user_func_array($onDeleted, [$model, $request]);

        //Fire events
        Event::fire($model->getTable() . '.deleted', $model);

        return $model;
    }

    public function bulkDelete(Model $model, Request $request, $ids=null, callable $onBlukDeleted=null)
    {

        $collection = collect([]);
        $collection->errors = [];
        if(!$ids instanceof Builder)
            $ids = is_array($ids) ? $ids : explode(',', $ids);
        Event::fire($model->getTable() . '.bulk.delete', $model);

//        $h = explode('/',$request->path());
//        $h = $h[count($h)-3];
        $h = str_slug(str_singular($model->getTable()));

        foreach($ids as $id)
        {
            $delete_url = str_replace(env('APP_URL'), '', route($h . '.delete', $id));
            try{
                $partial = $this->api->delete($delete_url);
                $collection->push($partial);
            }
            catch (Exception $e)
            {
                $errors = [["id"=>$id, "message"=>$e->getMessage()]];
                throw new \App\Exceptions\BulkApiException($collection, $errors, $e->getMessage(), $e);
            }
        }

        if( $onBlukDeleted )
            $collection = call_user_func_array($onBlukDeleted, [$collection, $request]);

        //Fire events
        Event::fire($model->getTable() . '.bulk.deleted', $collection);

        return $collection;
    }

    public function destroy(Model $model, Request $request, $id=null, callable $onDestroyed=null, callable $onDestroy=null)
    {
        $model = $id ? $model->withTrashed()->findOrFail($id) : $model;

        if($this->haveToAuthorize)
            $this->authorize($model);

        Event::fire($model->getTable() . '.destroy', $model);

        if( $onDestroy )
            $model = call_user_func_array($onDestroy, [$model, $request]);

        if(!$model->forceDelete())
        {
            throw new \Dingo\Api\Exception\UpdateResourceFailedException(trans('apiclu::response.destroy_failed'), $model->getInternalErrors());
        }

        if( $onDestroyed )
            $model = call_user_func_array($onDestroyed, [$model, $request]);

        //Fire events
        Event::fire($model->getTable() . '.destroyed', $model);

        return $model;
    }

    public function bulkDestroy(Model $model, Request $request, $ids=null, callable $onBlukDestroyed=null, callable $onDestroyed=null)
    {

        $collection = collect([]);
        if(!$ids instanceof Builder)
            $ids = is_array($ids) ? $ids : explode(',', $ids);

        Event::fire($model->getTable() . '.bulk.destroy', $model);

        foreach($ids as $id)
        {
            if($ids instanceof Builder)
            {
                $model = $id;
                $id = null;
            }
            $collection->push($this->destroy($model, $request, $id, $onDestroyed));
        }

        if( $onBlukDestroyed )
            $collection = call_user_func_array($onBlukDestroyed, [$collection, $request]);

        //Fire events
        Event::fire($model->getTable() . '.bulk.destroyed', $collection);

        return $collection;
    }

    public function restore(Model $model, Request $request, $id=null, callable $onRestored=null, callable $onRestore=null)
    {
        $model = $id ? $model->onlyTrashed()->findOrFail($id) : $model;

        if($this->haveToAuthorize)
            $this->authorize($model);

        Event::fire($model->getTable() . '.restore', $model);

        if( $onRestore )
            $model = call_user_func_array($onRestore, [$model, $request]);

        if(!$model->restore())
        {
            throw new \Dingo\Api\Exception\UpdateResourceFailedException(trans('apiclu::response.restore_failed'), $model->getInternalErrors());
        }

        if( $onRestored )
            $model = call_user_func_array($onRestored, [$model, $request]);

        Event::fire($model->getTable() . '.restored', $model);

        return $model;
    }


    public function bulkRestore(Model $model, Request $request, $ids=null, callable $onBlukRestored=null, callable $onRestored=null)
    {

        $collection = collect([]);
        if(!$ids instanceof Builder)
            $ids = is_array($ids) ? $ids : explode(',', $ids);

        Event::fire($model->getTable() . '.bulk.restore', $model);

        foreach($ids as $id)
        {
            if($ids instanceof Builder)
            {
                $model = $id;
                $id = null;
            }
            $collection->push($this->restore($model, $request, $id, $onRestored));
        }

        if( $onBlukRestored )
            $collection = call_user_func_array($onBlukRestored, [$collection, $request]);

        //Fire events
        Event::fire($model->getTable() . '.bulk.restored', $collection);

        return $collection;
    }

    public function bulkSave(Model $model, Request $request, callable $onBlukSaved=null)
    {

        $collection = collect([]);

        /*
         * TODO: check content
         */
//        if(!is_array($request)||empty($request))
//            return $collection;

        Event::fire($model->getTable() . '.bulk.save', $model);

        $h = explode('/',$request->path());
        $h = $h[count($h)-2];

        $requests = $request->all();
        foreach($requests as $k=>$element)
        {
            if(is_array($element)) {
                if (array_has($element, 'id')) {
                    $id = $element['id'];
                    $update_url = str_replace(env('APP_URL'), '', route($h . '.update', $id));
                    $partial = $this->api->put($update_url, $element);
                } else {
                    $store_url = str_replace(env('APP_URL'), '', route($h . '.store'));
                    $partial = $this->api->post($store_url, $element);
                }
                $collection->push($partial);
            }
        }

        if( $onBlukSaved )
            $collection = call_user_func_array($onBlukSaved, [$collection, $request]);

        //Fire events
        Event::fire($model->getTable() . '.bulk.saved', $collection);

        return $collection;
    }


    /*
     * N:N attach method.
     */
    public function attach(Model $model, Request $request, $id, $relation_name, $ids=null, callable $onAttach=null, callable $onAttached=null)
    {
        if($this->haveToAuthorize)
        {
            $this->authorize($model);
            if (Gate::denies('attachOthers', $model))
            {
                $model->attachPolicyDenies();
            }
        }

        $model = $id ? $model->findOrFail($id) : $model;

        /*
         * $onAttach Callback
         */
        if( $onAttach )
            $model = call_user_func_array($onAttach, [$model, $request, $relation_name, $ids]);

        Event::fire($model->getTable() . '.attach.', [ $relation_name,  $model ]);

        /*
         * This is the relationship
         */
        $relation = $model->$relation_name();

        /*
         * This is the model of related elements
         */
        $relatedModel = $relation->getRelated();

        /*
         * KeyName related Model:
         */
        $relatedModelKeyName = $relatedModel->getKeyName();

        /*
         * These are the attached objects keys
         */
        $current_attached = $relation->get()->modelKeys();

        /*
         * get Objects
         */
        if(!is_null($ids))
        {
            $objects = is_array($ids) ? $ids : explode(',', $ids);
        }
        else
        {
            $objects = $request->all();

            $objects = $model->filterIds($objects);
        }

        if($relation instanceof \Illuminate\Database\Eloquent\Relations\BelongsToMany)
        {

            /*
             * remove already attached elements
             */
            foreach ($objects as $key=>$value)
            {
                if(in_array($value, $current_attached))
                    unset($objects[$key]);
            }

            //NOTE: attach returns void...
            if(!array_has($model->getCustomRelationshipMethods(), $relation_name.'.attach'))
            {
                $relation->attach($objects);
            }
            else
            {
                $custom_method = array_get($model->getCustomRelationshipMethods(), $relation_name.'.attach');
                $model->$custom_method($objects);
            }

        }
        elseif ($relation instanceof \Illuminate\Database\Eloquent\Relations\BelongsTo)
        {
            if(!$relation->associate($objects)->exists)
                throw new \Dingo\Api\Exception\UpdateResourceFailedException(trans('apiclu::response.attach_failed'), $model->getInternalErrors());
        }



        /*
         * $onAttached Callback
         */
        if( $onAttached )
            $model = call_user_func_array($onAttached, [$model, $request, $relation_name, $ids]);

        Event::fire($model->getTable() . '.attached', [ $relation_name,  $model ]);

        return $model;
    }

    public function detach(Model $model, Request $request, $id, $relation_name, $ids=null, callable $onDetach=null, callable $onDetached=null)
    {
        if($this->haveToAuthorize)
        {
            $this->authorize($model);
            if (Gate::denies('detachOthers', $model))
            {
                $model->attachPolicyDenies();
            }
        }

        $model = $id ? $model->findOrFail($id) : $model;

        /*
         * $onDetach Callback
         */
        if( $onDetach )
            $model = call_user_func_array($onDetach, [$model, $request, $relation_name, $ids]);

        Event::fire($model->getTable() . '.detach.', [ $relation_name,  $model ]);

        /*
         * This is the relationship
         */
        $relation = $model->$relation_name();

        /*
         * This is the model of related elements
         */
        $relatedModel = $relation->getRelated();

        /*
         * KeyName related Model:
         */
        $relatedModelKeyName = $relatedModel->getKeyName();

        /*
         * These are the attached objects keys
         */
        $current_attached = $relation->get()->modelKeys();

        /*
         * get Objects
         */
        if(!is_null($ids))
        {
            $objects = is_array($ids) ? $ids : explode(',', $ids);
        }
        else
        {
            $objects = $request->all();

            $objects = $model->filterIds($objects);
        }


        if($relation instanceof \Illuminate\Database\Eloquent\Relations\BelongsToMany)
        {

            /*
             * remove already detached elements
             */
            foreach ($objects as $key=>$value) {
                if (!in_array($value, $current_attached))
                    unset($objects[$key]);
            }

            //NOTE: detach returns void...
            if(!array_has($model->getCustomRelationshipMethods(), $relation_name.'.detach'))
            {
                $relation->detach($objects);
            }
            else
            {
                $custom_method = array_get($model->getCustomRelationshipMethods(), $relation_name.'.detach');
                $model->$custom_method($objects);
            }

        }
        elseif ($relation instanceof \Illuminate\Database\Eloquent\Relations\BelongsTo)
        {
            if(!$relation->dissociate()->exists)
                throw new \Dingo\Api\Exception\UpdateResourceFailedException(trans('apiclu::response.detach_failed'), $model->getInternalErrors());
        }

        /*
         * $onDetached Callback
         */
        if( $onDetached )
            $model = call_user_func_array($onDetached, [$model, $request, $relation_name, $ids]);

        Event::fire($model->getTable() . '.detached', [ $relation_name,  $model ]);

        return $model;
    }

    public function sync(Model $model, Request $request, $id, $relation_name, $ids=null, callable $onSync=null, callable $onSynced=null)
    {

        if($this->haveToAuthorize)
        {
            $this->authorize($model);
            if (Gate::denies('syncOthers', $model))
            {
                $model->attachPolicyDenies();
            }
        }

        $model = $id ? $model->findOrFail($id) : $model;

        /*
         * $onSync Callback
         */
        if( $onSync )
            $model = call_user_func_array($onSync, [$model, $request, $relation_name, $ids]);

        Event::fire($model->getTable() . '.sync.', [ $relation_name,  $model ]);

        /*
         * This is the relationship
         */
        $relation = $model->$relation_name();


        /*
         * get Objects
         */
        if(!is_null($ids))
        {
            $objects = is_array($ids) ? $ids : explode(',', $ids);
        }
        else
        {
            $objects = $request->all();

            $objects = $model->filterIds($objects);
        }

        //it should returns array
        $custom_methods = $model->getCustomRelationshipMethods();
        if(!is_array($custom_methods) || !array_has($custom_methods, $relation_name.'.sync'))
        {
            $relation->sync($objects);
        }
        else
        {
            $custom_method = array_get($custom_methods, $relation_name.'.sync');
            $model->$custom_method($objects);
        }

        /*
         * $onSynced Callback
         */
        if( $onSynced )
            $model = call_user_func_array($onSynced, [$model, $request, $relation_name, $ids]);

        Event::fire($model->getTable() . '.synced', [ $relation_name,  $model ]);

        return $model;
    }

    public function disableAuthorize()
    {
        $this->haveToAuthorize = false;
    }

    public function enableAuthorize()
    {
        $this->haveToAuthorize = true;
    }

}
