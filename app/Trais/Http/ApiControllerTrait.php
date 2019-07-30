<?php
namespace App\Traits\Auth;

use Dingo\Api\Dispatcher;
use Dingo\Api\Routing\Helpers;
use Illuminate\Cache\TaggableStore;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use InvalidArgumentException;
use Silber\Bouncer\Database\HasRolesAndAbilities;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Bus\DispatchesJobs;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

trait ApiControllerTrait
{
    use AuthorizesRequests,
        DispatchesJobs,
        ValidatesRequests,
        Helpers;

//    protected static $modelClass = null;
//    protected static $transformerClass = null;

    protected $model;
    protected $api;
    protected $transformer;
    protected $broadcast = false;
    protected $validate = [];

    /*
     * The attributes that should override default attach, detach, sync.
     *
     * @var array
     */
    protected $custom_relationship_methods = [];
}
