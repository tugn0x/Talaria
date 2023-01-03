<?php

namespace App\Http\Controllers\Libraries;

use App\Models\Libraries\DepartmentTransformer;
use App\Models\Libraries\Library;
use App\Models\Libraries\LibraryTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Models\Libraries\DeliveryTransformer;
use Illuminate\Support\Facades\Schema;
use App\Models\Institutions\Institution;
use App\Models\Libraries\Identifier;
use App\Models\Projects\Project;
use Illuminate\Support\Facades\Log;

//use Illuminate\Support\Facades\Auth;

class LibraryController extends ApiController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Library $model, LibraryTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
    }

    //TODO: ridefinire anche index() per disabilitare authorize
    //e rendere accessibile lista biblo a chiunque
    
    public function show(Request $request, $id)
    {
        //diabilito auth perchè chiunque puo' visualizzare i dati di una biblio
        //pensiamo a una pag pubb con elenco biblio/mappa
        //Nel transformer poi filtro i campi da restituire in base all'auth (es: fornisco granted_permission solo se sono manager)
        $this->nilde->disableAuthorize();
        $model = $this->nilde->show($this->model, $request, $id);
//        $model->departments()->select('name', 'id')->get();
        //$model->departments;
        $this->nilde->enableAuthorize();
        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function departments(Request $request, $id)
    {
        $departments = $this->model->findOrFail($id)->departments()->select('name', 'id')->get();

        return $this->collection($departments, new DepartmentTransformer());
    }

    public function store(Request $request)
    {
        if (!empty($this->validate))
            $this->validate($request, $this->validate);

        $model = $this->nilde->store($this->model, $request, function ($model, $request) {
            return $this->nilde->syncGrantedPermissions($model, $request);
        });

        if ($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiStoreBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }


    public function update(Request $request, $id)
    {       
        if (!empty($this->validate))
            $this->validate($request, $this->validate);

        //remove from fillable all fields regarding subscription (cost, imbalance, ...) 
        if($request->filled('lat'))
            unset ($request["lat"]);
        if($request->filled('lon'))
            unset ($request["lon"]);            

        if($request->has('project_id'))
            unset ($request["project_id"]);                

        if($request->has('identifiers_id'))
            unset ($request["identifiers_id"]);                            

        //can update profile_type only if user is library's manager (policy will check user's role)
        //if profile=2 and LIBRARY_DIFFERENT_PROFILES=true => OK else "change profile_type not allowed"   
        if( ! ( $request->filled('profile_type') && $request->input('profile_type')==config("constants.library_profile_type.full")  && env('LIBRARY_DIFFERENT_PROFILES',true) ) )
            unset ($request["profile_type"]);   
        
        if($request->filled('ill_cost'))
            unset ($request["ill_cost"]);

        if($request->filled('ill_user_cost'))
            unset ($request["ill_user_cost"]);            

        if($request->filled('ill_imbalance'))
            unset ($request["ill_imbalance"]);            
                        
        if($request->filled('ill_supply_conditions'))
            unset ($request["ill_supply_conditions"]);                        

        if($request->filled('institution_id'))
            unset ($request["institution_id"]);            
        
        $model = $this->nilde->update($this->model, $request, $id, function ($model, $request) {
            return $this->nilde->syncGrantedPermissions($model, $request);
        });

        if ($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }
    
    public function renewSubscription(Request $request,$id) {

        /* TODO
        
        if (!empty($this->validate))
            $this->validate($request, $this->validate);
        
        $model = $this->nilde->update($this->model, $request, $id);

        $model->status=config("constants.library_status.enabled");

        $model->save();

        //update Projects
        if( ($request->has('project_id') && (!is_null($request->input('project_id')))) )
            $model->projects()->sync($request->input('project_id'));   


        if ($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();        
        */
    }

    public function publicCreate(Request $request)
    {
        $model = $this->model;
        event($model->getTable() . '.store', $model);

        $fillable = $model->getPublicFields();
        $new_model = array_filter($request->only($fillable), function ($val) {
            return !is_null($val);
        });        

        $model = $model->fill($new_model);        
        if($request->has('institution_id') && $request->input('institution_id')==-1 && $request->filled('suggested_institution_name') && $request->filled('institution_type_id') && $request->filled('institution_country_id')) 
        {
            $inst=Institution::firstOrNew(['name'=>$request->input('suggested_institution_name'),'institution_type_id'=>$request->input('institution_type_id'),'country_id'=>$request->input('institution_country_id')]);
            if(!$inst->exists) //not pulled from db so will be created as new
            {
                $inst->status=config("constants.institution_status.pending");; //new institution with pending status
                $inst->save();                
            }
            //update library with correct institution (just created or existing)
            $model->institution_id=$inst->id; 
        }


        $model->status=config("constants.library_status.new");

        $model->save();

        //Projects
        if($request->has('project_id') && $request->filled('project_id') )
        {
            foreach ($request->input('project_id') as $prjid)
            {
                $prj=Project::findOrFail($prjid);
                $model->projects()->attach($prjid);
            }            
        }    
        
        //Identifiers
        if($request->has('identifiers_id') && $request->filled('identifiers_id'))
        {
            $arr=[];            
            foreach ($request->input('identifiers_id') as $identif)
            {
                 $arr[]=['identifier_id'=>$identif[0],'cod'=>$identif[1]];
            }
            $model->identifiers()->sync($arr);            
        }


        //If create fails
        if (!$model->exists) {
            throw new \Dingo\Api\Exception\StoreResourceFailedException(trans('apinilde::response.create_failed'), $model->getInternalErrors());
        }
        
        $model->setPermissionOnObject([
            [
                'user_id' => $request->user()->id,
                'permissions' => ['manage']
            ]
        ]);

        //Fire events
        event($model->getTable() . '.stored', $model);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function nearTo (Request $request) {
        if($request->input("lat") && $request->input("lon"))
        {
            $collection=$this->model->nearTo($request->input("lat"),$request->input("lon")/*,$request->input("range")*/)->get();
        
            //$collection = $this->nilde->index($model, $request);        
            //return $this->response->paginator($collection, new $this->transformer())->morph();
            return $this->response->collection($collection, new $this->transformer())->morph();
        }
    }

    //override     
    public function index(Request $request)
    {        
        //$u=Auth::user();                      
        //if (!($u->hasRole('super-admin')||$u->hasRole('manager'))) 
        
        //filter active only
        $this->model=$this->model->active();

        return parent::index($request);    
    }
}
