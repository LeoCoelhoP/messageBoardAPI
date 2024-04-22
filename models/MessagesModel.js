const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
	username: { type: String, required: true },
	avatarID: { type: String, required: true, default: '1' },
	content: { type: String, required: true },
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Messages', messagesSchema);
