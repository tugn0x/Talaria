<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PatronDocdelRequestChangeStatusFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('patron_docdel_requests', function (Blueprint $table) {
            $table->dateTime('waiting_cost_date')->nullable();             
            $table->smallInteger('cost_policy_status')->nullable();
            $table->renameColumn('fullfill_date','fulfill_date');
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
            $table->dropColumn('waiting_cost_date');              
            $table->dropColumn('cost_policy_status');   
            $table->renameColumn('fulfill_date','fullfill_date');
        });
        
    }
}
