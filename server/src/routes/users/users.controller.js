import {
  getUserById,
  getUserContacts,
  createUser,
  updateUser,
  deleteUser,
} from '../models/users/users.model.js';

const { passport } = require('passport');


const localLogin = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      res.status(203).send(err);
    } else {
      if (user) {
        req.login(user, (err) => {
          req.session.user = user;
          res.status(200).send(user._id);
        });
      } else {
        console.log(info);
        res.status(202).send(info);
      }
    }
  })(req, res, next);
};

const loginGoogle = async (req, res, next) => {};

const loginFacebook = async (req, res, next) => {};

const logout = async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.status(200).send('logged out');
};


/**
 * Takes the user id and returns the users contacts array
 *
 * @param {*} id - the users id
 * @param {*} res - the response object
 * @param {*} next - the next middleware function
 * @returns
 */
const getUserContactsController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contacts = await getUserContacts(id);
    if (contacts !== null) {
      return res.status(200).json(contacts);
    } else if(contacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

/**
 * Takes the user id and returns the users contacts array
 *
 * @param {*} id - the users id
 * @param {*} res - the response object
 * @param {*} next - the next middleware function
 * @returns
 */
const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (user !== null) {
      return res.status(200).json(user);
    }
    else 
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

/**
 *
 * @param {*} res - the response object
 * @param {*} next - the next middleware function
 * @returns
 */
const createUserController = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    if (user !== null) {
      return res.status(201).json(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

/**
 *
 *  @param {*} res - the response object
 * @param {*} next - the next middleware function
 * @returns
 */
const updateUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await updateUser(id, req.body);
    if (user !== null) {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

/**
 * Takes the user id and returns the users contacts array
 * @param {*} res - the response object
 * @param {*} next - the next middleware function
 * @returns
 */
const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    if (user !== null) {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export {
  localLogin,
  loginGoogle,
  loginFacebook,
  logout,
  getUserContactsController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
};
