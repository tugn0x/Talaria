<?php

use Illuminate\Database\Seeder;
use App\Models\Libraries\Identifier;

class IdentifierSeeder extends Seeder
{    
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Identifier::create(['name'=>'ISIL']);
        Identifier::create(['name'=>'OCLC']);
        Identifier::create(['name'=>'ACNP']);
        Identifier::create(['name'=>'SBN']);
        Identifier::create(['name'=>'GTBIB']);
    }
}
