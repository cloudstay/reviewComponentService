const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const config = require('./config');

aws.config.update({
    accessKeyId: config.accessKeyId,

    secretAccessKey: config.secretAccessKey,

    region: 'us-west-1'
})

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'customer-images-fec',
        metadata: function(req, file, cb) {
            cb(null, {fieldName: file.fieldname})
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

