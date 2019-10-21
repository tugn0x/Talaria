<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');            
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();            
            $table->string('name');
            $table->string('surname');
            $table->string('address')->nullable();
            $table->bigInteger('country_id')->nullable();   
            $table->string('town')->nullable();
            $table->string('district')->nullable();
            $table->string('postcode')->nullable();
            $table->string('state')->nullable();            
            $table->string('phone')->nullable(); 
            $table->string('mobile')->nullable();                        
            $table->char('preflang',2)->nullable();             
            $table->dateTime('registration_date')->nullable();                  
            $table->dateTime('privacy_policy_accepted')->nullable();                       
            $table->smallInteger('status')->nullable();  
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
