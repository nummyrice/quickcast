const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Company, Tag, ActingGig, User, PortfolioGallery } = require('../../db/models');

const { check, matchedData } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// setup for cloudinary image storage
const multer = require('multer');
const upload = multer();
const { uploadToCloudinary } = require('../../utils/cloudinary');

const router = express.Router();

const validateGallery = [
    check('userId')
        .exists()
        .withMessage('User ID required.')
        .bail()
        .custom(async value => {
            const userExists = await User.findByPk(value);
            if (!userExists) return Promise.reject('User does not exists.')
            return true;
          }),
    check('title')
          .optional({checkFalsey: true}),
    check('photoUrl')
        .exists()
        .withMessage('Url or upload required.'),
    check('order')
          .optional({checkFalsey: true})
    ,
    handleValidationErrors
]

const validateUpdate = [
    check('id')
    .exists()
    .withMessage('Gallery ID required.')
    .bail()
    .custom(async value => {
        const galleryExists = await PortfolioGallery.findByPk(value);
        if (!galleryExists) return Promise.reject('Gallery does not exists.')
        return true;
      }),
    check('title')
        .optional({checkFalsey: true}),
    check('photoUrl')
        .optional({checkFalsey: true}),
    check('order')
        .optional({checkFalsey: true})
,
handleValidationErrors
]

// Get galleries by user
router.get('/', asyncHandler(async (req, res, next) => {
    const userId = req.body.userId;
    const userExists = await User.findByPk(userId)
    console.log("User EXISTS: ", userExists)
    if (!userExists) return next(new Error('User does not exist.'))
    const userGallery = await PortfolioGallery.findAll({where: {userId: userId}})
    return res.json(userGallery)
}))

// create new gallery
router.post('/', validateGallery, asyncHandler(async(req, res) => {
    const requiredData = matchedData(req, { includeOptionals: false });
    const {userId, title, photoUrl , order } = requiredData
    const portfolioGallery = await PortfolioGallery.create({
        userId,
        title,
        photoUrl,
        order
    })
    return res.json(portfolioGallery)
}))

// update gallery
router.put('/', validateUpdate, asyncHandler(async (req, res) => {
    const requiredData = matchedData(req, { includeOptionals: false });
    const galleryToUpdate = await PortfolioGallery.findByPk(requiredData.id)
    const updatedGallery = await galleryToUpdate.updateDetails(requiredData)
    return res.json(updatedGallery)
}))

// delete gallery
router.delete('/', asyncHandler(async (req, res, next) => {
    const photoId = req.body.photoId;
    const photoToDelete = await PortfolioGallery.findByPk(photoId)
    if (!photoToDelete) return next(new Error("Photo does not exist."))
    await photoToDelete.destroy()
    return res.json({message: "Successfully deleted photo"})
}))

module.exports = router;
