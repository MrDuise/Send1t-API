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
conversationRouter.post('/saveMessage', saveMessage);

module.exports = conversationRouter;


