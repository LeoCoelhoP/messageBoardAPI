const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

dotenv.config();

mongoose
	.connect(process.env.MONGO_DB_URL, {
		dbName: 'MessageBoard',
	})
	.then(() => console.log('Database Connected'))
	.catch((err) => console.log('Database Not Connected: ', err));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.use('/api/auth', require('./routes/api/authRoutes'));
app.use('/api/messages', require('./routes/api/messages'));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

module.exports = app;
