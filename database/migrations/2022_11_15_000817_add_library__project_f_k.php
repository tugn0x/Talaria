<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLibraryProjectFK extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('library_project', function (Blueprint $table) {
            $table->bigInteger('library_id')->unsigned()->change();
            $table->bigInteger('project_id')->unsigned()->change();            
            $table->foreign('library_id')
                ->references('id')->on('libraries')
                ->onDelete('cascade')
                ->change();
            $table->foreign('project_id')
            ->references('id')->on('projects')
            ->onDelete('cascade')
            ->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
