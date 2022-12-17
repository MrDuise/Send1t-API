//import mongoose from 'mongoose';
const User = require('./users.mongo.js');

/**
 * takes the users id and returns the user object
 *
 * @param {*} id - the users id
 */
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Takes the user object passed in from the controller and adds it to the database
 * used by the register controller
 * @param {*} user
 * @return {*}
 */
const createUser = async (user) => {
  try {
    const response = await User.create(user);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Takes the user id and the user object and updates the user in the database
 *
 * @param {*} id
 * @param {*} user
 * @return {*}
 */
const updateUser = async (id, user) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    if (updatedUser === null) throw new Error('User not found');

    return updatedUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Takes the user id and deletes the user from the database
 *
 * @param {*} id
 * @return {*}
 */
const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser === null) throw new Error('User not found');
    return deletedUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Takes the user id and returns the users contacts array
 *
 * @param {*} id - the users id
 * returns the users contacts array if found
 * returns an error if the user is not found
 */
const getUserContacts = async (id) => {
  try {
    const user = await getUserById(id);
    if (user) {
      return user.contacts;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
/**
 *
 *
 * @param {*} id - the users id
 * @param {*} contact - the contact object to be added to the users contacts array
 * @return {*} - the updated contacts array
 */
const createContact = async (id, contact) => {
  try {
    const user = await getUserById(id);
    if (user !== null) {
      user.contacts.push(contact);
      await user.save();
      return user.contacts;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};


/**
 *
 *
 * @param {*} id - the users id
 * @param {*} contactId - the id of the contact to be added
 * @return {*} 
 */
const acceptFriendRequest = async (id, contactId) => {
  try {
    const user = await getUserById(id);
    if (user) {
      const contact = user.contacts.find((contact) => {
        return contact.id.toString() === contactId;
      });

      contact.status = 'accepted';

      const updatedUser = await User.findByIdAndUpdate(id, user, {
        new: true,
      });
      if (updatedUser === null) throw new Error('User not found');
      return updatedUser;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const declineFriendRequest = async (id, contactId) => {
  try {
    const user = await getUserById(id);
    if (user) {
      const contacts = user.contacts.filter((contact) => {
        return contact.id.toString() !== contactId;
      });
      user.contacts = contacts;

      const updatedUser = await User.findByIdAndUpdate(id, user, {
        new: true,
      });
      if (updatedUser === null) throw new Error('User not found');
      return updatedUser;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}


const getContactById = async (id, contactId) => {
  try {
    const user = await getUserById(id);
    if (user) {
      const contact = user.contacts.find((contact) => {
        return contact._id.toString() === contactId;
      });
      return contact;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
/**
 * Takes the users id and the contact id and deletes the contact from the users contacts array
 *
 * @param {*} id - the users id
 * @param {*} contactId - the id of the contact to be deleted
 * @return {*} - the updated contacts array
 */
const deleteContact = async (id, contactId) => {
  try {
    const user = await getUserById(id);
    if (user) {
      const contacts = user.contacts.filter((contact) => {
        return contact._id.toString() !== contactId;
      });
      user.contacts = contacts;
      await user.save();
      return user.contacts;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getUserById,
  getUserContacts,
  createUser,
  updateUser,
  deleteUser,
  createContact,
  getContactById,
  acceptFriendRequest,
  declineFriendRequest,
  deleteContact,
};
