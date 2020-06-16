<?php namespace App\Models\References;

use App\Models\BaseLightTransformer;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;

class LabelReferenceTransformer extends BaseTransformer
{

    protected $availableIncludes = [
        'reference',
        'label',
    ];

    protected $defaultIncludes = [
        'reference',
        'label',
    ];

    public function includeLabel(Model $model)
    {
        return $this->item($model->label, new BaseLightTransformer());
    }

    public function includeReference(Model $model)
    {
        return $this->item($model->reference, new BaseLightTransformer());
    }

    public function toArray(Model $model)
    {
        $to_merge = [
        
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
