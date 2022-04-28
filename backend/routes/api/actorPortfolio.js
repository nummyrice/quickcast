const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, matchedData } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, ActingGig, Tag, ActorPortfolio} = require('../../db/models');

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
        .optional()
        .isURL()
        .withMessage('Please provide a valid URL.'),
    check('website')
        .optional()
        .isURL()
        .withMessage('Please provide a valid URL.'),
    check('location')
        .optional(),
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
router.get('/all', asyncHandler(async (req, res) => {
    const offset = req.body.offset
    const portfolios = await ActorPortfolio.findAndCountAll({
        // where: {...},
        // order: [...],
        limit: 5,
        offset: offset,
    })
    return res.json(portfolios)
}))

// Create Portfolio
router.post('/', validatePortfolio, asyncHandler(async (req, res) => {
    const requiredData = matchedData(req, { includeOptionals: false});
    const {userId, firstName, lastName, phoneNumber, dateOfBirth, biography, profilePhoto, website, location} = requiredData;
    const portfolio = await ActorPortfolio.create({
        userId,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        biography,
        profilePhoto,
        website,
        location
    })
    return res.json(portfolio);
}))

// Update Portfolio
router.put('/', validateUpdate, asyncHandler(async (req, res) => {
    const requiredData = matchedData(req, { includeOptionals: false});
    const portfolioToUpdate = await ActorPortfolio.findByPk(requiredData.id)
    const updatedPortfolio = await portfolioToUpdate.updateDetails(requiredData)
    return res.json(updatedPortfolio)
}))

// Delete Portfolio
router.delete('/', asyncHandler(async (req, res) => {
    const portfolioId = req.body.portfolioId;
    const portfolioToDelete = await ActorPortfolio.findByPk(portfolioId)
    if (!portfolioToDelete) return next(new Error('Portfolio does not exist.'))
    await portfolioToDelete.destroy()
    return res.json({message: 'Successfully deleted'})
}))

module.exports = router;
