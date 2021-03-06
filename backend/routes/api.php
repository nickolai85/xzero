<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' =>'api.auth'], function () {

    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'Api\AuthController@logout');
        Route::get('user', 'Api\AuthController@user');
        Route::post('/channel/create', 'Api\ChannelController@store')->name('create.channel');
        Route::get('/channel/list', 'Api\ChannelController@channelList')->name('channel.list');
        Route::put('/channel/join/{id}', 'Api\ChannelController@update')->name('channel.join');
        Route::post('/channel/move/{id}', 'Api\ChannelController@Move')->name('channel.Move');

    });
    Route::post('/signin', 'Api\AuthController@signIn')->name('signIn.api');
    Route::post('/signup', 'Api\AuthController@signUp')->name('signUp.api');
});