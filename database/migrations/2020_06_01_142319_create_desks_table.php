<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDesksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('desks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->softDeletes();
            $table->integer('deleted_by')->unsigned()->nullable();          
            $table->string('name',20)->nullable(false);
            $table->bigInteger('country_id')->nullable(false);   
            $table->string('address')->nullable(false);
            $table->string('town')->nullable(false);
            $table->string('district')->nullable(false);
            $table->string('postcode')->nullable(false);
            $table->string('state')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('desks');
    }
}
