<?php namespace App\Models;

use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;

class TitleTransformer extends BaseTransformer
{

    protected $availableIncludes = [

    ];



    public function transform(Model $model)
    {
        $to_merge = [

        ];
        return $this->applyTransform($model, $to_merge);
    }

}
