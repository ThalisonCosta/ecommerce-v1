const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, './src/assets/');
  },
  filename: function (_req, _file, cb) {
    cb(null, `${crypto.randomUUID()}.jpeg`);
  },

});

function filterFile(_req, file, callback) {
  const ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
    return callback(new Error('Only images are allowed'));
  }
  callback(null, true);
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1
  },
  fileFilter: filterFile
});

module.exports = upload;
