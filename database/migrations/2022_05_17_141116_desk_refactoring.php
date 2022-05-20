<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DeskRefactoring extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('deliveries', function (Blueprint $table) {            
            $table->string('description')->nullable();
            $table->bigInteger('country_id')->nullable(true);               
            $table->string('address')->nullable();
            $table->string('town')->nullable();
            $table->string('district')->nullable();
            $table->string('postcode')->nullable();
            $table->string('state')->nullable();     
            
            $table->dropColumn('deliveryable_id');
            $table->dropColumn('deliveryable_type');       
            
        });

        //removing unused tables
        Schema::dropIfExists('delivery_user');
        Schema::dropIfExists('desk_institution');
        Schema::dropIfExists('desks');
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('deliveries', function (Blueprint $table) {
            $table->dropColumn('status');            
            $table->dropColumn('country_id'); 
            $table->dropColumn('address');            
            $table->dropColumn('town');   
            $table->dropColumn('district');   
            $table->dropColumn('postcode');   
            $table->dropColumn('state');   
            $table->dropColumn('description');   
            
            //Polimorph fields
            $table->bigInteger('deliveryable_id')->nullable(false);
            $table->string('deliveryable_type')->nullable(false);  
        });
    }
}
