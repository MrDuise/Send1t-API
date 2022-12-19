//TODO: Import users router and transctions router

const express = require('express');

const usersRouter = require('./users/users.router');


const api = express.Router();

api.use('/users', usersRouter);
//api.use('/transactions', transactionsRouter);

module.exports = api;
