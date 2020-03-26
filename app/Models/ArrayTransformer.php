<?php namespace App\Models;

use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;
use League\Fractal\TransformerAbstract;

class ArrayTransformer extends TransformerAbstract
{
    protected $property = 'name';

    public function setProperty($item) {
        $this->property = $item;
    }

    public function transform(Model $model) {
        $prop = $this->property;
        return $model->$prop;
    }

}
