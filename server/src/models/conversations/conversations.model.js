//Research how to do transactions in Node.js
const Conversation = require('./conversations.mongo');

/**
 * Takes a conversation object and adds it to the database
 *
 * @param {*} newConversation
 */
const makeConversation = async (newConversation) => {
  try {
    const savedConversation = await Conversation.create(newConversation);
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
};
/**
 * Finds a single conversation by its id. Used when a user clicks on a conversation to view it
 * This coversation will be used to populate the Messages page and the settings page for that conversation
 *
 * @param {*} id
 * @return {*} 
 */
const findConversationById = async (id) => {
    try {
        const conversation = await Conversation.findById(id);
        return conversation;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
/**
 * Finds all conversations that a user is a part of. Used when a user logs in to populate the Conversations log page
 *
 * @param {*} userName - the user name of the user that is logged in
 * @return {*} - an array of conversation objects
 */
const findCoversationsByUser = async (userName) => {
    try {
        const conversations = await Conversation.find({
            participants: { $in: [userName] },
        });
        return conversations;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const updateConversation = async (req, res) => {};

const deleteConversation = async (req, res) => {};

module.exports = {
    makeConversation,
    findConversationById,
    findCoversationsByUser,
  updateConversation,
  deleteConversation,
};
