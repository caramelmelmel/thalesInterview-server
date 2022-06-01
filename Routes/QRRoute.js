const express = require('express');

const app = express();
const router = express.Router();

// controller
const multer = require('multer');
const QRController = require('../controllers/PictureController');

// multer

// const upload = multer({ dest: imagePath });
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './images/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // limit image file types
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage,
  fileFilter,
});

// authenticated routes
router.post('/upload', upload.single('img'), QRController.uploadQR);
router.delete('/delete/:id', QRController.DeleteQR);
router.delete('/delete/', QRController.DeleteByName);

exports.Router = router;
