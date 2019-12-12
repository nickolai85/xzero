<?php
use App\Events\UserSignedUp;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

    $data = [
        'event' => 'UserSignedUp',
        'data' =>[
            'username' => 'Kolean'
        ]
    ];

    event(new UserSignedUp('Kolean'));
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
