<?php namespace App\Models\Users;

use App\Models\BaseLightTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class AbilitiesTransformer extends BaseLightTransformer
{

    public function transform($model)
    {
        $resources = $model->permissions()
            ->select('abilities.entity_id','abilities.entity_type','abilities.name')
            ->whereNotNull('abilities.entity_id')
            ->distinct()
            ->get()
            ->map(function ($item) {
                $entity = $item->entity_type::select('name')->find($item->entity_id);
                if($entity) {
                    $item->resource = $entity->getTable();
                    $item->entity_name = $entity ? $entity->name : '';
                }
                return $item;
            })
            ->filter(function ($item) {
                return $item->entity_name;
            })
            ->groupBy(['resource','entity_id']);
//            return $this->response->collection($resources, new PermissionTransformer);
        $resources_array = [];
        foreach ($resources as $class=>$items) {
            $resources_array[$class] = [];
            foreach ($items as $id=>$perms) {
                $resources_array[$class][] = [
                    'resource' => [
                        'id' => $id,
                        'name' => $perms[0]['entity_name']
                    ],
                    'permissions' => \Arr::pluck($perms, 'name')
                ];
            }
        }
//        $token_perms = [
//            "roles" => $model->roles->pluck('name'),
//            "resources" => $resources_array,
//        ];
        return $resources_array;
    }
}
