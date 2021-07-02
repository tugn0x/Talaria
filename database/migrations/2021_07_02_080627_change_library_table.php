<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeLibraryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('libraries', function (Blueprint $table) {
            $table->dropColumn('email');
            $table->dropColumn('phone');
            $table->dropColumn('fax');
            $table->dropColumn('dd_email');
            $table->dropColumn('dd_phone');
            $table->dropColumn('nilde');
            $table->dropColumn('rank');
            $table->dropColumn('isil_code');
            $table->dropColumn('dd_user_cost');
            $table->dropColumn('dd_cost');

            $table->renameColumn('dd_supply_conditions','ill_supply_conditions');
            $table->renameColumn('dd_imbalance','ill_imbalance');
            $table->renameColumn('susp_date_start','ill_susp_date_start');
            $table->renameColumn('susp_date_end','ill_susp_date_end');
            $table->renameColumn('susp_notice_days','ill_susp_notification_days');
            

            /*$table->string('address')->nullable(false)->change();
            $table->string('town')->nullable(false)->change();
            $table->string('district')->nullable(false)->change();
            $table->string('postcode')->nullable(false)->change();
            $table->string('state')->nullable(false)->change();                        
            */
            $table->bigInteger('institution_id')->nullable(true)->change();   

            $table->smallInteger('profile_type')->default(1)->nullable(false)->before('status');
            $table->boolean('external')->default(false)->nullable(false)->after('status');            
            $table->string('ill_referent_name')->nullable(true)->after('ill_phone');
            $table->string('alt_name')->nullable(true)->after("name");
            $table->decimal('longitude', 11, 8)->nullable(true)->after('state');
            $table->decimal('latitude', 10, 8)->nullable(true)->after('longitude');

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
            $table->string('email')->nullable(false);
            $table->string('phone')->nullable();
            $table->string('fax')->nullable();
            $table->smallInteger('nilde')->nullable();
            $table->integer('rank')->nullable();
            $table->string('dd_email')->nullable();
            $table->string('dd_phone')->nullable();
            $table->float('dd_cost')->nullable();
            $table->float('ill_cost')->nullable();

            $table->renameColumn('ill_supply_conditions','dd_supply_conditions');
            $table->renameColumn('ill_imbalance','dd_imbalance');
            $table->renameColumn('ill_susp_date_start','susp_date_start');
            $table->renameColumn('ill_susp_date_end','susp_date_end');
            $table->renameColumn('ill_susp_notification_days','susp_notice_days');
           
            /*$table->string('address')->nullable(true)->change();
            $table->string('town')->nullable(true)->change();
            $table->string('district')->nullable(true)->change();
            $table->string('postcode')->nullable(true)->change();
            $table->string('state')->nullable(true)->change();                        
            $table->bigInteger('institution_id')->nullable(false)->change();   
            */


            $table->dropColumn('profile_type');            
            $table->string('isil_code')->nullable(true);  
            $table->dropColumn('external');            
            $table->dropColumn('ill_referent_name');
            $table->dropColumn('alt_name');
            $table->dropColumn('longitude', 11, 8);
            $table->dropColumn('latitude', 10, 8);

        });
    }
}
