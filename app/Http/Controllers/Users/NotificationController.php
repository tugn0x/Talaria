<?php

namespace App\Http\Controllers\Users;

use App\Models\Libraries\DepartmentTransformer;
use App\Models\Users\DatabaseNotificationTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Models\Users\DatabaseNotification;

class NotificationController extends ApiController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(DatabaseNotification $model, DatabaseNotificationTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;

        $this->nilde->disableAuthorize();
    }

    public function index(Request $request)
    {
        $collection = $this->nilde->index($this->model->owned()->select('*'), $request, function($collection, $request)
        {
            if($request->has("readed"))
            {
                if(!$request->input("readed") || $request->input("readed") == "false")
                {
                    $collection->unreaded();
                }
                else
                {
                    $collection->readed();
                }
            }

            return $collection;
        },
            function($collection, $request)
            {
                // Set all messages queried to 'read'
                if($request->input('setToRead'))
                {
                    $collection->map(function ($item, $key) {
                        $item->setToRead();
                        return $item;
                    });
                }
                // Set all messages queried to 'unread'
                if($request->input('setToUnread'))
                {
                    $collection->map(function ($item, $key) {
                        $item->setToUnread();
                        return $item;
                    });
                }
                return $collection;
            });

        $unreaded_total = $this->model->owned()->unreaded()->count();

        return $this->response->paginator($collection, new $this->transformer())->addMeta('unreaded_total', $unreaded_total)->morph();
    }

    public function show(Request $request, $id)
    {
        $model = $this->nilde->show($this->model, $request, $id, function($model, $request)
        {
            // Set message to 'read'
            if($request->input('setToRead'))
            {
                $model->setToRead();
            }
            // Set message to 'unread'
            if($request->input('setToUnread'))
            {
                $model->setToUnread();
            }
            return $model;
        }, function($model, $request)
        {
            return $model->owned();
        });

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function markAllAsRead(Request $request)
    {
        if( !empty($this->validate) )
            $this->validate($request, $this->validate);

        $notifications = \Auth::user()->unreadNotifications;

        if($notifications->count() && !is_null($notifications->markAsRead()))
            throw new \Dingo\Api\Exception\UpdateResourceFailedException(trans('apinilde::response.update_failed'));

        return $this->response->array([]);

    }

}
