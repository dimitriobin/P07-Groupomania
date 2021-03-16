'use strict'
// const multer = require('multer');

// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
// };

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, 'images');
//     },
//     filename: (req, file, callback) => {
//         const extension = MIME_TYPES[file.mimetype];
//         const name = file.originalname.split(' ').join('_').slice(0, file.originalname.indexOf('.'));
//         callback(null, name + Date.now() + '.' + extension);
//     }
// });

// module.exports = multer({
//     storage: storage
// }).single('image_url');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId,
    region: 'eu-west-3'
});

const s3 = new aws.S3();
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'groupomania',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;