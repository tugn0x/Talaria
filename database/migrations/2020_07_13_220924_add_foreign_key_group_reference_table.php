<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyGroupReferenceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       
        Schema::table('group_reference', function (Blueprint $table) {
            $table->bigInteger('group_id')->unsigned()->change(); 
            $table->bigInteger('reference_id')->unsigned()->change(); 
            $table->foreign('group_id')->references('id')->on('groups')->onDelete("cascade");
            $table->foreign('reference_id')->references('id')->on('references')->onDelete("cascade");
         });
 
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('group_reference', function (Blueprint $table) {
            $table->dropForeign('group_reference_group_id_foreign');
            $table->dropForeign('group_reference_reference_id_foreign');
        });
    }
}
