<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReferencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('references', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();           
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->softDeletes();
            $table->integer('deleted_by')->unsigned()->nullable();   

            $table->smallInteger('material_type');            
            $table->string('pub_title');
            $table->string('part_title');
            $table->string('first_author',100);
            $table->string('last_author',100);
            $table->smallInteger('pubyear');
            $table->string('volume',100);
            $table->string('issue',50);
            $table->string('page_start',15);
            $table->string('page_end',15);
            $table->text('abstract');
            $table->string('doi');
            $table->string('issn',20);            
            $table->string('publisher');
            $table->string('publishing_place');
            $table->string('isbn',20);
            $table->string('sid',20);
            $table->string('pmid',20);
	    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('references');
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->dropColumn('reference_id');
        });
        Schema::table('patron_docdel_requests', function (Blueprint $table) {
            $table->dropColumn('reference_id');
        });
    }
}
