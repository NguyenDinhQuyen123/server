//MongoDB
//username : akr2803
//pwd      : rajput?283

// IMPORTS FROM PACKAGES
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const debugMiddleware = require('./middlewares/debugMiddleware');

// IMPORTS FROM OTHER FILES
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const uploadRouter = require('./routes/upload');

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true);
			const allowedOrigins = [
				'http://localhost:53492',
				'http://localhost:3000',
			];
			if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'Accept',
			'x-auth-token',
			'credentials',
		],
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(debugMiddleware);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/upload', uploadRouter);

// Root
app.get('/', (req, res) => {
	res.send('Hello World');
});

// CONNECTING DB
mongoose
	.connect(`${process.env.MONGODB_URI}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((conn) => {
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	})
	.catch((error) => {
		console.error(`Error connecting to MongoDB: ${error.message}`);
		console.log(`${process.env.MONGODB_URI}`);
	});

// ✨ Listen server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, '0.0.0.0', () => {
		console.log(`Listening at PORT ${PORT}`);
	});
}

// 👇 Export app for testing
module.exports = app;
