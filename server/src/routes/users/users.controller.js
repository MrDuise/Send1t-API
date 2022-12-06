const {
  getUserById,
  getUserContacts,
  createUser,
  updateUser,
  deleteUser,
} = require('../../models/users/users.model');

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
    if (contacts !== null && contacts.length > 0) {
      return res.status(200).json(contacts);
    } else if (contacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'User not found', error });
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'User not found' });
  }
};

/**
 *
 * @param {*} res - the response object
 * @param {*} next - the next middleware function
 * @returns
 */
const register = async (req, res, next) => {
  try {
    //make a user object from the request body
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      conversationLog: [],
      contacts: [],
    };

    //create the user
    const user = await createUser(newUser);
    if (user !== null) {
      console.log(user);
      return res.status(201).json(user);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Username/Email not available', error: error });
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
    return res.status(404).json({ message: 'User not found', error });
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

module.exports = {
  localLogin,
  loginGoogle,
  loginFacebook,
  logout,
  getUserContactsController,
  getUserByIdController,
  register,
  updateUserController,
  deleteUserController,
};
