<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();            
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->softDeletes();
            $table->integer('deleted_by')->unsigned()->nullable();
            $table->string('name')->nullable(false);
            $table->boolean('active')->default(true);
            $table->string('vatnumber',50)->nullable();
            $table->string('fiscalcode',50)->nullable();
            $table->text('invoice_note')->nullable();
            $table->string('email_pec')->nullable();
            $table->string('ccu',10)->nullable();
            $table->string('administrative')->nullable();
            $table->string('administrative_email')->nullable();
            $table->string('administrative_phone')->nullable();   
        });
        Schema::create('library_project', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('project_id');
            $table->bigInteger('library_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
        Schema::dropIfExists('library_project');
    }
}
