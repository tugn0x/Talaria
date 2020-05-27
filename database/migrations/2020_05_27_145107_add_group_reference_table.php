<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddGroupReferenceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //elimino la vecchia relazione
        Schema::table('references', function (Blueprint $table) {
            $table->dropColumn('group_id');
        });

        //add new group_reference table
        Schema::create('group_reference', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('reference_id');
            $table->bigInteger('group_id');
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
        //add group
        Schema::table('references', function (Blueprint $table) {
            $table->bigInteger('group_id')->nullable(true);
        });
        Schema::dropIfExists('group_reference'); 


    }
}
