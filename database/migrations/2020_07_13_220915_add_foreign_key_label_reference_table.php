<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyLabelReferenceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('label_reference', function (Blueprint $table) {
            $table->bigInteger('label_id')->unsigned()->change(); 
            $table->bigInteger('reference_id')->unsigned()->change(); 
            $table->foreign('label_id')->references('id')->on('labels')->onDelete("cascade");
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
        Schema::table('label_reference', function (Blueprint $table) {
            $table->dropForeign('label_reference_label_id_foreign');
            $table->dropForeign('label_reference_reference_id_foreign');
        });

    }
}
