const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// подключаемся к redis
const subscriber = require('redis').createClient({
    host: 'redis',
    port: 6379,
    password: 'react_socket'
});

// подписываемся на изменения в каналах redis
subscriber.on('message', function(channel, message) {
    // пересылаем сообщение из канала redis в комнату socket.io
    io.emit('myproject_database_chat', message);
});

// открываем соединение socket.io
io.on('connection', function(socket){
    // подписываемся на канал redis 'eustatos' в callback
    subscriber.subscribe('myproject_database_chat');
});

const port = process.env.PORT || 6007;

http.listen(
    port,
    function() {
        console.log('Listen at ' + port);
    }
);