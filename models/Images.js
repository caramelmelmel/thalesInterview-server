const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    filename: { type: String, required: true },
    url: { type: String, required: true },
  },
  { collection: 'images' }
);

ImageSchema.statics.deleteById = function (_id) {
  return this.deleteOne({ _id: _id });
};
const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
