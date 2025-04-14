const request = require('supertest');
const app = require('../index'); // Đường dẫn đến file Express chính
const mongoose = require('mongoose');

// Kết nối MongoDB từ biến môi trường
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Ngắt kết nối sau khi test xong
afterAll(async () => {
  await mongoose.connection.close();
});

// Ví dụ test API
describe('🛒 API Giỏ hàng', () => {
  it('Test đơn giản trả về danh sách sản phẩm', async () => {
    const res = await request(app).get('/api/products'); // API này bạn đang có sẵn
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // Trả về mảng sản phẩm
  });
});
