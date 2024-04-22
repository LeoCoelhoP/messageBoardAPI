const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	avatarID: { type: String, default: '001' },
});

module.exports = mongoose.model('Users', usersSchema);
