<?php

/* NOTE: this controller uses standard dispatch method so it can run without "filter" or policy 
and uses AdminApiController that disable authorization/permission/abilities*/

namespace App\Http\Controllers\Libraries;

use App\Models\Libraries\Library;
use App\Models\Libraries\LibraryTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AdminApiController;
use Illuminate\Support\Facades\Log;

class AdminLibraryController extends AdminApiController
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

    public function update(Request $request, $id)
    {
        if (!empty($this->validate))
            $this->validate($request, $this->validate);

        $model = $this->talaria->update($this->model, $request, $id, function ($model, $request) {            
            return $this->talaria->syncGrantedPermissions($model, $request);
        });

        //sync projects
        if( ($request->has('project_id') && (!is_null($request->input('project_id')))) )
                $model->projects()->sync($request->input('project_id'));   

        //sync identifiers
        if($request->has('identifiers_id'))
        {
            $arr=[];            
            foreach ($request->input('identifiers_id') as $identif)
            {
                 $arr[]=['identifier_id'=>$identif[0],'cod'=>$identif[1]];
            }
            Log::info(print_r($arr,true));
            $model->identifiers()->sync([]); //to check for other soltion, since the problem is when Sync($arr) execute, it saves duplicate data when different data passed by the array           
            $model->identifiers()->sync($arr);            
        }


        
        if ($this->broadcast && config('apitalaria.broadcast'))
            broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

     //override     
     public function index(Request $request)
     {                          
 
         if($request->has('identifier'))
         {
             [$identifierTyp,$identifierVal]=explode(',',$request->input('identifier'));  
 
             $this->model = $this->model->byIdentifier($identifierTyp,$identifierVal); 
         }
 
         if($request->has('subject'))
         {        
             $this->model = $this->model->bySubject($request->input('subject')); 
         }
 
         if($request->has('country'))
         {        
             $this->model = $this->model->byCountry($request->input('country')); 
         }
 
         if($request->has('institution_type'))
         {        
             $this->model = $this->model->byInstitutionType($request->input('institution_type')); 
         }
 
         return parent::index($request);    
     }

}    
