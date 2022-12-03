const express = require('express');
const { use } = require('passport');
const usersRouter = express.Router();

const { getUserContactsController,
    getUserByIdController,
    createUserController,
    updateUserController,
    deleteUserController } = require('./users.controller');


usersRouter.get('/contacts/:id', getUserContactsController);
usersRouter.post('/createUser', createUserController);
usersRouter.get('/getUserById/:id', getUserByIdController);
usersRouter.put('/updateUser/:id', updateUserController);
usersRouter.delete('/deleteUser/:id', deleteUserController);





module.exports = usersRouter;