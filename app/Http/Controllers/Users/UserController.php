<?php

namespace App\Http\Controllers\Users;

use App\Models\Institutions\Institution;
use App\Models\Users\User;
use App\Models\Users\UserTransformer;
use Illuminate\Http\Request;

class UserController extends \App\Http\Controllers\ApiController
{
    use UserControllerTrait;

    public function __construct(User $model, UserTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;

//        app('Dingo\Api\Transformer\Factory')->register(Library::class, LibraryTransformer::class);

//        dd($this->transformer);
    }

}
