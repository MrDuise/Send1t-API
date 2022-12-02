const express = require('express');
const { use } = require('passport');
const usersRouter = express.Router();

const { getUserContactsController,
    getUserByIdController,
    createUserController,
    updateUserController,
    deleteUserController } = require('./users.controller');


usersRouter.post('/createUser', createUserController);





module.exports = usersRouter;