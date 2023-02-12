const request = require('supertest-session');

const { mongoConnectTEST, mongoDisconnect } = require('../../services/mongo');
const app = require('../../app');

const { localLogin, register } = require('../users/users.controller');

const Conversations = require('../../models/conversations/conversations.mongo');
const Users = require('../../models/users/users.mongo');
const Messages = require('../../models/messages/messages.mongo');

const { isValidObjectId } = require('mongoose');
const { authenticate } = require('passport');

const apiRoute = 'http://localhost:8000/api/v1';

describe('Conversations API ', () => {
  let connection;
  let mongoose;
  let collection;

  const testUser1 = {
    firstName: 'Jane',
    lastName: 'Doe',
    userName: 'JaneDoe',
    password: 'password',
    email: 'janedoe@yahoo.com',
  };

  const testUser2 = {
    firstName: 'Zac',
    lastName: 'Doe',
    userName: 'fuckyouZac',
    password: 'password1',
    email: 'zacdoe@gmail.com',
  };

  beforeAll(async () => {
    mongoose = await mongoConnectTEST();

    const test1 = await request(app).post(`/v1/users/register`).send(testUser1);

    const test2 = await request(app).post(`/v1/users/register`).send(testUser2);
  });

  afterAll(async () => {
    await Conversations.collection.deleteMany({});
    await Users.collection.deleteMany({});
    await mongoDisconnect();
  });
  let validConversationID = null;
  let testSession = null;

  const validNewConversation = {
    participants: ['fuckyouZac'],
    isGroup: false,
  };

  const invalidConversation = {
    participants: ['test2'],
    isGroup: false,
  };

  const validMessage = {
    sender: 'JaneDoe',
    message: 'This is a test message',
    conversationId: null,
  };

  describe('POST /conversations failure', () => {
    it('should return 401 not authorized', async () => {
      const res = await request(app)
        .post(`/v1/conversations/createConversation`)
        .send(validNewConversation)
        .expect('Content-Type', /json/)
        .expect(401);

      expect(res.body).toEqual({
        message: 'Not authorized',
      });
    });
  });

  describe('POST /conversations', () => {
    let authenticatedSession;
    beforeEach(async () => {
      testSession = request(app);
      const response = await testSession
        .post('/v1/users/login/local')
        .send({
          userName: 'JaneDoe',
          password: 'password',
        })
        .expect(200);

      authenticatedSession = testSession;
    });

    it('should create a new conversation', async () => {
      const res = await authenticatedSession
        .post(`/v1/conversations/createConversation`)
        .send(validNewConversation)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).toEqual({
        _id: expect.any(String),
        admin: 'JaneDoe',
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        participants: ['fuckyouZac', 'JaneDoe'],
        isGroup: false,
        __v: 0,
      });

      validConversationID = res.body._id;
    });

    it('should return 400 if conversation is invalid', async () => {
      const res = await authenticatedSession
        .post(`/v1/conversations/createConversation`)
        .send(invalidConversation)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).toEqual({
        message: 'User not found',
      });
    });

    it('should create a new message and save/send it', async () => {
      validMessage.conversationId = validConversationID;
      const res = await authenticatedSession
        .post(`/v1/conversations/saveMessage`)
        .send(validMessage)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).toEqual({
        _id: expect.any(String),
        conversationId: expect.any(String),
        sender: 'JaneDoe',
        message: 'This is a test message',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: 0,
      });
    });

    //will not work
    it('should get all conversations for a user', async () => {
      const res = await authenticatedSession
        .post(`/v1/conversations/getUserConversations`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toEqual({
        conversationLog: expect.any(Array),
      });
    });
  });
});
