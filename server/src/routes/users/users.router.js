const express = require('express');
const { use } = require('passport');
const usersRouter = express.Router();
const { passport } = require('passport');
const {
  localLogin,
  getUserContactsController,
  getUserByIdController,
  register,
  updateUserController,
  deleteUserController,
  sendFriendRequest,
  acceptFriendRequestController,
} = require('./users.controller');

usersRouter.post("/login/local", localLogin);
//usersRouter.post("/login/google", loginGoogle);
//usersRouter.post("/login/facebook", loginFacebook);
usersRouter.get('/contacts/:id', getUserContactsController);
usersRouter.post('/register', register);
usersRouter.get('/getUserById/:id', getUserByIdController);
usersRouter.put('/updateUser/:id', updateUserController);
usersRouter.delete('/deleteUser/:id', deleteUserController);
usersRouter.post('/sendFriendRequest', sendFriendRequest);
usersRouter.post('/acceptFriendRequest', acceptFriendRequestController);


module.exports = usersRouter;
