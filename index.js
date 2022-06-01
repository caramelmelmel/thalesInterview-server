// db connection
require('./config/db.config').connection;

// requirements
const express = require('express');
const cors = require('cors');

const Auth = require('./controllers/AuthController');
const QRRoute = require('./Routes/QRRoute');
const tokenVerification = require('./middleware/verification');
const QRController = require('./controllers/PictureController');

const app = express();

// env variables
require('dotenv').config();

const port = 8000;

// allowed origins of access for react application
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// parse requests that contains content-type - application/json and application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// public routes
app.get('/', (req, res) => {
  res.status(200).send('Welcome to getSearching');
});

app.post('/register', Auth.register);

app.post('/login', Auth.login);
app.get('/display/:id', QRController.GetQRCodeByID);
app.get('/display', QRController.GetByName);

// qr code related routes
// authenticated route
app.use('/qrcode', tokenVerification.verify, QRRoute.Router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
