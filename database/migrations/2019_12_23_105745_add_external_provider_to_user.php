<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddExternalProviderToUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('oauth_social_providers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('provider_name')->nullable();
            $table->string('provider_id')->nullable();
            $table->integer('user_id');
            $table->timestamps();
        });
//        Schema::table('users', function (Blueprint $table) {
//            $table->string('facebook_id')->nullable();
//            $table->string('google_id')->nullable();
//            $table->string('idem_id')->nullable();
//            $table->string('spid_id')->nullable();
//        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('oauth_social_providers');
//        Schema::table('users', function (Blueprint $table) {
//            $table->dropColumn('facebook_id');
//            $table->dropColumn('google_id');
//            $table->dropColumn('idem_id');
//            $table->dropColumn('spid_id');
//        });
    }
}
