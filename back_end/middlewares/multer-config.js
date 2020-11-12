'use strict'
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const extension = MIME_TYPES[file.mimetype];
        const name = file.originalname.split(' ').join('_').slice(0, file.originalname.indexOf('.'));
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({
    storage: storage
}).single('image_url');
