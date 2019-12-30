<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeInvoiceNoteField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('libraries', function (Blueprint $table) {
            $table->renameColumn('invoice_note','invoice_header');
        });
        Schema::table('institutions', function (Blueprint $table) {
            $table->renameColumn('invoice_note','invoice_header');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->renameColumn('invoice_note','invoice_header');
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
            $table->renameColumn('invoice_header','invoice_note');
        });
        Schema::table('institutions', function (Blueprint $table) {
            $table->renameColumn('invoice_header','invoice_note');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->renameColumn('invoice_header','invoice_note');
        });
    }
}
