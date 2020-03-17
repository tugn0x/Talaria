<?php

namespace App\Http\Controllers\Projects;

use App\Models\Projects\Project;
use App\Models\Projects\ProjectTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class ProjectController extends ApiController
{
    public function __construct(Project $model, ProjectTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
    }

}
