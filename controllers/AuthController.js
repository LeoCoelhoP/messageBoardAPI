const jwt = require('jsonwebtoken');

const Users = require('../models/UsersModel');
const { hashPassword, comparePassword } = require('../helpers/auth');

async function signupUser(req, res) {
	try {
		const { username, password, avatarID } = req.body;

		if (!username) return res.json({ error: 'Username is required.' });
		if (!password) return res.json({ error: 'Password is required.' });

		console.log(password.length <= 5);
		if (password.length < 5) {
			return res.json({
				error: 'Password is required and should be at lest 6 characters long.',
			});
		}

		const usernameExist = await Users.findOne({ username });

		if (usernameExist)
			return res.json({ error: 'Sorry, this username is already taken...' });

		const hashedPassword = await hashPassword(password);
		console.log(avatarID);
		const newUser = new Users({ username, password: hashedPassword, avatarID });
		await newUser.save();

		return res.json(newUser);
	} catch (err) {
		console.log(err);
	}
}

async function loginUser(req, res) {
	try {
		const { username, password } = req.body;
		const user = await Users.findOne({ username });
		console.log(user);
		if (!user) res.json({ error: 'Username does not exist.' });

		const isPasswordValid = await comparePassword(password, user.password);

		if (isPasswordValid) {
			jwt.sign(
				{ username, id: user._id, avatarID: user.avatarID },
				process.env.JWT_SECRET,
				{ expiresIn: '5s' },
				(err, token) => {
					if (err) throw err;

					res
						.cookie('token', token, { sameSite: true, httpOnly: true })
						.json(user);
					res.json('password match');
				},
			);
		} else res.json({ error: 'Password do not match.' });
	} catch (err) {
		console.log(err);
	}
}

function getProfile(req, res) {
	const { token } = req.cookies;
	if (!token) res.cookie('token', null, { sameSite: true, httpOnly: true });
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, { maxAge: 5 }, (err, user) => {
			if (err) res.cookie('token', null, { sameSite: true, httpOnly: true });
			res.json(user);
		});
	} else res.json(null);
}
module.exports = { loginUser, signupUser, getProfile };
