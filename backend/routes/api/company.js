const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Company, Tag, ActingGig } = require('../../db/models');

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

const getTagId = async (tag) => {
  const trimmedLowerCaseTag = tag.trim().toLowerCase();
  const tagExists = await Tag.findAll({where: {name: trimmedLowerCaseTag}});
  if (tagExists.length) {
    return tagExists[0].id;
  } else {
    const newTag = await Tag.create({name:trimmedLowerCaseTag});
    return newTag.id;
  }
};
//TODO check if this /all route needs to be before the other routes. Can we add regex to make it more specific
// GET all companies
router.get('/all', requireAuth, asyncHandler(async (req, res) => {
  // TODO should be ordered by the most when gigs under this company
  // were updated ASC
  const companies = await Company.findAll();
  res.json(companies);
}));

  // Create Company Portfolio
router.post('/', requireAuth, upload.single('companyImage'), validateCompany, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const {companyName, phoneNumber, details, website } = req.body;
    const isImage = req.file && req.file.buffer;
    let image;
    if (isImage) {
      image = await uploadToCloudinary(isImage)
      image = image.url;
    };

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

// Update Company Portfolio
router.put('/', requireAuth, upload.single('companyImage'), validateCompany, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const {companyName, phoneNumber, details, website } = req.body;
    const isImage = req.file && req.file.buffer;
    let image;
    if (isImage) image = await uploadToCloudinary(isImage);
    const companyToUpdate = await Company.findOne({where: {userId: userId}});
    const updatedCompany = await companyToUpdate.update({name: companyName, phoneNumber, details, website})
    if (isImage) updatedCompany = await companyToUpdate.update({ image: image.url });
    return res.json({updatedCompany});
}))

// Delete Company Portfolio
router.delete('/', requireAuth, asyncHandler(async (req, res) => {
  const companyId = req.body.id;
  const userId = req.user.id;
  const companyToDelete = await Company.findByPk(companyId);
  const companyDeleteResult = await companyToDelete.destroy();
  if (companyDeleteResult.length) {
    return res.json({successfullyDeleted: false});
  } else {
    return res.json({successfullyDeleted: true});
  }
}));

// Create company production
router.post('/gig/create', requireAuth, asyncHandler(async (req, res) => {
  const gigData = req.body;


  if (gigData.tags) {
    const tagsArray = gigData.tags.split(',');
    tagsArray.forEach((tag) => {
      tag.trim();
      tag.toLowerCase();
    });
    const results = await Promise.all(
      tagsArray.map(tag => {
        return getTagId(tag)
      }));
    delete gigData.tags;
    gigData.tagIds = results;
  }  else {
    delete gigData.tags;
    gigData.tagIds = [];
  };
  await ActingGig.create(gigData);
  const allGigs = await ActingGig.findAll({where: {userId: gigData.userId}});

  res.json(allGigs);

}))

// Update company production
router.put('/gig/update', requireAuth, asyncHandler(async (req, res) => {
  const gigData = req.body;
  if (gigData.tags) {
    const tagsArray = gigData.tags.split(',');
    tagsArray.forEach((tag) => {
      tag.trim();
      tag.toLowerCase();
    });
    const results = await Promise.all(
      tagsArray.map(tag => {
        return getTagId(tag)
      }));
    delete gigData.tags;
    gigData.tagIds = results;
  }  else {
    delete gigData.tags;
    gigData.tagIds = [];
  };
  const gigToUpdate = await ActingGig.findByPK(gigData.id);
  delete gigData.id;
  await gigToUpdate.update(gigData);
  const allGigs = await ActingGig.findAll({where: {userId: gigData.userId}});

  res.json(allGigs);

}))

module.exports = router;
