<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LendingDocdelRequestNotification extends BaseNotification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($model)
    {
        parent::__construct($model);   
    }

    
    public function toArray($notifiable)
    {
        $lib=$this->object->library->id;
        $lid=$this->object->id;
       return [      
               'title'=>"Lending #$lid status changed",   
               'message'=>'Request status:'.$this->object->lending_status,
               'url'=>"/library/$lib/lending/$lid",
               'object_type'=>get_class($this->object),
               'object_id'=>$this->object->id              
       ];
    }   
}
