<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChannelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('channels', function (Blueprint $table) {
            $table->increments('id')->unsigned()->index();
            $table->integer('created_user')->unsigned();
            $table->integer('joined_user')->unsigned();
            $table->integer('game_id')->unsigned();
            $table->string('code', 255)->nullable();
            $table->enum('status', ['opened', 'active', 'private', 'closed'])->nullable();
            $table->timestamps();
        });

        Schema::table('channels', function($table) {
            $table->foreign('created_user')->references('id')->on('users');
            $table->foreign('joined_user')->references('id')->on('users');
            $table->foreign('game_id')->references('id')->on('games')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('channels');
    }
}
