<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBorrowingLibraryIdFieldToPatronDocdelRequests extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('patron_docdel_requests', function (Blueprint $table) {
            $table->bigInteger('borrowing_library_id')->nullable(true)->after("deleted_by");
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
            $table->dropColumn('borrowing_library_id');
        });
    }
}
