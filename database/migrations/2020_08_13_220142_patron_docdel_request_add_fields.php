<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PatronDocdelRequestAddFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('patron_docdel_requests', function (Blueprint $table) {
            $table->float('cost')->default(0)->after("cost_policy");
            $table->dateTime('answer_cost_date')->nullable(true)->after("cost");
            $table->dateTime('delivery_ready_date')->after("fullfill_date")->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('patron_docdel_requests', function (Blueprint $table) {
            $table->dropColumn('cost');
            $table->dropColumn('answer_cost_date');
            $table->dropColumn('delivery_ready_date');
        });
    }
}
