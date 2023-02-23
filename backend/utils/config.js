require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
const TOKEN_EXPIRATION = eval(process.env.TOKEN_EXPIRATION);

module.exports = { PORT, MONGODB_URI, TOKEN_EXPIRATION, SECRET };
