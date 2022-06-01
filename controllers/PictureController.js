/* eslint-disable func-names */
const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');
const QrCode = require('qrcode-reader');
const Images = require('../models/Images');
const basepath = require('../constants');
const QRGen = require('qrcode');

// handles pictures
const readQRCode = async (buffer) => {
  try {
    const img = await Jimp.read(buffer);
    const qr = new QrCode();
    const value = await new Promise((resolve, reject) => {
      qr.callback = (err, v) => (err != null ? reject(err) : resolve(v));
      qr.decode(img.bitmap);
    });
    if (!value) {
      value.result = null;
    }
    return value.result;
  } catch (error) {
    return error.message;
  }
};

const UploadQR = async (req, res) => {
  const { title } = req.body;
  const { file } = req;
  if (!req.file) {
    return res.status(400).json({ error: 'please provide an image' });
  }

  // determine if it's a legit qr code by reading
  const buffer = fs.readFileSync(file.path);
  // parse image
  const read = await readQRCode(buffer);

  try {
    if (!read) {
      return res.status(500).json({ message: 'QR Codes is invalid' });
      // eslint-disable-next-line no-else-return
    } else {
      await Images.create({
        name: title,
        filename: file.path,
        url: read,
      });

      // success status
      return res.status(201).json({ message: 'QR Codesaved successfully' });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'QR already exists' });
    }
  }
};

// delete qrcode by id
const DeleteQRCodeByID = async (req, res) => {
  console.log(`main path is ${basepath.mainPath}`);
  try {
    const img = await Images.findByIdAndRemove(req.params.id);
    // console.log(img);
    const filePath = path.join(basepath.mainPath, img.filename);
    fs.unlinkSync(filePath);
    if (!img) {
      return res.status(400).json({ message: 'Entry is not found' });
    }
    return res.status(200).json({ message: 'managed to delete from Database' });
  } catch (err) {
    return res.status(400).json({ message: 'Entry is not deleted' });
  }
};

// get qr code by id
const GetQRCodeByID = async (req, res) => {
  try {
    const qr = await Images.findById(req.params.id);
    QRGen.toString(JSON.stringify(qr), { type: 'terminal' }, (err, QRcode) => {
      if (err) return console.log('error occurred');

      // Printing the generated code
      console.log(QRcode);
    });
    return res.status(200).json({ message: 'Entry is found' });
  } catch (err) {
    return res.status(404).json({ message: 'Entry is not found' });
  }
};

// get qrcode by name
const GetQRCodeByName = async (req, res) => {
  try {
    const img = await Images.find({ name: req.body.name });
    if (!img) {
      return res.status(404).json({ message: 'No such name' });
    }
    // read qrcode file from here
    return res.status(200).json({ message: 'Entry is found' });
  } catch (err) {
    return res.status(404).json({ message: 'Entry is not found' });
  }
};

// get qrcode by name
const DeleteQRCodeByName = async (req, res) => {
  try {
    const qrimage = await Images.findOneAndDelete({ name: req.body.name });
    const filePath = path.join(basepath.mainPath, qrimage.filename);
    fs.unlinkSync(filePath);

    // read qrcode file from here
    return res.status(200).json({ message: 'Entry is deleted' });
  } catch (err) {
    return res.status(404).json({ message: 'Entry is not deleted' });
  }
};

exports.uploadQR = UploadQR;

exports.DeleteQR = DeleteQRCodeByID;

exports.GetByName = GetQRCodeByName;

exports.GetQRCodeByID = GetQRCodeByID;
exports.DeleteByName = DeleteQRCodeByName;

exports.readQR = readQRCode;
