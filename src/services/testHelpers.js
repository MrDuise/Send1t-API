const request = require('supertest');

const app = require('../app')

const localLogin = async (user) => {
    const res = await request(app)
        .post('/v1/users/login/local')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(202);
    return res.body.token;
}


module.exports = {
    localLogin
}
