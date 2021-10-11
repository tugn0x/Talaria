<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBorrowingrequestFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->smallInteger('user_license')->nullable(true)->default(null);                        
            $table->dateTime('user_cancel_date')->nullable(true)->default(null);                        
            $table->smallInteger('all_lender')->nullable(true)->default(null);                        
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
            $table->dropColumn('user_license');
            $table->dropColumn('user_cancel_date');
            $table->dropColumn('all_lender');
        });
    }
}
