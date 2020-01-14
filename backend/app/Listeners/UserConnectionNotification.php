<?php

namespace App\Listeners;

use App\Events\UserConnected;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserConnectionNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserConnected  $event
     * @return void
     */
    public function handle(UserConnected $event)
    {
        //
    }
}
