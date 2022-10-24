<?php 

namespace App\Models\Libraries;

use App\Models\BaseLightTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;

class IdentifierLibraryTransformer extends BaseTransformer
{

    protected $availableIncludes = [
        'library',
        'identifier'
    ];

    protected $defaultIncludes = [
        //'library',
        //'identifier'
    ];

    public function includeLibrary(Model $model)
    {
        return $this->item($model->library, new BaseLightTransformer());
    }

    public function includeIdentifier(Model $model)
    {
        return $this->item($model->identifier, new BaseTransformer());
    }

    public function transform(Model $model)
    {
        $to_merge = [
        ];
        return $this->applyTransform($model, $to_merge);
    }


}
