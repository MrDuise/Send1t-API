import socketio from 'socket.io';
import http from 'http';
import {mongoConnect} from './mongo';
import {socketEvents} from './sockets';

const PORT = process.env.PORT || 8000;

async function startServer() {
    await mongoConnect();
    
    const app = require('./app').default;
    const server = http.createServer(app);
    const io = socketio(server);
    
    socketEvents(io);
    
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
    }

startServer();

// Path: server\src\services\sockets.js
import {addUser, removeUser, getUser, getUsersInRoom} from './users';


export const socketEvents = (io) => {
    io.on('connection', (socket) => {
        socket.on('join', ({name, room}, callback) => {
            const {error, user} = addUser({id: socket.id, name, room});

            if (error) return callback(error);

            socket.emit('message', {user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
            socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`});

            socket.join(user.room);

            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
            callback();
        });

        socket.on('sendMessage', (message, callback) => {
            const user = getUser(socket.id);

            io.to(user.room).emit('message', {user: user.name, text: message});
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

            callback();
        });

        socket.on('disconnect', () => {
            const user = removeUser(socket.id);

            if (user) {
                io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`});
                io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
            }
        });
    });
};


