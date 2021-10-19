<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class BorrowingDocdelRequestNotification extends BaseNotification
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
        $lib=$this->object->library->id;
        $bid=$this->object->id;
       return [      
               'title'=>'Borrowing Notification',   
               'message'=>'bla bla bla!',
               'url'=>"/library/$lib/borrowing/$bid",
               'object_type'=>get_class($this->object),
               'object_id'=>$this->object->id              
       ];
    }    
}
