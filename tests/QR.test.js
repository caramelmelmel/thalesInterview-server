// test if legit qr code or not
const fs = require('fs');
const QRController = require('../controllers/PictureController');

const QRcode = QRController.readQR;
// eslint-disable-next-line import/order
const path = require('path');

// set timeout as file takes longer
test('Pass in an invalid QR Code', () => {
  const filePath = path.join(__dirname, '../images/elsaa.png');
  const buffer = fs.readFileSync(filePath);
  return QRcode(buffer).then((data) => {
    expect(data).toBe(undefined);
  });
}, 1009009900);

test('Pass in a valid QR Code', () => {
  const filePath = path.join(__dirname, '../images/help.png');
  const buffer = fs.readFileSync(filePath);
  return QRcode(buffer).then((data) => {
    expect(data).toBe('https://www.facebook.com/');
  });
}, 1009009900);

test('Pass in an invalid QR Code that looks like a QR code', () => {
  const filePath = path.join(__dirname, '../images/hello.png');
  const buffer = fs.readFileSync(filePath);
  return QRcode(buffer).then((data) => {
    expect(data).toBe(undefined);
  });
}, 1009009900);
