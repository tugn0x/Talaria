<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DocdelRequestChangeFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->renameColumn('fulfill_type','fullfill_type');
            $table->renameColumn('notfulfill_type','notfullfill_type');
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
            $table->renameColumn('fullfill_type','fulfill_type');
            $table->renameColumn('notfullfill_type','notfullfill_type');
        });

    }
}
