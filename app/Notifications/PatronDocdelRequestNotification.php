<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class PatronDocdelRequestNotification extends BaseNotification
{
    use Queueable;

    protected $object;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($model)
    {        
        parent::__construct($model);        
    }
  

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        $pdrid=$this->object->id;
        return [      
               'title'=>'Patron Notification',   
               'message'=>'bla bla bla!',
               'url'=>"/patron/requests/$pdrid",
               'object_type'=>get_class($this->object),
               'object_id'=>$pdrid              
        ];

        /*$lib=$this->object->library->id;

        if($this->object->docdelrequests) //has borrowing
        {
            $borrddr=$this->object->docdelrequests->sortByDesc('created_at')->first();                
            $bid=$borrddr->id;
            return [      
                    'title'=>'Patron Notification for librarian',   
                    'message'=>'bla bla bla!',
                    'url'=>"/library/$lib/borrowing/$bid",
                    'object_type'=>get_class($borrddr),
                    'object_id'=>$bid              
            ];
        }*/
    }    
}