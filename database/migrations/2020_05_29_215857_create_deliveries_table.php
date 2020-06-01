<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeliveriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deliveries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->softDeletes();
            $table->integer('deleted_by')->unsigned()->nullable();
            $table->string('name',20)->nullable(false);
            $table->string('email')->nullable(true);
            $table->string('phone')->nullable(true);
            $table->text('openinghours')->nullable(true);
            $table->bigInteger('library_id')->nullable(false);
            
            //Polimorph fields
            $table->bigInteger('deliveryable_id')->nullable(false);
            $table->string('deliveryable_type')->nullable(false);        
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deliveries');
    }
}
