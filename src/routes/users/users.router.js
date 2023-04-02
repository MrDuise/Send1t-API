const express = require('express');
const { use } = require('passport');
const usersRouter = express.Router();
const { passport } = require('passport');
const {
  localLogin,
  logout,
  getUserContactsController,
  getUserByIdController,
  register,
  updateUserController,
  deleteUserController,
  sendFriendRequest,
  acceptFriendRequestController,
  changeUserStatusController
} = require('./users.controller');

usersRouter.post("/login/local", localLogin);
//usersRouter.post("/login/google", loginGoogle);
//usersRouter.get("/google/callback", googleCallback);
usersRouter.get('/logout', logout);

usersRouter.get('/contacts', getUserContactsController);
usersRouter.post('/register', register);
usersRouter.get('/getUserById/:id', getUserByIdController);
usersRouter.put('/updateUser/:id', updateUserController);
usersRouter.delete('/deleteUser/:id', deleteUserController);
usersRouter.post('/sendFriendRequest', sendFriendRequest);
usersRouter.post('/acceptFriendRequest', acceptFriendRequestController);
usersRouter.post('/changeUserStatus', changeUserStatusController);


module.exports = usersRouter;
