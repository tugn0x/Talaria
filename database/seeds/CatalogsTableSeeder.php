<?php

use App\Models\Libraries\Catalog;
use Illuminate\Database\Seeder;

class CatalogsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //some Italian National Catalogs
        //Catalog::create(['name'=>'ACNP','url'=>'http://acnp.cib.unibo.it/cgi-ser/start/it/cnr/fp.html','active'=>1]);
        //Catalog::create(['name'=>'SBN','url'=>'http://www.sbn.it/opacsbn/opac/iccu/base.jsp','active'=>1]);        
        
    }
}
