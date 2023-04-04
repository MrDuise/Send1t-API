const {
  getUserById,
  getUserContacts,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  createContact,
  acceptFriendRequest,
  declineFriendRequest,
  setUserStatus
} = require('../../models/users/users.model');

const passport = require('passport');

const localLogin = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log('error', err);
      res.status(203).send(err);
    } else {
      if (user) {
        req.login(user, (err) => {
          req.session.user = user;
          res.status(200).send(user);
        });
      } else {
        console.log('info', info);
        console.log('req.body', req.body);
        res.status(404).send(info);
      }
    }
  })(req, res, next);
};

const loginGoogle = async (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] });
  res.status(200).send('logged in');
};

const googleCallback = async (req, res, next) => {
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  });
};

const logout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.status(200).send('logged out');
    //res.redirect('/');
  });
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
    if (req.isAuthenticated() === false)
      return res.status(401).json({ message: 'Not authorized' });

    const user = req.session.user;
    const contacts = user.contacts;
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

  //destructure the request body
  const { firstName, lastName, userName, password, email } = req.body;

  //If any of the fields are empty return an error
  if (!firstName || !lastName || !userName || !password || !email)
    return res.status(400).json({ message: 'Please fill out all fields' });

  try {
    //make a user object from the request body
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password,
      email: email,
      conversationLog: [],
      contacts: [],
    };

    

    //create the user in the database
    const user = await createUser(newUser);

    //if the user is created successfully
    if (user !== null) {
      return res.status(201).json(user);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Username/Email not available' });
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
    if (req.isAuthenticated() === false)
      return res.status(401).json({ message: 'Not authorized' });
    let user = req.session.user;
    user = await updateUser(user._id, req.body);
    if (user !== null) {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'User not found', error });
  }
};


const changeUserStatusController = async (req, res, next) => {
  try {
    if (req.isAuthenticated() === false)
      return res.status(401).json({ message: 'Not authorized' });
   let user = req.session.user;
    user = await setUserStatus(user._id, req.body.status);
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
    if (req.isAuthenticated() === false)
      return res.status(401).json({ message: 'Not authorized' });
    const { id } = req.params;
    const user = await deleteUser(id);
    if (user !== null) {
      return res.status(200).json({ message: 'User Deleted', user });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'User not found', error });
  }
};
/**
 * Takes the user id of the current user and the user id of the friend to be added
 * then addes the friend to the current users contacts array in a pending status
 * and adds the current user to the friends contacts array in a pending status
 *
 * @param {*} req the body of the request should contain the current user id and the friend id
 * @param {*} res should return a message indicating success or failure of sending the request
 * @param {*} next
 * @return {*}
 */
const sendFriendRequest = async (req, res, next) => {
  try {
    //if the user is not authenticated return an error
    if (req.isAuthenticated() === false)
      return res.status(401).json({ message: 'Not authorized' });

    //get the friendsUserName from the request body
    const { friendUserName } = req.body;
    //get the current user from the session
    const currentUser = req.session.user;

    if (currentUser !== null) {
      const friend = await getUserByUsername(friendUserName);
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
        const updatedUser = await createContact(
          currentUser.userName,
          newContact
        );
        //update the friend in the database
        //the friend is updated with the new contact object
        const updatedFriend = await createContact(
          friend.userName,
          friendNewContact
        );

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

/**
 * Takes the userName of the current user and the userName of the friend 
 *
 * @param {*} req - the body of the request should contain the friends userName
 * @param {*} res - should return a message indicating success of accepting the request
 * @param {*} next
 * @return {*}  - returns a message indicating success or failure of accepting the request
 */
const acceptFriendRequestController = async (req, res, next) => {
  try {
    if (req.isAuthenticated() === false)
      return res.status(401).json({ message: 'Not authorized' });
    //get the current user and the friend ids from the request body
    const  {friendUserName } = req.body;

    //in the signed in user's contacts array find the friend request then accept it and return the updated array
    const currentUserContacts = acceptFriendRequest(req.session.user.userName, friendUserName);
    //in the friend's contacts array find the friend request then accept it and return the updated array
    const friendContacts = acceptFriendRequest(friendUserName, req.session.user.userName);
    if (currentUserContacts !== null && friendContacts !== null) {
      return res.status(200).json({ message: 'Friend request accepted' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//TODO: fix the decline of friend request
const declineFriendRequestController = async (req, res, next) => {
  try {
    //get the current user and the friend ids from the request body
    const { currentID, friendID } = req.body;

    //in the signed in user's contacts array find the friend request then accept it and return the updated array
    const currentUserContacts = declineFriendRequest(currentID, friendID);
    //in the friend's contacts array find the friend request then accept it and return the updated array
    const friendContacts = declineFriendRequest(friendID, currentID);
    if (currentUserContacts !== null && friendContacts !== null) {
      return res.status(200).json({ message: 'Friend request declined' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  localLogin,
  loginGoogle,

  logout,
  getUserContactsController,
  getUserByIdController,
  register,
  updateUserController,
  deleteUserController,
  sendFriendRequest,
  acceptFriendRequestController,
  changeUserStatusController
};
