<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeCostLibraryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('libraries', function (Blueprint $table) {
            $table->bigInteger('currency_id')->unsigned()->nullable(true)->before('ill_user_cost');               
            $table->boolean('ill_IFLA_voucher')->nullable(true)->before('ill_user_cost');            
            $table->float('ill_cost_in_voucher')->nullable(true)->before('ill_user_cost');            
        });        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('libraries', function (Blueprint $table) {
            $table->dropColumn('currency_id');
            $table->dropColumn('ill_IFLA_voucher');
            $table->dropColumn('ill_cost_in_voucher');
        });        
    }
}
