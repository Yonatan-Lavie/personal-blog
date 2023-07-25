import request from 'supertest';
import { app } from '../src/index'; // Assuming the Express app is exported from index.ts

describe('API Tests', () => {
  it('should get all posts with comments and pagination', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(200);
    // Add more assertions based on the expected response data
  });

  it('should add a like to a post', async () => {
    // Write test for adding a like to a post
  });

  // Add more tests for other API endpoints and scenarios
});