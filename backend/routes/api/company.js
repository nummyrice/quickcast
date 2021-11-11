const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Company } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// setup for cloudinary image storage
const multer = require('multer');
const upload = multer();
const { uploadToCloudinary } = require('../../utils/cloudinary');

const router = express.Router();

// validateCompany must be used AFTER multer and requireAuth
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
router.post('/', requireAuth, upload.single('companyImage'), validateCompany, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    // const companyCheck = await Company.findAll({where: {userId: userId}});

    //IN PROGRESS: change redirect when company page is made
    // if (companyCheck.length) {
    //   console.log('CREATE COMPANY HANDLER', 'redirecting')
    //   return res.redirect('/');
    // }

    const {companyName, phoneNumber, details, website } = req.body;
    const image = await uploadToCloudinary(req.file.buffer);

    const company = await Company.create({
      userId,
      name: companyName,
      phoneNumber,
      details,
      image: image.url,
      website,
    });
    return res.json({company});
}));

   module.exports = router;
