import mongoose from "mongoose";
/** @type {*} 
 * Due to the potential for a large number of messages, this schema defines what a new message will look like as it
 * is added to the database. The message will be added to the messages collection in the database.
 * @param {string} sender - The sender of the message
 * @param {string} message - The message
 * @param {Date} createdAt - The date the message was created
 * @param {string} conversationId - The id of the conversation the message belongs to
 * @param {string} id - The id of the message
 * 
*/
const messagesSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    message: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1
    },
    createdAt: {
        type: DateTime,
        required: true,
    },
    conversationId: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    }
}, {
    timestamps: true
});

const Messages = mongoose.model('Messages', messagesSchema, 'messages');

module.exports = Messages;

