const request = require('supertest');
//const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

import { jest } from '@jest/globals'

const createUser = jest.fn()
const app = makeApp({createUser})

const apiRoute = 'http://localhost:8000/api/v1';

describe('Users API', () => {


  beforeAll(async () => {
    createUser.mockReset()
    //await mongoConnect();
  });

  afterAll(async () => {
    //await mongoDisconnect();
  });

  const validRegisterUser = {
    userName: 'JohnDoe',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password',
    email: 'johndoe@yahoo.com',
  };

  describe('POST /users/register', () => {
    test('should register a new user', async () => {
      const res = await request(app)
        .post(`/v1/users/register`)
        .send(validRegisterUser)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).toEqual({
        __v: 0,
        _id: expect.any(String),
        userName: 'JohnDoe',
        firstName: 'John',
        lastName: 'Doe',
        password: expect.any(String),
        email: 'johndoe@yahoo.com',
        conversationLog: [],
        contacts: [],
        blockerUsers: [],
        createdAt: expect.any(new Date()),
        updatedAt: expect.any(new Date()),
      });

      expect(res.body.password).not.toBe('password');
    });

    test('should return 400 if userName is missing', async () => {
      const res = await request(app)
        .post('/v1/users/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          password: 'password',
          email: 'johndoe@yahoo.com',
        })
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).toEqual({
        message: 'userName is required',
      });
    });
  });
});
