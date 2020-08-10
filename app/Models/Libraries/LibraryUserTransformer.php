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
        if($model->library)
        {
            $tr=new BaseLightTransformer();
            $tr->setOnly(['id','name','dd_user_cost','ill_user_cost']);
            return $this->item($model->library, $tr);
        }
        return null;
    }

    public function includeUser(Model $model)
    {
        if($model->user)
            return $this->item($model->user, new UserLightTransformer());
        return null;
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
        
        ];
        return $this->applyTransform($model, $to_merge);
    }

    public function transform(Model $model)
    {
        $to_merge = [
//            patronRoutes
        ];
        return $this->applyTransform($model, $to_merge);
    }
}
