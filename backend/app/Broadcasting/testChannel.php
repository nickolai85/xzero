<?php

namespace App\Broadcasting;
use App\Models\Channel;
use App\User;

class testChannel
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
echo '<pre>';
print_r($user->id);
echo '</pre>';
exit();
        $userIds = [$channel->created_user, $channel->joined_user];
        if (in_array($user->id, $userIds)) {
            return true;
        }

        return false;
    }
}
