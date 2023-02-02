//TODO: Import users router and transctions router

const express = require('express');

const usersRouter = require('./users/users.router');

const conversationsRouter = require('./conversations/conversations.router');


const api = express.Router();

api.use('/users', usersRouter);
api.use('/conversations', conversationsRouter);


module.exports = api;
