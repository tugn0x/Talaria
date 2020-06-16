<?php namespace App\Models\References;

use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;

class GroupReferenceTransformer extends BaseTransformer
{

    protected $availableIncludes = [
        'reference',
        'group',
    ];

    protected $defaultIncludes = [
        'reference',
        'group',
    ];

    public function includeGroup(Model $model)
    {
        return $this->item($model->group, new BaseTransformer());
    }

    public function includeReference(Model $model)
    {
        return $this->item($model->reference, new BaseTransformer());
    }

    public function toArray(Model $model)
    {
        $to_merge = [
        
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
