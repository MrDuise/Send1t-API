const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

const apiRoute = 'http://localhost:8000/api/v1';

describe('Users API', () => {


  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  const validRegisterUser = {
    userName: 'JohnDoe',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password',
    email: 'johndoe@yahoo.com',
  };

  describe('POST /users/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post(`${apiRoute}/users/register`)
        .send(validRegisterUser)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).toEqual({
        _id: expect.any(String),
        userName: 'JohnDoe',
        firstName: 'John',
        lastName: 'Doe',
        password: expect.any(String),
        email: 'johndoe@yahoo.com',
        conversationLog: [],
        contacts: [],
      });

      expect(res.body.password).not.toBe('password');
    });

    it('should return 400 if userName is missing', async () => {
      const res = await request(app)
        .post('/users/register')
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
