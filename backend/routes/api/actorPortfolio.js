const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, matchedData } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, ActingGig, Tag, ActorPortfolio} = require('../../db/models');
const { uploadS3, s3 } = require('../../utils/aws.js')
const singleUpload = uploadS3.single("image")

const router = express.Router();

const validatePortfolio = [
    check('userId')
        .exists()
        .withMessage('User ID required.')
        .bail()
        .custom(async value => {
            const userExists = await User.findByPk(value);
            if (!userExists) return Promise.reject('User does not exist.')
            return true;
        }).custom(async value => {
            const portfolioExists = await ActorPortfolio.findOne({where: {userId: value}})
            if (portfolioExists) return Promise.reject('Portfolio already exists')
            return true;
        }),
    check('firstName')
        .exists()
        .withMessage('First name required.'),
    check('lastName')
        .exists()
        .withMessage('Last name required.'),
    check('phoneNumber')
        .isLength({ min: 10, max: 12})
        .withMessage('Phone number must be a valid length.')
        .exists({checkFalsey: true})
        .isMobilePhone("any"),
    check('dateOfBirth')
        .exists()
        .withMessage('Date of birth required.')
        .isDate()
        .withMessage('Incorrrect date format.'),
    check('biography')
        .exists()
        .withMessage('Biography required.'),
    check('profilePhoto')
        .optional({checkFalsy:true})
        .isURL()
        .withMessage('Please provide a valid URL.'),
    check('website')
        .optional({checkFalsy:true})
        .isURL()
        .withMessage('Please provide a valid URL.'),
    check('location')
        .optional({checkFalsey:true}),
    handleValidationErrors
]

const validateUpdate = [
    check('id')
        .exists()
        .withMessage('Portfolio ID required.')
        .bail()
        .custom(async value => {
            const portfolioExists = await ActorPortfolio.findByPk(value);
            if (!portfolioExists) return Promise.reject('Portfolio does not exist.')
            return true;
        }),
    check('userId')
        .optional({checkFalse:true})
        .exists()
        .withMessage('User ID required.')
        .bail()
        .custom(async value => {
            const userExists = await User.findByPk(value);
            if (!userExists) return Promise.reject('User does not exist.')
            return true;
        }),
    check('firstName')
        .optional({checkFalse:true}),
    check('lastName')
         .optional({checkFalsy:true}),
    check('phoneNumber')
        .optional({checkFalsey: true})
        .isLength({ min: 10, max: 12})
        .withMessage('Phone number must be a valid length.')
        .isMobilePhone("any"),
    check('dateOfBirth')
        .optional({checkFalsey: true})
        .isDate()
        .withMessage('Incorrrect date format.'),
    check('biography')
        .optional({checkFalsey: true}),
    check('profilePhoto')
        .optional({checkFalsey: true})
        .isURL()
        .withMessage('Please provide a valid URL.'),
    check('website')
        .optional({checkFalsey: true})
        .isURL()
        .withMessage('Please provide a valid URL.'),
    check('location')
        .optional({checkFalsey: true}),
    handleValidationErrors
]
// Get all portfolios
router.post('/all', asyncHandler(async (req, res) => {
    const offset = req.body.offset
    const portfolios = await ActorPortfolio.findAndCountAll({
        // where: {...},
        // order: [...],
        limit: 5,
        offset: offset,
    })
    // console.log(portfolios.rows, 'PORTFOLIOS__________')
    return res.json(portfolios.rows)
}))

// Create Portfolio
router.post('/', singleUpload, validatePortfolio, asyncHandler(async (req, res) => {
    const requiredData = matchedData(req, { includeOptionals: false});
    const {userId, firstName, lastName, phoneNumber, dateOfBirth, biography, profilePhoto, website, location} = requiredData;
    // let uploadedUrl;
    // singleUpload(req, res, function (err) {
    //     if (err) {
    //       return next(new Error('Unable to succesffully upload image.'))
    //       }
    //     uploadedUrl = { profilePicture: req.file.location };
    // })
    const uploadedUrl = { profilePhoto: undefined};
    if (req.file && req.file.location) uploadedUrl.profilePhoto = req.file.location
    const portfolio = await ActorPortfolio.create({
        userId,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        biography,
        profilePhoto: uploadedUrl.profilePhoto ? uploadedUrl.profilePhoto : profilePhoto,
        website,
        location
    })
    return res.json(portfolio);
}))

// Update Portfolio
router.put('/', singleUpload, validateUpdate, asyncHandler(async (req, res) => {
    const uploadedUrl = { profilePicture: undefined};
    if (req.file && req.file.location) uploadedUrl.profilePicture = req.file.location
    const requiredData = matchedData(req, { includeOptionals: false});
    const portfolioToUpdate = await ActorPortfolio.findByPk(requiredData.id)
    if (portfolioToUpdate.profilePhoto) {
        const prevPortfolioUrl = portfolioToUpdate.profilePhoto.split('/')
        const prevPortfolioKey = prevPortfolioUrl[prevPortfolioUrl.length - 1]
        s3.deleteObject({Bucket:'quickcast-app', Key: prevPortfolioKey}, function(err, data) {
            if (err) console.log(err, err.stack);
            else console.log("successfully deleted")
        })
    }
    const updatedPortfolio = await portfolioToUpdate.updateDetails(requiredData, uploadedUrl)
    return res.json(updatedPortfolio)
}))


// Delete Portfolio
router.delete('/', asyncHandler(async (req, res) => {
    const portfolioId = req.body.portfolioId;
    const portfolioToDelete = await ActorPortfolio.findByPk(portfolioId)
    if (!portfolioToDelete) return next(new Error('Portfolio does not exist.'))
    if (portfolioToDelete.profilePhoto) {
        const prevPortfolioUrl = portfolioToDelete.profilePhoto.split('/')
        const prevPortfolioKey = prevPortfolioUrl[prevPortfolioUrl.length - 1]
        s3.deleteObject({Bucket:'quickcast-app', Key: prevPortfolioKey}, function(err, data) {
            if (err) console.log(err, err.stack);
            else console.log("successfully deleted from s3 bucket")
        })
    }
    await portfolioToDelete.destroy()
    return res.json({message: 'Successfully deleted'})
}))


router.post("/:id/add-profile-picture", function (req, res) {
    const uid = req.params.id;

    singleUpload(req, res, function (err) {
      if (err) {
        return res.json({
          success: false,
          errors: {
            title: "Image Upload Error",
            detail: err.message,
            error: err,
          },
        });
      }

      let update = { profilePicture: req.file.location };

      User.findByIdAndUpdate(uid, update, { new: true })
        .then((user) => res.status(200).json({ success: true, user: user }))
        .catch((err) => res.status(400).json({ success: false, error: err }));
    });
  });

module.exports = router;
