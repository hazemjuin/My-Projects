const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Define the storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Set the destination folder as 'images'
  },
  filename: (req, file, cb) => {
    // const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname) ); // Generate a unique filename for each uploaded file
  },
});

// Create a multer instance with the configured storage
const upload = multer({ storage : storage });

module.exports = upload;
