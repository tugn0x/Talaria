<?php namespace App\Models\Requests;

use App\Models\BaseLightTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use App\Models\Libraries\DeliveryTransformer;
use App\Models\Libraries\LibraryTransformer;
use App\Models\Libraries\LibraryUser;
use App\Models\References\ReferenceTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class PatronDocdelRequestTransformer extends BaseTransformer
{

    protected $availableIncludes = [
        'reference',
        'library',
        'delivery',
        'docdelrequests',
        'libray_label'
    ];

    protected $defaultIncludes = [
        'reference',
        'library',
        'delivery',
        'library_label'
    ];

    public function includeReference(Model $model)
    {
        if($model->reference)
            return $this->item($model->reference, new ReferenceTransformer());
    }

    public function includeLibrary(Model $model)
    {
        if($model->library)
            return $this->item($model->library, new BaseLightTransformer());
    }

    public function includeLibraryLabel(Model $model)
    {
        if($model->user)
        {
            $lu=LibraryUser::where('library_id','=',$model->library->id)->where('user_id','=',$model->user->id)->firstOrFail();
            return $this->item($lu, new BaseTransformer());
        }

    }

    public function includeDelivery(Model $model)
    {
        if($model->delivery)
            return $this->item($model->deliery, new BaseLightTransformer());
    }

    public function includeDocdelRequests(Model $model)
    {
        return $this->collection($model->docdelrequests, new BaseTransformer());
    }

    public function transform(Model $model)
    {
        $to_merge = [
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
