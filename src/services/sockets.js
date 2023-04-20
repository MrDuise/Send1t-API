const Conversation = require('../models/conversations/conversations.mongo');


// Path: server\src\services\sockets.js
//import { addUser, removeUser, getUser, getUsersInRoom } from './users';
const {
  makeConversation,
  findConversationById,
  findCoversationsByUser,
  updateConversation,
  deleteConversation,
  addMessage,
} = require( '../models/conversations/conversations.model');

const socketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected');

   
    socket.on('sendMessage', async (message) => {
        //emit the message to the room that is the conversationID
      console.log("In the socket.io event", message);
     const newMessage =  await addMessage(message);
      io.emit('sendMessage', newMessage);
     
    });

   socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data);
    });

    socket.on('stopTyping', (data) => {
      socket.broadcast.emit('stopTyping', data);
    });

    socket.on('statusChange', (data) => {
      socket.broadcast.emit('statusChange', data);
    });
    

    /* socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('message', {
          user: 'admin',
          text: `${user.name} has left.`,
        });
        io.to(user.room).emit('roomData', {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      }
    }); */
  });
};

module.exports = {socketEvents}
