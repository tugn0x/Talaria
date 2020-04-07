<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateModels extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('references', function (Blueprint $table) {
            $table->smallInteger('status')->default(0);
        });

        Schema::table('patron_docdel_requests',function(Blueprint $table) {
            $table->dropColumn('deleted');
            $table->dateTime('cancel_request_date')->nullable();
            $table->dateTime('cancel_date')->nullable();
            $table->boolean('archived')->default(false);
        });

        Schema::table('docdel_requests',function(Blueprint $table) {
            $table->dateTime('accept_cost_date')->after('accept_user_status')->nullable();
            $table->dropColumn('request_status');
            $table->smallInteger('fulfill_type')->nullable();
            $table->smallInteger('notfulfill_type')->nullable();
            $table->boolean('archived')->default(false);
            $table->dateTime('cancel_date')->after('cancelrequest_date')->nullable();
            $table->dateTime('trash_date')->after('cancel_date')->nullable();
            $table->smallInteger('trash_type')->after('trash_date')->nullable();
            $table->bigInteger('parent_id')->nullable();
            $table->smallInteger('forward')->default(0);
            $table->renameColumn('accept_user_status','accept_cost_status');
            $table->renameColumn('process_status','status');
            $table->renameColumn('cancelrequest_date','cancel_request_date');
            
            
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('references', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('patron_docdel_requests', function (Blueprint $table) {
            $table->smallInteger('deleted');
            $table->dropColumn('cancel_request_date');
            $table->dropColumn('cancel_date');
            $table->dropColumn('archived');
        });
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->renameColumn('accept_cost_status','accept_user_status');
            $table->dropColumn('accept_cost_date');
            $table->renameColumn('status','process_status');
            $table->smallInteger('request_status','status');
            $table->dropColumn('fulfill_type');
            $table->dropColumn('notfulfill_type');
            $table->dropColumn('archived');
            $table->renameColumn('cancel_request_date','cancelrequest_date');
            $table->dropColumn('cancel_date');
            $table->dropColumn('trash_date');
            $table->dropColumn('trash_type');
            $table->dropColumn('parent_id');
            $table->dropColumn('forward');
        });
    }
}
