const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const { environment, awsConfig } = require('../config');

const s3 = new aws.S3({
    accessKeyId:awsConfig.secretKeyId,
    secretAccessKey:awsConfig.secretAccessKey
   })
  // exports.upload = multer({storage})

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
  };

  const uploadS3 = multer({
      fileFilter,
    storage: multerS3({
      s3: s3,
      bucket: 'quickcast-app',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  })

  module.exports = { uploadS3, s3 }
