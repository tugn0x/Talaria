<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePatronDocdelRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patron_docdel_requests', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->softDeletes();
            $table->integer('deleted_by')->unsigned()->nullable();
            $table->bigIncrements('reference_id')->nullable(false);
            $table->bigIncrements('user_id')->nullable(false);                                              
            $table->integer('librarycounter')->nullable(); 
            $table->dateTime('insert_date')->nullable(); //o usiamo created_at?
            $table->smallInteger('status')->nullable();            
            $table->dateTime('request_date')->nullable();
            $table->dateTime('fullfill_date')->nullable();
            $table->smallInteger('cost_policy')->nullable();
            $table->text('forlibrary_note')->nullable();
            $table->text('fromlibrary_note')->nullable();
            $table->smallInteger('deleted')->nullable();                         
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patron_docdel_requests');        
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->dropColumn('patron_docdel_request_id');
        });              
        
    }
}
