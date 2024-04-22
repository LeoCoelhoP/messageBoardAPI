const express = require('express');
const {
	getAllMessages,
	createMessage,
} = require('../../controllers/MessageController');
const router = express.Router();

router.get('/getAllMessages', async (req, res) => {
	console.log('Messages fetched');
	res.json(await getAllMessages());
});
router.post('/new-message', async (req, res) => {
	const { username, avatarID, content } = req.body;
	res.json(await createMessage(username, avatarID, content));
});

module.exports = router;
