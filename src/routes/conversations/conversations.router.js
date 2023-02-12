const express = require('express');
const { use } = require('passport');
const conversationRouter = express.Router();


const {
    createConversation,
  getConversation,
  getUserConversations,
  saveMessage,

} = require('./conversations.controller');


conversationRouter.post('/createConversation', createConversation);
conversationRouter.post('/getConversation', getConversation);
conversationRouter.post('/getUserConversations', getUserConversations);
//this route is here only for testing purposes
//it will be removed when the front end is done
//as save message will be called by the websockets
conversationRouter.post('/saveMessage', saveMessage);

module.exports = conversationRouter;


