const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.SECRET_KEY;
const { emailRegex } = require('../helpers/AuthHelpers');

// registration helper function for user
const Register = async (req, res) => {
  // get data
  const { email } = req.body;
  let { password } = req.body;

  if (email === '' || password === '') {
    return res
      .status(400)
      .send({ message: 'Please fill in an email or a password' });
  }
  // use of email regex to ensure valid email format
  if (!email.match(emailRegex)) {
    return res
      .status(400)
      .send({ message: 'Please insert a valid email format' });
  }
  // password salt for 40 rounds prevents length extension attack
  const salt = await bcrypt.genSalt(20);
  password = await bcrypt.hash(password, salt);

  // model sets unique so try catch is used to catch errors
  try {
    await User.create({
      email,
      password,
    });
    return res.status(201).send({ message: 'created account successfully' });
    // since unique entries hence catching an error in async is sufficient
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ message: 'email already exists' });
    }
    throw error;
  }
};

const verifyUserLogin = async (email, password) => {
  try {
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return { status: 'error', error: 'user not found' };
    }
    if (await bcrypt.compare(password, user.password)) {
      // creating a JWT token
      const token = jwt.sign(
        // eslint-disable-next-line no-underscore-dangle
        { id: user._id, username: user.email, type: 'user' },
        JWT_SECRET,
        { expiresIn: '2h' }
      );
      return { status: 'ok', data: token };
    }
    return { status: 'error', error: 'invalid password' };
  } catch (error) {
    return { status: 'error', error: 'timed out' };
  }
};

// login helper function for user
const Login = async (req, res) => {
  const { email, password } = req.body;

  const response = await verifyUserLogin(email, password);

  if (response.status === 'ok') {
    res.status(200).send({ data: response.data });
  } else {
    res.status(400).send({ message: 'Login unsuccessful' });
  }
};

exports.login = Login;
exports.register = Register;
