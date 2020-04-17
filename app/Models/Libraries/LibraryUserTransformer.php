<?php namespace App\Models\Libraries;

use App\Models\BaseLightTransformer;
use App\Models\Libraries\LibraryTransformer;
use App\Models\Users\UserLightTransformer;
use App\Models\Users\TitleLightTransformer;
use App\Models\Libraries\DepartmentLightTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class LibraryUserTransformer extends BaseTransformer
{

    protected $availableIncludes = [
        'library',
        'user',
        'department',
        'title'
    ];

    protected $defaultIncludes = [
        'library',
        'user',
        'department',
        'title'
    ];

    public function includeLibrary(Model $model)
    {
        return $this->item($model->library, new BaseLightTransformer());
    }

    public function includeUser(Model $model)
    {
        return $this->item($model->user, new UserLightTransformer());
    }

    public function includeDepartment(Model $model)
    {
        if($model->department)
            return $this->item($model->department, new DepartmentLightTransformer());
        return null;
    }

    public function includeTitle(Model $model)
    {
        if($model->title)
            return $this->item($model->title, new TitleLightTransformer());
        return null;    
    }

    public function toArray(Model $model)
    {
        $to_merge = [
            'test' => 'hello user',
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
