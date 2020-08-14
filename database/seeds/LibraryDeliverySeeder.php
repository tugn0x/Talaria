<?php

use Illuminate\Database\Seeder;

//Creo il 1° Delivery di ogni biblioteca (se non ne hanno almeno 1)
class LibraryDeliverySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         \App\Models\Libraries\Library::get()->each(function ($l) {
         if ($l->deliveries()->count()==0) {
                factory(\App\Models\Libraries\Delivery::class,1)->create([
                    'library_id'=>$l->id,
                    'deliveryable_id'=>$l->id,
                    'deliveryable_type'=>'App\Models\Libraries\Library'
                ]);
            
          }
         });
    }

}
