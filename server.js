const path = require('path')
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./format/messages')
const userJoin = require('./format/users')
const app = express();
const server = http.createServer(app);
const IO = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));
const PORT = 3000;



//runs when client connects
IO.on('connection', socket => {

    //runs when client sends join room (on join) 
    socket.on('join room', ({username, room}) => {
        console.log(`${username} joined room: ${room}`)
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)
        socket.emit('message', formatMessage('Server', `${user.username} has joined the room`));
        socket.broadcast.to(user.room).emit('message', formatMessage('Server',`${user.username} has joined the chat`))
    

    //runs when the socket loses a connection
    socket.on('disconnect', () => {
        IO.emit('message', formatMessage('Server',`${user.username} has left the room`))
    })

    //runs when client emits a message
    socket.on('chatMessage', (msg) => {
        // console.log(user+": "+ msg)
        IO.to(user.room).emit('message',formatMessage(user.username, msg.msg))
    })

    })
    
    
 
})


//starts the server, but allowing it to listen to a specific port based on PORT variable
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
