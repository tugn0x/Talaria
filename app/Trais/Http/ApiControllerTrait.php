<?php
namespace App\Traits\Auth;

use Dingo\Api\Routing\Helpers;
use Illuminate\Cache\TaggableStore;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use InvalidArgumentException;
use Silber\Bouncer\Database\HasRolesAndAbilities;

trait ApiControllerTrait
{
    use Helpers;
}
