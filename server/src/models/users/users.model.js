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
 * Takes the user id and returns the users contacts array
 *
 * @param {*} id - the users id
 */
const getUserContacts = async (id) => {
  try {
    const user = await getUserById(id);
    if (user) {
      return user.contacts;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createContact = async (id, contact) => {
  try {
    const user = await getUserById(id);
    if (user) {
      user.contacts.push(contact);
      await user.save();
      return user.contacts;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const createUser = async (user) => {
  try {
    const response = await User.create(user);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateUser = async (id, user) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    return updatedUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  getUserById,
  getUserContacts,
  createUser,
  updateUser,
  deleteUser,
  createContact, 
};
