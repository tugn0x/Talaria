<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyDocdelRequestTagTable extends Migration
{
    public function up()
    {
        Schema::table('docdel_request_tag', function (Blueprint $table) {
            $table->bigInteger('tag_id')->unsigned()->change(); 
            $table->bigInteger('docdel_request_id')->unsigned()->change(); 
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete("cascade");
            $table->foreign('docdel_request_id')->references('id')->on('docdel_requests')->onDelete("cascade");
         });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('docdel_request_tag', function (Blueprint $table) {
            $table->dropForeign('docdel_request_tag_tag_id_foreign');
            $table->dropForeign('docdel_request_tag_docdel_request_id_foreign');
        });

    }
}
