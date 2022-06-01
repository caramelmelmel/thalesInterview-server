const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();

/**
 * Verify Token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object|void} response object
 */

// eslint-disable-next-line consistent-return
const verifyRegistered = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    const message = 'Token not provided';
    return res.status(400).send(message);
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    // auth failed sending message now
    const message = 'Authentication Failed';
    return res.status(400).send(message);
  }
};

exports.verify = verifyRegistered;
