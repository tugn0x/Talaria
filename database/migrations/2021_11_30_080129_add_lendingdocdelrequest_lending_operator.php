<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLendingdocdelrequestLendingOperator extends Migration
{
    public function up()
    {
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->bigInteger('lending_operator_id')->nullable(true)->default(null)->after("operator_id");                        
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->dropColumn('lending_operator_id');
        });
    }
}
