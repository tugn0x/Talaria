<?php namespace App\Models\Libraries;

use App\Models\BaseLightTransformer;
use App\Models\Institutions\InstitutionTransformer;
use App\Models\Users\TitleTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class LibraryTransformer extends BaseTransformer
{
    protected $policy = [
        'manage' => ['granted_permissions']
    ];

    protected $availableIncludes = [
        'granted_permissions',
        'departments',
        'institution',
        'titles',
        'country',
        'subject',
        'catalogs',
        'deliveries'
    ];

    protected $defaultIncludes = [
        'granted_permissions',
        'institution',
        'country',
        'subject',
    ];

    public function includeGrantedPermissions(Model $model)
    {
        $transf = new BaseLightTransformer();
        $transf->setCallback(function ($model) {
            return $model->user_with_permissions();
        });
        return $this->item($model, $transf);
    }
    public function includeDepartments(Model $model)
    {
        return $this->collection($model->departments, new DepartmentTransformer());
    }
    public function includeTitles(Model $model)
    {
        return $this->collection($model->titles, new TitleTransformer());
    }
    public function includeInstitution(Model $model)
    {
        if($model->institution)
            return $this->item($model->institution, new InstitutionTransformer());
    }
    public function includeCountry(Model $model)
    {
        if($model->country)
            return $this->item($model->country, new BaseLightTransformer());
    }
    public function includeSubject(Model $model)
    {
        if($model->subject)
            return $this->item($model->subject, new BaseLightTransformer());
    }

    public function includeCatalogs(Model $model)
    {
        return $this->collection($model->catalogs, new BaseLightTransformer());
    }

    public function includeDeliveries(Model $model)
    {
        if($model->deliveries)
            return $this->collection($model->deliveries, new DeliveryTransformer());
    }



    public function transform(Model $model)
    {
        $to_merge = [
//            patronRoutes
        ];
        return $this->applyTransform($model, $to_merge);
    }


//    public function includeAbilities(Model $model)
//    {
//        $transf = new BaseLightTransformer();
//        $transf->setOnly([
//            'id',
//            'name',
//            'entity_id',
//            'entity_type',
//        ]);
//        return $this->collection(collect($model->abilities), $transf);
//    }

//    public function includePermissions(Model $model)
//    {
//        $transf = new BaseLightTransformer();
//        $transf->setOnly([
//            'id',
//            'name',
//            'entity_id',
//            'entity_type',
//            'ability_id',
//        ]);
//        return $this->collection(collect($model->permissions), $transf);
//    }
}
