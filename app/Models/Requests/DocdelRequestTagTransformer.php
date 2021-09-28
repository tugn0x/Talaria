<?php namespace App\Models\Requests;

use App\Models\BaseLightTransformer;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;

class DocdelRequestTagTransformer extends BaseTransformer
{

    protected $availableIncludes = [
        'docdelrequest',
        'tag',
    ];

    protected $defaultIncludes = [
        'docdelrequest',
        'tag',        
    ];
    
    public function includeTag(Model $model)
    {
        return $this->item($model->tag, new BaseLightTransformer());
    }

    public function includeDocdelRequest(Model $model)
    {
        return $this->item($model->docdelrequest, new BaseTransformer());
    }

    public function toArray(Model $model)
    {
        $to_merge = [
        
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
