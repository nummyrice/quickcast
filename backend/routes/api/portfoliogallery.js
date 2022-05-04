const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Company, Tag, ActingGig, User, PortfolioGallery } = require('../../db/models');

const { check, matchedData } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// setup for cloudinary image storage
const multer = require('multer');
const { uploadS3, s3 } = require('../../utils/aws.js')
const singleUpload = uploadS3.single("image")
// const { uploadToCloudinary } = require('../../utils/cloudinary');

const router = express.Router();

const validateGallery = [
    check('userId')
        .exists({checkFalsey: true})
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
        .optional({checkFalsy:true}),
        // .withMessage('Url or upload required.'),
    check('order')
          .optional({checkFalsey: true})
    ,
    handleValidationErrors
]

const validateUpdate = [
    check('id')
    .exists({checkFalsey: true})
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
router.post('/by_user', asyncHandler(async (req, res, next) => {
    const userId = req.body.userId;
    const userExists = await User.findByPk(userId)
    console.log("User EXISTS: ", userExists)
    if (!userExists) return next(new Error('User does not exist.'))
    const userGallery = await PortfolioGallery.findAll({where: {userId: userId}, order: [['order', 'ASC']]})
    console.log("user gallery", userGallery)
    return res.json(userGallery)
}))

// create new gallery
router.post('/', singleUpload, validateGallery, asyncHandler(async(req, res) => {
    const requiredData = matchedData(req, { includeOptionals: false });
    const {userId, title, photoUrl , order } = requiredData
    const uploadedUrl = { galleryPhoto: undefined};
    if (req.file && req.file.location) uploadedUrl.galleryPhoto = req.file.location
    const portfolioGallery = await PortfolioGallery.create({
        userId,
        title,
        photoUrl: uploadedUrl.galleryPhoto ? uploadedUrl.galleryPhoto : photoUrl,
        order
    })
    const userGallery = await PortfolioGallery.findAll({where: {userId: userId}, order: [['order', 'ASC']]})
    console.log("USER GALLERY: ", userGallery)
    return res.json(userGallery)
}))

// update gallery
router.put('/', validateUpdate, asyncHandler(async (req, res) => {
    const requiredData = matchedData(req, { includeOptionals: false });
    const galleryToUpdate = await PortfolioGallery.findByPk(requiredData.id)
    const userId = galleryToUpdate.userId
    const updatedGallery = await galleryToUpdate.updateDetails(requiredData)
    const userGallery = await PortfolioGallery.findAll({where: {userId: userId}, order: [['order', 'ASC']]})
    return res.json(userGallery)
}))

// delete gallery
router.delete('/', asyncHandler(async (req, res, next) => {
    const photoId = req.body.photoId;
    const photoToDelete = await PortfolioGallery.findByPk(photoId)
    const userId = photoToDelete.userId;
    if (!photoToDelete) return next(new Error("Photo does not exist."))
    if (photoToDelete.photoUrl) {
        const prevPhotoUrl = photoToDelete.photoUrl.split('/')
        const prevPhotoKey = prevPhotoUrl[prevPhotoUrl.length - 1]
        s3.deleteObject({Bucket:'quickcast-app', Key: prevPhotoKey}, function(err, data) {
            if (err) console.log(err, err.stack);
            else console.log("successfully deleted from s3 bucket")
        })
    }
    await photoToDelete.destroy()
    const userGallery = await PortfolioGallery.findAll({where: {userId: userId}, order: [['order', 'ASC']]})
    return res.json(userGallery)
}))

module.exports = router;
