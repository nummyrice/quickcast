const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Company } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// setup for cloudinary image storage
require('dotenv');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer();

const router = express.Router();

const validateCompany = [
    check('companyName')
      .exists({checkFalsey: true})
      .withMessage('Please provide a company name.'),
    check('phoneNumber')
      .exists({checkFalsey: true})
      // .isNumeric()
      // .isLength({min: 0, max: 40})
      .withMessage('Please provide a valid phone number.'),
    check('details')
      .exists({checkFalsey: true}),
      handleValidationErrors,
];

  // Create Company Portfolio
router.post('/', requireAuth, validateCompany, upload.single('companyImage'), asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const {companyName, phoneNumber, details, website } = req.body;
    let image;

    // creates stream with cloudinary
    cloudinary.uploader.upload_stream({resource_type: 'image'}, (error, response) => {
      console.log('CLOUDINARY ERROR LOG: ', error);
      image = response.url
    }).end(req.file.buffer);

    console.log('/////////////////////', req.body);
    const company = await Company.create({
      userId,
      name: companyName,
      phoneNumber,
      details,
      image,
      website,
    });
    return res.json({company});
}));

   module.exports = router;
