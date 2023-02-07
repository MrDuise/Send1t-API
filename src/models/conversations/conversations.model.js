//Research how to do transactions in Node.js
const Conversation = require('./conversations.mongo');

const Messages = require('../messages/messages.mongo');

/*
 *-----------------------------------------
 * CRUD OPERATIONS FOR CONVERSATIONS
 * CREATE
 * ----------------------------------------
 */

/**
 * Takes a conversation object and adds it to the database
 *
 * @param {*} newConversation - the conversation object to be added to the database
 */
const makeConversation = async (newConversation) => {
  try {
    const savedConversation = await Conversation.create(newConversation);
    return savedConversation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Addes a message to the messages database. Each message has a conversation ID field, linking it to a conversation
 * This function gets called by the Web-socket connection function when a users sends a message
 * @param {*} message - the message object that is being added to the database
 * @return {*} - the new message
 */
const addMessage = async (message) => {
  try {
   const newMessage = await Messages.create(message);

    return newMessage;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/*
 *-----------------------------------------
 * CRUD OPERATIONS FOR CONVERSATIONS
 * READ
 * ----------------------------------------
 */

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
    console.error(error);
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
    console.error(error);
    throw error;
  }
};
/**
 * gets all messages of a conversation from the messages collection
 *
 * @param {*} id - the ID of the conversation that needs to be matched
 * @return {*} - an array of
 */
const getMessages = (id) => {
  const messages = Messages.find({ conversationId: id });

  messages.sort();
  messages.reverse();

  return messages;
};

/**
 * gets all participants of a conversation
 *
 * @param {*} id - the id of the conversation
 * @return {*} - the array of participants
 */
const getParticipants = async (id) => {
  try {
    const conversation = await Conversation.findById(id);
    return conversation.participants;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/*
 *-----------------------------------------
 * CRUD OPERATIONS FOR CONVERSATIONS
 * UPDATE
 * ----------------------------------------
 */

/**
 * Adds a new user to an excisting conversation
 *
 * @param {*} id - the id of the conversation
 * @param {*} participant - the user name of the new participant
 * @return {*} - the updated conversation object
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
    console.error(error);
    throw error;
  }
};

/*
 *-----------------------------------------
 * CRUD OPERATIONS FOR CONVERSATIONS
 * DELETE
 * ----------------------------------------
 */

/**
 * Removes the participant from the conversations list of participants, removing them from the conversation
 * This prevents a user from deleteing a conversation and removing it for everyone involed
 * If the conversation has no participants left, it is deleted from the database
 *
 * @param {*} id - the id of the Conversation
 * @param {*} participant
 * @return {*}
 */
const deleteConversation = async (id, participant) => {
  try {
    const conversation = await Conversation.findById(id);
    const index = conversation.participants.indexOf(participant);
    conversation.participants.splice(index, 1);
    if (conversation.participants.length === 0) {
      await Conversation.findByIdAndDelete(id);
    }

    await conversation.save();
    return conversation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  makeConversation,
  findConversationById,
  findCoversationsByUser,
  getMessages,
  deleteConversation,
  addMessage,
  addParticipant,
  getParticipants,
};
