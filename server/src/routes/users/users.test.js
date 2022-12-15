
const request = require('supertest');
const app = require('../../app');
const { mongoConnectTEST, mongoDisconnect } = require('../../services/mongo');
const { User } = require('../../models/users/users.mongo');
const { isValidObjectId } = require('mongoose');

const apiRoute = 'http://localhost:8000/api/v1';

describe('Users API', () => {
  let connection;

  let collection;
  beforeAll(async () => {
    await mongoConnectTEST();
    
  });

  afterAll(async () => {
    //await connection.close();
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

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('userName');
      expect(res.body).toHaveProperty('firstName');
      expect(res.body).toHaveProperty('lastName');
      expect(res.body).toHaveProperty('email');
      expect(res.body).toHaveProperty('password');
      expect(res.body).toHaveProperty('conversationLog');
      expect(res.body).toHaveProperty('contacts');
      expect(res.body).toHaveProperty('updatedAt');
      expect(res.body).toHaveProperty('createdAt');
      expect(res.body.userName).toBe('JohnDoe');
      expect(res.body.firstName).toBe('John');
      expect(res.body.lastName).toBe('Doe');
      

      const responseDate = new Date(res.body.updatedAt);

      expect(isValidObjectId(res.body._id)).toBe(true);
      
      expect(res.body.password).not.toBe('password');
      expect(res.body.password).toBeInstanceOf(String);

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
  });
});
