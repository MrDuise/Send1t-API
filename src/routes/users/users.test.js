const request = require('supertest');

const app = require('../../app');
const { mongoConnectTEST, mongoDisconnect } = require('../../services/mongo');

const User = require('../../models/users/users.mongo');

const { isValidObjectId } = require('mongoose');

const apiRoute = 'http://localhost:8000/api/v1';

describe('Users API', () => {
  let connection;
  let mongoose;
  let collection;
  beforeAll(async () => {
    mongoose = await mongoConnectTEST();
  });

  afterAll(async () => {
    // console.log("User ", );
    await User.collection.deleteMany({});
    await mongoDisconnect();
  });

  const validRegisterUser = {
    userName: 'JohnDoe',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password',
    email: 'johndoe@yahoo.com',
  };

  const validLoginUser = {
    userName: 'JohnDoe',
    password: 'password',
  };

  const invalidLoginUser = {
    userName: 'JohnDoe',
    password: 'wrongPassword',
  };

  describe('POST /users/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post(`/v1/users/register`)
        .send(validRegisterUser)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).toEqual({
        _id: expect.any(String),
        userName: 'JohnDoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@yahoo.com',
        password: expect.any(String),
        profilePicture: '',
        status: false,
        conversationLog: [],
        contacts: [],
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        blockedUsers: [],
        __v: 0,
      });

      const responseDate = new Date(res.body.updatedAt);

      expect(isValidObjectId(res.body._id)).toBe(true);

      expect(res.body.password).not.toBe('password');
      expect(typeof res.body.password).toEqual('string');
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
        message: 'Please fill out all fields',
      });
    });

    test('should return 400 if firstName is missing', async () => {
      const res = await request(app)
        .post('/v1/users/register')
        .send({
          userName: 'JohnDoe',
          lastName: 'Doe',
          password: 'password',
          email: 'johndoe@yahoo.com',
        })
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).toEqual({
        message: 'Please fill out all fields',
      });
    });

    test('should return 400 if lastName is missing', async () => {
      const res = await request(app)
        .post('/v1/users/register')
        .send({
          userName: 'JohnDoe',
          firstName: 'John',
          password: 'password',
          email: 'johndoe@yahoo.com',
        })
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).toEqual({
        message: 'Please fill out all fields',
      });
    });

    test('should return 400 if password is missing', async () => {
      const res = await request(app)
        .post('/v1/users/register')
        .send({
          userName: 'JohnDoe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@yahoo.com',
        })
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).toEqual({
        message: 'Please fill out all fields',
      });
    });

    test('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/v1/users/register')
        .send({
          userName: 'JohnDoe',
          firstName: 'John',
          lastName: 'Doe',
          password: 'password',
        })
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).toEqual({
        message: 'Please fill out all fields',
      });
    });

    test('should return 400 if userName is already taken', async () => {
      const res = await request(app)
        .post('/v1/users/register')
        .send({
          userName: 'JohnDoe',
          firstName: 'John',
          lastName: 'Doe',
          password: 'password',
          email: 'johndoe@yahoo.com',
        })
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).toEqual({
        message: 'Username/Email not available',
      });
    });
  });

  describe('POST /users/login', () => {
    it('should login a user', async () => {
      const res = await request(app)
        .post(`/v1/users/login/local`)
        .send(validLoginUser)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200);

      expect(res.body).toEqual({
        _id: expect.any(String),
        userName: 'JohnDoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@yahoo.com',
        password: expect.any(String),
        profilePicture: '',
        status: false,
        conversationLog: [],
        contacts: [],
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        blockedUsers: [],
        __v: 0,
      });
    });

    test('should return 400 if userName is missing', async () => {
      const res = await request(app)
        .post('/v1/users/login/local')
        .send({
          password: 'password',
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(404);

      expect(res.body).toEqual({
        message: 'Missing credentials',
      });
    });

    test('should return 400 if password is missing', async () => {
      const res = await request(app)
        .post('/v1/users/login/local')
        .send({
          userName: 'JohnDoe',
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(404);

      expect(res.body).toEqual({
        message: 'Missing credentials',
      });
    });

    test('should return 404 if userName is not found', async () => {
      const res = await request(app)
        .post('/v1/users/login/local')
        .send({
          userName: 'JohnDoe2',
          password: 'password',
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(404);

      expect(res.body).toEqual({
        message: 'Incorrect Data',
      });
    });

    test('should return 404 if password is incorrect', async () => {
      const res = await request(app)
        .post('/v1/users/login/local')
        .send({
          userName: 'JohnDoe',
          password: 'password5',
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(404);

      expect(res.body).toEqual({
        message: 'Incorrect Data',
      });
    });
  });
});
