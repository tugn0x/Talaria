<?php

namespace App\Http\Controllers\References;

use App\Http\Controllers\ApiController;
use App\Models\References\Group;
use App\Models\References\Label;
use App\Models\References\Reference;
use App\Models\References\ReferenceTransformer;
use Illuminate\Http\Request;

class ReferenceController extends ApiController
{
    public function __construct(Reference $model, ReferenceTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
    }

    public function my(Request $request)
    {
        $model=$this->model->owned();
        if($request->has("labelIds"))
            $model=$model->byLabel($request->input("labelIds"));
        
        if($request->has("groupIds"))
            $model=$model->byGroup($request->input("groupIds"));
        
        $collection = $this->nilde->index($model, $request);

        return $this->response->paginator($collection, new $this->transformer())->morph();
    }



    public function store(Request $request)
    {
        $model = $this->nilde->store($this->model, $request, null, function ($model, $request) {
//            $model = $model->firstOrNew([
//                'user_id' => $model->user_id,
//                'library_id' => $request->library,
//            ]);
            return $model;
        });
        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    /* Mi aspetto un JSON con { references: [id,id,id], field1: val, field2:val ... labelIds:[id,id,id,'newlabel'],groupIds:[id,id,id,'newgroup'] }*/
    public function updateSelected(Request $request)
    {
        if($request->has("references"))
        {
            $ids=$request->input("references");
            if(sizeof($ids)>0)
            {
               //aggiorno i campi del riferimento (nel caso mi venissero passati)
               Reference::whereIn('id', $ids)->update($request->except(["references","labelIds","groupIds"]));

               foreach($ids as $rifid) 
               {
                    $rif=Reference::find($rifid);

                    $this->authorize("update",$rif);
                    
                    //aggiorno manualmente labels
                    if($request->has("labelIds"))
                    {    
                        $lids=$request->input("labelIds");
                        $i=0;
                        foreach($lids as $lid)
                        {
                            if(is_string($lid))
                            {
                                $l=Label::firstOrCreate(['name'=>$lid]);
                                if($l)
                                    $lids[$i]=$l->id; //sostituisco la stringa con l'ID appena ottenuto creando la nuova etichetta
                            }
                            $i++;
                        }
                      
                        //uso il syncWithoutDetaching in modo da aggingere evitando i doppioni
                        $rif->labels()->syncWithoutDetaching($lids);    
                    }

                    if($request->has("groupIds"))
                    {    
                        $gids=$request->input("groupIds");
                        $i=0;
                        foreach($gids as $gid)
                        {
                            if(is_string($gid))
                            {
                                $g=Group::firstOrCreate(['name'=>$gid]);
                                if($g)
                                    $gids[$i]=$g->id; //sostituisco la stringa con l'ID appena ottenuto creando nuovo gruppo
                            }
                            $i++;
                        }
                      
                        $rif->groups()->syncWithoutDetaching($gids);    
                    }
               } 
            }
            $model=Reference::whereIn('id', $ids);
        }
        else $model=$this->model->owned();
        
            
        $collection = $this->nilde->index($model, $request);
        return $this->response->paginator($collection, new $this->transformer())->morph();
    }

//    /**
//     * Show the form for creating a new resource.
//     *
//     * @return \Illuminate\Http\Response
//     */
//
//    public function create(Request $request)
//    {
//
//    }


//    /**
//     * Store a newly created resource in storage.
//     *
//     * @param  \Illuminate\Http\Request  $request
//     * @return \Illuminate\Http\Response
//     */
//    public function store(Request $request)
//    {
////        $this->authorize('create', $this->model);
//        $model = $this->model->fill($request->only($this->model->getFillable()));
//        $model->save();
////        return $this->response->item($model, $this->transformer);
//        return $this->response->item($model, $this->transformer);
//    }
//
//    /**
//     * Display the specified resource.
//     *
//     * @param  \App\Models\Libraries\Consortium $consortium
//     * @return \Illuminate\Http\Response
//     */
//    public function show(Consortium $consortium)
//    {
//        //
//    }
//
//    /**
//     * Show the form for editing the specified resource.
//     *
//     * @param  \App\Models\Libraries\Consortium $consortium
//     * @return \Illuminate\Http\Response
//     */
//    public function edit(Consortium $consortium)
//    {
//        //
//    }
//
//    /**
//     * Update the specified resource in storage.
//     *
//     * @param  \Illuminate\Http\Request  $request
//     * @param  \App\Models\Libraries\Consortium $consortium
//     * @return \Illuminate\Http\Response
//     */
//    public function update(Request $request, Consortium $consortium)
//    {
//        //
//    }
//
//    /**
//     * Remove the specified resource from storage.
//     *
//     * @param  \App\Models\Libraries\Consortium $consortium
//     * @return \Illuminate\Http\Response
//     */
//    public function destroy(Consortium $consortium)
//    {
//        //
//    }
}
