const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const path = require('path');

const app = express();



app.use(cors());

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

const messages = [];


const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server running on Port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {

    console.log('New client! Its id -' + socket.id);

    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => { console.log('Oh, socket ' + socket.id + ' has left') });

    console.log('I\'ve added a listener on a message event \n');

});

