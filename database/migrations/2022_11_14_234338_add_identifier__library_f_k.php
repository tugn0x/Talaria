<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIdentifierLibraryFK extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('identifier_library', function (Blueprint $table) {
            $table->bigInteger('library_id')->unsigned()->change();
            $table->bigInteger('identifier_id')->unsigned()->change();            
            $table->foreign('library_id')
                ->references('id')->on('libraries')
                ->onDelete('cascade')
                ->change();
            $table->foreign('identifier_id')
            ->references('id')->on('identifiers')
            ->onDelete('cascade')
            ->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('identifier_library', function (Blueprint $table) {
            $table->dropForeign('identifier_library_identifier_id_foreign');
            $table->dropForeign('identifier_library_library_id_foreign');
        });
    }
}
