<?php namespace App\Models\Institutions;

use App\Models\BaseLightTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class InstitutionTransformer extends BaseTransformer
{
    protected $policy = [
        'manage' => ['granted_permissions']
    ];
    
    protected $availableIncludes = [
        'granted_permissions',
        'institution_type',
        'country'
    ];

    protected $defaultIncludes = [
        'granted_permissions',
        'institution_type',
        'country'
    ];

    public function includeGrantedPermissions(Model $model)
    {
        $transf = new BaseLightTransformer();
        $transf->setCallback(function ($model) {
            return $model->user_with_permissions();
        });
        return $this->item($model, $transf);
    }

    public function includeCountry(Model $model)
    {
        if($model->country)
            return $this->item($model->country, new BaseLightTransformer());
    }
    public function includeInstitutionType(Model $model)
    {
        if($model->institution_type)
            return $this->item($model->institution_type, new BaseLightTransformer());
    }


    public function transform(Model $model)
    {
        $to_merge = [

        ];
        return $this->applyTransform($model, $to_merge);
    }

}
