require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors({
	origin: true,
	credentials: true,
}));

// imports
const cookieParser = require('cookie-parser');
const expressFormidable = require('express-formidable-v2');
const ConnectDb = require('./db/connectDb');

const ErrorHandlerMiddleware = require('./middlewares/errorHandler');
const authRouter = require('./routes/authroutes');
const userRouter = require('./routes/userRoutes');
const drugRouter = require('./routes/drugsRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const ordersRouter = require('./routes/orderRoutes');
const trackRouter = require('./routes/trackRoute');

// middlewares


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_PARSER));
app.use(
	expressFormidable({
		multiples: true,
	})
);


//  routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/drug', drugRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/order', ordersRouter);
app.use('/api/v1/track', trackRouter);

// add notfound and errorhandler middlewares
app.use(ErrorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await ConnectDb(process.env.MONGO_URI);
		console.log('Connected to the database');
		await app.listen(port);
		console.log(`Server started on port ${port}...`);
	} catch (error) {
		console.log(error);
	}
};
start();
