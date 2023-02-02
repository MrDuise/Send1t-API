const Conversation = require('../models/conversations/conversations.mongo');


// Path: server\src\services\sockets.js
//import { addUser, removeUser, getUser, getUsersInRoom } from './users';
const {
  makeConversation,
  findConversationById,
  findCoversationsByUser,
  updateConversation,
  deleteConversation,
} = require( '../models/conversations/conversations.model');

const socketEvents = (io) => {
  io.on('connection', (socket, user) => {
    //on connection, set user status to true
    //and emit status to client
    //so that the client can update the UI
    user.status = true;
    socket.emit('status', user.status);

    socket.on('join', (conversationID) => {
      const conversation = findConversationById(conversationID);

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

    socket.on('sendMessage', (message, user, socket) => {
        //emit the message to the room that is the conversationID
      io.to(socket.activeRoom).emit('message', { user: user.name, text: message });
     
        //update the conversation with the new message in the database
      Conversation.updateOne(
        { _id: socket.activeRoom },
        {
          $push: {
            messages: message,
          },
        }
      );
      io.to(socket.activeRoom).emit('message', message);
    });

    socket.on('disconnect', () => {
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
    });
  });
};

module.exports = { socketEvents };
