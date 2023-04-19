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
    //on connection, set user status to true
    //and emit status to client
    //so that the client can update the UI
    //user.status = true;
    //socket.emit('status', user.status);
    console.log('a user connected');

    socket.join('general');

    socket.emit('status', )

    socket.on('joinConvo', (conversationID) => {
      

      //the socket joins the room that is the conversationID
      socket.join(conversationID);
      //the socket emits a message to the room that is the conversationID
      socket.emit('message', {
        user: 'admin',
        text: `${user.name}, welcome to room ${conversation._id}.`,
      });
      //set the active room to the conversationID
      socket.activeRoom = conversationID;
    }); 

    socket.on('leaveConvo', (conversationID) => {
      //the socket leaves the room that is the conversationID
      socket.leave(conversationID);
      //the socket emits a message to the room that is the conversationID
      
    });





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
