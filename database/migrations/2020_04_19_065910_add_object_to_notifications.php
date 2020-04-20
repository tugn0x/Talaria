<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddObjectToNotifications extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->nullableMorphs('object');
            $table->dateTime('email_at')->nullable();
            /*
             * TYPE & PRIORITY WILL STORED BE ON DATA!
             */
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->dropColumn('object_id');
            $table->dropColumn('object_type');
            $table->dropColumn('email_at');
        });
    }
}
