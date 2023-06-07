const config = require('../utils/config.js');
const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

loginRouter.post('/', async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		const tokenExpirationParam = config.TOKEN_EXPIRATION; //expiration of a user session
		if (user === null) {
			return res.status(401).json({ error: 'Credentials are incorrect' });
		}

		const passwordCheck = await bcrypt.compare(
			req.body.password,
			user.passwordHash
		);

		if (!passwordCheck) {
			return res.status(401).json({ error: 'Credentials are incorrect' });
		}

		const tokenPayload = {
			id: user._id,
		};

		const token = jwt.sign(tokenPayload, config.SECRET, {
			expiresIn: tokenExpirationParam,
		});

		return res.status(200).json({
			username: user.username,
			name: user.name,
			id: user.userId,
			token: token,
			expiresIn: tokenExpirationParam,
		});
	} catch (err) {
		console.log('loginRouter', err);
		return res.status(500).json({ error: 'server error' });
	}
});

module.exports = loginRouter;

/*
Error handling: Instead of returning the error message in the catch block, it is better to create a dedicated error handling middleware and pass the error to it.

Constants: It is better to store the constant values like tokenExpirationParam in a separate constants file and import it.

Responses: You could create a helper function for sending responses to return the consistent response format.

Reuse code: Instead of writing the logic for finding a user in every API, you could create a middleware for fetching the user and reuse it.

Testing: You could add unit tests to make sure that the code is working as expected.

const config = require('../utils/config.js');
const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const { sendResponse } = require('../utils/response.js');
const { TOKEN_EXPIRATION_PARAM } = require('../constants/index.js');

loginRouter.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return sendResponse(res, 401, 'Username not found');

    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!passwordCheck) return sendResponse(res, 401, 'Password is incorrect');

    const tokenPayload = {
      id: user._id,
    };

    const token = jwt.sign(tokenPayload, config.SECRET, {
      expiresIn: TOKEN_EXPIRATION_PARAM,
    });

    return sendResponse(res, 200, {
      username: user.username,
      name: user.name,
      token: token,
      activeWeek: user.activeWeek,
      expiresIn: TOKEN_EXPIRATION_PARAM,
    });
  } catch (err) {
    console.error('loginRouter', err);
    return sendResponse(res, 500, { error: err });
  }
});

module.exports = loginRouter;

*/
