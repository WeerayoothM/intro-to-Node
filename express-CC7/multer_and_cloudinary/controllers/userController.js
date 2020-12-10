const cloudinary = require('cloudinary').v2;

exports.createUser = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'success' });
  } catch (err) { }
};

