<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserMove implements ShouldQueue, ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $message, $channelID ,$to;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($message, $channelID ,$to)
    {
        $this->message    = $message;
        $this->channelID  = $channelID;
        $this->to = $to;
    }

    public function broadcastAs()
    {
        return "App\Events\UserMove_".$this->to;
    }
    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('game.'.$this->channelID);
    }
}
