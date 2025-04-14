const request = require('supertest');
const app = require('../index'); // Import app từ index.js
const mongoose = require('mongoose');
require('dotenv').config(); // Đảm bảo nạp biến môi trường từ .env (có ích khi chạy local)

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('🛒 API Giỏ hàng', () => {
  it('Trả về danh sách sản phẩm', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
