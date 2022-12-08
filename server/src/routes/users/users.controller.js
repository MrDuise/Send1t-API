const {
  getUserById,
  getUserContacts,
  createUser,
  updateUser,
  deleteUser,
  createContact,
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

const sendFriendRequest = async (req, res, next) => {
  try {
    //get the current user and the friend ids from the request body
    const { currentID, friendID } = req.body;
    //get the current user from the database
    const currentUser = await getUserById(currentID);

    if (currentUser !== null) {
      const friend = await getUserById(friendID);
      if (friend !== null) {
        //create a new contact object for the current user

        //the new contact object uses the information from the user profile but is limited.
        //the status is set to pending so that the user can accept or decline the request
        //the status is also used to only show it in the pending requests section and not the contacts section

        //this is the new contact object for the current user or the one sending the request
        const newContact = {
          id: friend._id,
          userName: friend.userName,
          firstName: friend.firstName,
          lastName: friend.lastName,
          status: 'pending',
        };
        //this is the new contact object for the friend or the one receiving the request
        const friendNewContact = {
          id: currentUser._id,
          userName: currentUser.userName,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          status: 'pending',
        };

        //update the current user in the database
        //the current user is updated with the new contact object
        const updatedUser = await createContact(currentID, newContact);
        //update the friend in the database
        //the friend is updated with the new contact object
        const updatedFriend = await updateUser(friendID, friendNewContact);

        if (updatedUser !== null && updatedFriend !== null) {
          return res.status(200).json({ message: 'Friend request sent' });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//order of friend request
//get the current signed in user that has a friend request

//TODO: fix the acception of friend request
const acceptFriendRequest = async (req, res, next) => {
  try {
    //get the current user and the friend ids from the request body
    const currentuser = await getUserById(req.body.currentID);

    if (currentuser !== null) {
      const friend = currentuser.friendRequests.find(
        (request) => request._id == req.body.friendID
      );
      if (friend !== null) {
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//TODO: fix the decline of friend request
const declineFriendRequest = async (req, res, next) => {
  try {
    //get the current user and the friend ids from the request body
    const currentuser = await getUserById(req.body.currentID);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error)
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
