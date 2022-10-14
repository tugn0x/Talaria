<?php

namespace App\Http\Controllers;

use App\Traits\Http\ApiControllerTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class AdminApiController extends Controller
{
    use ApiControllerTrait;

    public function __construct()
    {
        //disable authorization cause admin/manager can access all models methods
        $this->nilde->disableAuthorize();
    }

    

    public function changeStatus(Request $request,$id)
    {                                
            $model = $this->model->findOrFail($id);
            $extra=$request->has("extrafields")?$request->input("extrafields"):[];

                                    
            if(!is_null($request->input("status")))
                $model=$model->changeStatus($request->input("status"),$extra);                
            
            if($model)
                return $this->response->item($model, new $this->transformer())->morph();           
            else //if i delete the model 
                return $this->response->noContent();
    }
    
}
