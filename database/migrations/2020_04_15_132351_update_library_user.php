<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateLibraryUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       
        Schema::table('library_user', function (Blueprint $table) {            
            $table->string('user_referent',50)->nullable()->before('status');
            $table->string('user_mat',20)->nullable()->before('status');
            $table->string('user_service_phone')->nullable()->before('status');
            $table->string('user_service_email')->nullable()->before('status');
            $table->boolean('preferred')->nullable()->before('status');
            $table->string('label',20)->nullable()->before('status');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('library_user', function (Blueprint $table) {            
            $table->dropColumn('user_referent');
            $table->dropColumn('user_mat');
            $table->dropColumn('user_service_phone');
            $table->dropColumn('user_service_email');
            $table->dropColumn('preferred');
            $table->dropColumn('label');
            
        });
    }
}
