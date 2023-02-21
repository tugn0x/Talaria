<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLibraryUserFk extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('library_user', function (Blueprint $table) {
            $table->bigInteger('library_id')->unsigned()->change();
            $table->bigInteger('title_id')->unsigned()->change();            
            $table->bigInteger('user_id')->unsigned()->change();            
            $table->bigInteger('department_id')->unsigned()->change();           
            $table->foreign('library_id')
                ->references('id')->on('libraries')
                ->onDelete('cascade')
                ->change();
            $table->foreign('title_id')
                ->references('id')->on('titles')
                ->onDelete('set null')
                ->change(); 
            $table->foreign('department_id')
                ->references('id')->on('departments')
                ->onDelete('set null')
                ->change();     
            $table->foreign('user_id')
                ->references('id')->on('users')
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
        Schema::table('library_user', function (Blueprint $table) {
            $table->dropForeign('library_user_title_id_foreign');
            $table->dropForeign('library_user_department_id_foreign');
            $table->dropForeign('library_user_user_id_foreign');
            $table->dropForeign('library_user_library_id_foreign');
        });
    }
}
