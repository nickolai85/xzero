<?php

namespace App\Listeners;

use App\Events\UserMove;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserMoveNotification
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
     * @param  UserMove  $event
     * @return void
     */
    public function handle(UserMove $event)
    {
        //
    }
}
