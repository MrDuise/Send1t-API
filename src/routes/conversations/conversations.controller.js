const {
  makeConversation,
  findConversationById,
  findCoversationsByUser,
  addMessage,
  getMessages,
} = require('../../models/conversations/conversations.model');

const {
  addConversation,
  getUserByUsername,
} = require('../../models/users/users.model');

/*
 *-----------------------------------------
 * CRUD OPERATIONS FOR CONVERSATIONS
 * CREATE
 * ----------------------------------------
 */

/**
 * When a user creates a new conversation, this function is called to add the conversation to the database
 *
 * @param {*} req - the body of the request should contain the admin, participants, and isGroup properties
 * The admin is the one who started the conversation,
 * The participants is an array of the users that are a part of the conversation
 * isGroup is a boolean that is true if the conversation is a group conversation - this means more then 2 people are in the conversation
 *
 * @param {*} res - the response will be the conversation object if it was successfully added to the database or an error if not
 */
const createConversation = async (req, res) => {
  //check if the user is signed in
  if (req.isAuthenticated() === false)
    return res.status(401).json({ message: 'Not authorized' });

  const { participants, isGroup } = req.body;

  //the one who started the conversation is automatically added to the participants array
  participants.push(req.session.user.userName);

  try {
    for (const participant of participants) {
      const user = await getUserByUsername(participant);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
    }

    const admin = req.session.user.userName;

    const newConversation = {
      admin,
      participants,
      isGroup,
    };
    const savedConversation = await makeConversation(newConversation);

    //add the conversation to the users conversations array for each participant
    participants.forEach(async (participant) => {
      await addConversation(participant, savedConversation._id);
    });

    res.status(201).json(savedConversation);
  } catch (error) {
    console.error(error);
    //return res.status(400).send({message: error.message});
  }
};

/**
 * Takes a conversation id and a message object and adds the message to the conversation
 * this method will be called by the web-sockets
 * @param {*} req - the body of the request should contain the conversation id and the message object
 * @param {*} res - the response will be the conversation object if the message was added or an error if not
 * @return {*}
 */
const saveMessage = async (req, res) => {
  if (req.isAuthenticated() === false)
    return res.status(401).json({ message: 'Not authorized' });

  const { conversationId, sender, message } = req.body;

  const newMessage = {
    sender: sender,
    message: message,
    conversationId: conversationId,
  };

  try {
    const savedMessage = await addMessage(newMessage);
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

/*
 *-----------------------------------------
 * CRUD OPERATIONS FOR CONVERSATIONS
 * READ
 * ----------------------------------------
 */

/**
 * Takes a conversation id and returns the conversation object if found
 * used when a user clicks on a conversation to view it
 *
 * @param {*} req - the body of the request should contain the conversation id
 * @param {*} res - the response will be the conversation object if found or an error if not
 */
const getConversation = async (req, res) => {
  //check if the user is signed in
  if (req.isAuthenticated() === false)
    return res.status(401).json({ message: 'Not authorized' });

  const { conversationId } = req.body;
  console.log(conversationId);
  try {
    const conversation = await findConversationById(conversationId);
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Takes the user name and returns all conversations that the user is a part of
 * used when a user logs in to populate the Conversations log page
 *
 * @param {*} req
 * @param {*} res
 */
const getUserConversations = async (req, res) => {
  //check if the user is signed in
  if (req.isAuthenticated() === false)
    return res.status(401).json({ message: 'Not authorized' });

  const { userName } = req.body;
  try {
    const conversations = await findCoversationsByUser(userName);
    res.status(200).json({ conversationList: conversations });
  } catch (error) {
    res.status(500).json(error);
  }
};


/**
 * Returns the message log for a conversation
 * TODO: add pagination
 * @param {*} req
 * @param {*} res
 * @return {*} 
 */
const getMessageLog = async (req, res) => {
  //check if the user is signed in
  if (req.isAuthenticated() === false)
    return res.status(401).json({ message: 'Not authorized' });

  const { conversationId } = req.body;
  try {
    const messages = await getMessages(conversationId);
    res.status(200).json({ messages: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};


module.exports = {
  createConversation,
  getConversation,
  getUserConversations,
  saveMessage,
  getMessageLog,
};
