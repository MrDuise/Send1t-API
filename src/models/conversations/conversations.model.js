//Research how to do transactions in Node.js
const Conversation = require('./conversations.mongo');

/**
 * Takes a conversation object and adds it to the database
 *
 * @param {*} newConversation - the conversation object to be added to the database
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
};

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
};

const getParticipants = async (id) => {
  try {
    const conversation = await Conversation.findById(id);
    return conversation.participants;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
/**
 * Adds a new user to an excisting conversation
 *
 * @param {*} id - the id of the conversation
 * @param {*} participant - the user name of the new participant
 * @return {*}
 */
const addParticipant = async (id, participant) => {
  try {
    const conversation = await Conversation.findById(id);
    conversation.participants.push(participant);
    //if the conversation has more than 2 participants, it is a group conversation
    if (conversation.participants.length > 2) {
      conversation.isGroup = true;
    }

    await conversation.save();
    return conversation;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateConversation = async (req, res) => {};

const addMessage = async (id, message) => {
  try {
    const conversation = await Conversation.findById(id).populate('messages');
    conversation.messages.push(message);
    await conversation.save();

    return conversation;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteConversation = async (req, res) => {};

module.exports = {
  makeConversation,
  findConversationById,
  findCoversationsByUser,
  updateConversation,
  deleteConversation,
  addMessage,
};
