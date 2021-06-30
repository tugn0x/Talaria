<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DocdelRequestChangeStatusFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('docdel_requests', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->dropColumn('note');
            $table->renameColumn("fullfill_date","fulfill_date");
            $table->renameColumn("fullfill_protnr","fulfill_protnr");
            $table->renameColumn("fullfill_location","fulfill_location");
            $table->renameColumn("fullfill_note","fulfill_note");
            $table->renameColumn("fullfill_type","fulfill_type");
            $table->renameColumn("notfullfill_type","notfulfill_type");            
            $table->renameColumn("fullfill_inventorynr","fulfill_inventorynr");            
            $table->string('borrowing_status',255)->nullable();
            $table->string('lending_status',255)->nullable();
            $table->text('borrowing_notes')->nullable();
            $table->text('lending_notes')->nullable();            
            
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
            $table->smallInteger('status')->nullable();
            $table->text('note')->nullable();
            $table->dropColumn('borrowing_notes');
            $table->dropColumn('lending_notes');
            $table->dropColumn('borrowing_status');
            $table->dropColumn('lending_status');
            $table->renameColumn("fulfill_date","fullfill_date");
            $table->renameColumn("fulfill_protnr","fullfill_protnr");
            $table->renameColumn("fulfill_location","fullfill_location");
            $table->renameColumn("fulfill_note","fullfill_note");
            $table->renameColumn("fulfill_type","fullfill_type");
            $table->renameColumn("notfulfill_type","notfullfill_type");            
            $table->renameColumn("fulfill_inventorynr","fullfill_inventorynr");     
            
        });
    }
}
