import mongoose from "mongoose";
import User from "./users.mongo.js";

/**
 * takes the users id and returns the user object
 *
 * @param {*} id - the users id
 */
const getUserById = async (id) => {
    User.findById(id, (err, user) => {
        if (err) {
            return err;
        }
        return user;
    });
}

/**
 * Takes the user id and returns the users contacts array
 *
 * @param {*} id - the users id
 */
const getUserContacts = async (id) => {
    User.findById(id, (err, user) => {
        if (err) {
            return err;
        }
        return user.contacts;
    });
}


const createUser = async (user) => {

}

const updateUser = async (id, user) => {

}

const deleteUser = async (id) => {


}

module.exports = {
    getUserById,
    getUserContacts,
    createUser,
    updateUser,
    deleteUser
}

