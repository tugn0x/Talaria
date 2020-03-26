<?php namespace App\Models;

use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;
use League\Fractal\TransformerAbstract;

class BaseLightTransformer extends TransformerAbstract
{
    protected $callback = false;

    protected $only = [
        'id',
        'name',
    ];

    public function setOnly($array) {
        $this->only = $array;
    }
    public function setCallback($cb) {
        $this->callback = $cb;
    }

    public function transform(Model $model) {
        if(is_callable($this->callback))
            return call_user_func_array($this->callback, [$model])->toArray();
        return $model->only($this->only);
    }

}
