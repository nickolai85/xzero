<?php

namespace App\Http\Controllers\Api;

use App\Events\TestEvent;
use App\Models\Channel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
class ChannelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function channelList()
    {
        $list = Channel::all();
        $rs =[];
        foreach ($list as $key => $value){
            $rs[$key]['id'] = $value->id;
            $rs[$key]['owner'] = $value->gameCreator->name;
            $rs[$key]['status'] = $value->status;
        }
        $data = [
            'event' => 'UserSignedUp',
            'data' =>$rs
        ];

        return response()->json(array('success' => true, 'channels' => $rs), 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $code='';
        if($request->get('status') == 'private'){
            $code = uniqid();
        }


        $data = new Channel();
        $data->created_user  = auth()->id();
        $data->joined_user = 0;
        $data->game_id = $request->get('game_id');
        $data->code = $code;
        $data->status = $request->get('status');
        $data->save();
       // broadcast(new TestPivateEvent($data, 3))->toOthers();
        $rs =[
          'id'=>  $data->id,
          'owner'=>  $request->user()->name,
         // 'status'=>  $request->get('status')
        ];
        event(new TestEvent($rs));
        return response()->json(array('success' => true, 'id' => $data->id,'code' => $data->code), 200);


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        echo '<pre>';
        print_r($request->all());
        echo '</pre>';
        exit();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
