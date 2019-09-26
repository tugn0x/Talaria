<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInstitutionsConsortiaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consortia', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
        });
        Schema::create('institution_consortium', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('consortium_id');
            $table->bigInteger('institution_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('consortia');
        Schema::dropIfExists('institution_consortium');
    }
}
