<?php 

namespace App\Models\Libraries;

use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;

class IdentifiersTransformer extends BaseTransformer
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
