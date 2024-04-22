const Messages = require('../models/MessagesModel');

async function createMessage(username, avatarID, content) {
	try {
		const newMessage = new Messages({ username, avatarID, content });
		await newMessage.save();
	} catch (error) {
		console.error(error);
	} finally {
		return newMessage;
	}
}

async function getAllMessages() {
	const messages = await Messages.find().sort({ date: -1 });
	return messages;
}
module.exports = { createMessage, getAllMessages };
