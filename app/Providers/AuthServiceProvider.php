<?php

namespace App\Providers;

use App\Models\Country;
use App\Models\Institutions\Institution;
use App\Models\Institutions\InstitutionType;
use App\Models\Libraries\CatalogLibrary;
use App\Models\Libraries\Library;
use App\Models\Projects\Project;
use App\Models\Libraries\LibraryUser;
use App\Models\Libraries\Subject;
use App\Models\Libraries\Tag;
use App\Models\References\Reference;
use App\Models\Users\User;
use App\Policies\BasePolicy;
use App\Policies\LibraryPolicy;
use App\Policies\LibraryUserPolicy;
use App\Policies\CatalogLibraryPolicy;
use App\Policies\ListBasePolicy;
use App\Policies\ReferencesPolicy;
use App\Policies\ProjectPolicy;
use App\Policies\UserPolicy;
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
        CatalogLibrary::class => CatalogLibraryPolicy::class,
        Tag::class => BasePolicy::class,
        Reference::class => ReferencesPolicy::class,
        User::class => UserPolicy::class,
        InstitutionType::class => ListBasePolicy::class,
        Project::class => ListBasePolicy::class,
        Institution::class => ListBasePolicy::class,
        Country::class => ListBasePolicy::class,
        Subject::class => ListBasePolicy::class,
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
