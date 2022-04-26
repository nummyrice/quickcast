const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, matchedData } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, ActingGig } = require('../../db/models');

const router = express.Router();

const validateGig = [
    check('userId')
        .exists()
        .withMessage('User ID required')
    ,
    check('companyId')
        .exists()
        .withMessage('Company ID required')
    ,
    check('title')
        .exists()
        .withMessage('Gig title required')
        .isLength({min: 3, max: 50})
        .withMessage('Gig title must be between 3 and 50 characters')
    ,
    check('description')
        .exists()
        .withMessage('Gigs must include description')
    ,
    check('rehearsalProductionDates')
        .exists()
        .withMessage('Gigs must include prouction dates or TBD')
    ,
    check('compensationDetails')
        .exists()
        .withMessage('Gigs must include compensation details.')
    ,
    check('location')
        .exists()
        .withMessage('Gigs must include a primary location.')
    ,
    check('gigType')
        .optional(),
    handleValidationErrors
]
// Get all gigs
router.get('/all', asyncHandler(async (req, res) => {
    const gigs = await ActingGig.findAll();
    return res.json(gigs)
}))

router.post('/', validateGig,  asyncHandler(async (req, res) => {
    const requiredData = matchedData(req, { includeOptionals: false });
    const {userId, companyId, title, description, rehearsalProductionDates, compensationDetails, location, gigType} = requiredData;
    const newGig = await ActingGig.create({companyId, userId, title, description, rehearsalProductionDates, compensationDetails, location, gigType})
    return res.json(newGig)
}))

module.exports = router;
