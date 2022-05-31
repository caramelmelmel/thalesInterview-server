require('./config/db.config').connection;

// requirements
const express = require('express');
const cors = require('cors');

const Auth = require('./controllers/AuthController');
const QRRoute = require('./Routes/QRRoute');

const app = express();

// env variables
require('dotenv').config();

const port = 8000;

// allowed origins of access
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json and application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Welcome to getSearching');
});

app.post('/register', Auth.register);

app.post('/login', Auth.login);

// qr code related routes
app.use('/qrcode', QRRoute.Router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
