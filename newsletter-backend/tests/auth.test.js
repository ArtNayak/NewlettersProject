import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js'; // assuming server.js exports your express app
import Faculty from '../models/Faculty.js';

// Set a longer timeout for DB operations
jest.setTimeout(20000);

beforeAll(async () => {
  // Connect to a test database (separate from production)
  await mongoose.connect('mongodb://127.0.0.1:27017/newsletter_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Clear faculty collection before tests
  await Faculty.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe(' Auth API Tests', () => {

  test('POST /auth/register - should register a new faculty', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test Faculty',
        email: 'faculty@test.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Faculty registered successfully');
  });

  test('POST /auth/login - should login and return JWT token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'faculty@test.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  test('POST /auth/login - should fail with wrong password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'faculty@test.com',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });
});
