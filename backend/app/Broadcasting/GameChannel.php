<?php

namespace App\Broadcasting;

use App\Model\Channel;
use App\User;

class GameChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\User  $user
     * @return array|bool
     */
    public function join(User $user, Channel $channel)
    {

        try {
            $userIds = [$channel->created_user, $channel->joined_user];
            if (in_array($user->id, $userIds)) {
                return true;
            }

            return false;
        }
        catch (\Exception $e) {
            \Log::alert('GammeChannel Error: '. $e);
            return false;
        }
    }
}
