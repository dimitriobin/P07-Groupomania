'use strict'
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId,
    region: 'eu-west-3'
});

const s3 = new aws.S3();

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const key = (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const name = file.originalname.split(' ').join('_').slice(0, file.originalname.indexOf('.'));
    callback(null, name + Date.now() + '.' + extension);
}

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Invalud Mime Type, only JPEG or PNG'), false)
    }
}
 
const upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        bucket: 'groupomania',
        acl: 'public-read',
        metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
        },
        key
    })
}).single('image_url');

module.exports = upload;