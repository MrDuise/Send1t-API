const request = require('supertest');

const { mongoConnectTEST, mongoDisconnect } = require('../../services/mongo');
const app = require('../../app');

const { localLogin, register } = require('../users/users.controller');

const Conversations = require('../../models/conversations/conversations.mongo');
const Users = require('../../models/users/users.mongo');
const Messages = require('../../models/messages/messages.mongo');

const { isValidObjectId } = require('mongoose');

const apiRoute = 'http://localhost:8000/api/v1';

describe('Conversations API', () => {
  let connection;
  let mongoose;
  let collection;

  const testUser1 = {
    firstName: 'John',
    lastName: 'Doe',
    userName: 'JohnDoe',
    password: 'password',
    email: 'johndoe@yahoo.com',
  }

  const testUser2 = {
    firstName: 'Zac',
    lastName: 'Doe',
    userName: 'fuckyouZac',
    password: 'password1',
    email: 'zacdoe@gmail.com',
  }

  beforeAll(async () => {
    mongoose = await mongoConnectTEST();

    

    const test1 = await request(app).post(`/v1/users/register`).send(testUser1);

    const test2 = await request(app).post(`/v1/users/register`).send(testUser2);

    const res = await localLogin({
      userName: 'JohnDoe',
      password: 'password',
    });
  });

  afterAll(async () => {
    await Conversations.collection.deleteMany({});
    await Users.collection.deleteMany({});
    await mongoDisconnect();
    const response = await fetch(`${apiRoute}/users/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  const validNewConversation = {
    admin: 'test',
    createdAt: Date.now(),
    participants: ['tester1', 'test2'],
    isGroup: false,
  };

  const invalidConversation = {
    _id: 'test',
    createdAt: Date.now(),
    participants: ['tester1', 'test2'],
    isGroup: false,
    dateUpdated: Date.now(),
  };

  const validMessage = {
    _id: '12',
    conversationId: '1',
    sender: 'tester1',
    message: 'test',
    createdAt: Date.now(),
  };

  describe('POST /conversations', () => {
    it('should create a new conversation', async () => {
      const res = await request(app)
        .post(`/v1/conversations/createConversation`)
        .send(validNewConversation)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).toEqual({
        _id: expect.any(String),
        admin: 'test',
        createdAt: expect.any(Date),
        participants: ['tester1', 'test2'],
        isGroup: false,
        dateUpdated: expect.any(Date),
      });
    });
  });

  /*

    describe('POST /conversations/:conversationId/messages', () => {
        it('should create a new message', async () => {
            const res = await request(app)
                .post(`/v1/conversations/${validConversation._id}/messages`)
                .send(validMessage)
                .expect('Content-Type', /json/)
                .expect(201);
            
            expect(res.body).toEqual({
                _id: expect.any(String),
                conversationId: "1",
                sender: "tester1",
                message: "test",
                createdAt: expect.any(Date)
            });
        });
    });

    describe('GET /conversations/:conversationId/messages', () => {
        it('should get all messages in a conversation', async () => {
            const res = await request(app)
                .get(`/v1/conversations/${validConversation._id}/messages`)
                .expect('Content-Type', /json/)
                .expect(200);
            
            expect(res.body).toEqual({
                _id: expect.any(String),
                conversationId: "1",
                sender: "tester1",
                message: "test",
                createdAt: expect.any(Date)
            });
        });
    });

    describe('GET /conversations/:conversationId/messages', () => {
        it('should not get all messages in a conversation', async () => {
            const res = await request(app)
                .get(`/v1/conversations/123/messages`)
                .expect('Content-Type', /json/)
                .expect(404);
            
            expect(res.body).toEqual({
                error: "No conversation found"
            });
        });
    }, 10000);
*/
});
