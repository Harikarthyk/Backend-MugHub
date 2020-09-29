//Import Dependencies :
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//Import Custom Routes :
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

const app = express();

//Middleware :
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//DB Connection :
mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DB Connection Established'))
	.catch((error) => console.log(error));

//Custom Routes :
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

//Port :
const PORT = process.env.PORT || 5050;

//Server runs in the PORT :
app.listen(PORT, () => console.log(`Server is Running at ${PORT}`));
