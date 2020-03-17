<?php

namespace App\Providers;

use App\Models\Institutions\InstitutionType;
use App\Models\Libraries\Library;
use App\Models\Projects\Project;
use App\Models\Libraries\LibraryUser;
use App\Models\References\Reference;
use App\Models\Users\User;
use App\Policies\BasePolicy;
use App\Policies\LibraryPolicy;
use App\Policies\LibraryUserPolicy;
use App\Policies\ReferencesPolicy;
use App\Policies\ProjectPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
        Library::class => LibraryPolicy::class,
        LibraryUser::class => LibraryUserPolicy::class,
        Reference::class => ReferencesPolicy::class,
        User::class => BasePolicy::class,
        InstitutionType::class => BasePolicy::class,
        Project::class => BasePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Route::group([
            'middleware' => 'recaptcha',
        ], function () {
            Passport::routes();
        });
        Passport::tokensExpireIn(Carbon::now()->addDays(1));
    }
}
