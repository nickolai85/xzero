<?php
use Illuminate\Support\Facades\Redis;
use App\Events\TestEvent;
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
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


Route::get('redis', function () {
    $data = [
        'event' => 'UserSignedUp',
        'data' =>[
            'username' => 'Jora'
        ]
    ];
    event(new TestEvent('Jora'));
});