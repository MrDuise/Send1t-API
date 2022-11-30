const express = require('express');
const { use } = require('passport');
const usersRouter = express.Router();

const { getUserContactsController,
    getUserByIdController,
    createUserController,
    updateUserController,
    deleteUserController } = require('./users.controller');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('/', createUser);
usersRouter.put('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);




module.exports = usersRouter;