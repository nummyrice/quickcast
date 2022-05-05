const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, matchedData } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, ActingGig, Tag, ActingGigTag } = require('../../db/models');

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
        .optional({checkFalsy: true}),
    check('tags')
        .optional({checkFalsy: true}),
    handleValidationErrors
]

const validateUpdate = [
    check('id')
        .exists()
        .withMessage('Gig ID requried.'),
     check('userId')
        .exists()
        .withMessage('User ID required')
    ,
    check('companyId')
        .optional({checkFalsy: true})
    ,
    check('title')
        .isLength({min: 3, max: 50})
        .withMessage('Gig title must be between 3 and 50 characters')
        .optional({checkFalsy: true})
    ,
    check('description')
        .optional({checkFalsy: true})
    ,
    check('rehearsalProductionDates')
        .optional({checkFalsy: true})
    ,
    check('compensationDetails')
        .optional({checkFalsy: true})
    ,
    check('location')
        .optional({checkFalsy: true})
    ,
    check('gigType')
        .isIn(['Commercials', 'Theatre', 'Performing Arts', 'TV & Video', 'Voiceover', 'Stunts', 'Other'])
        .withMessage('Not a valid category.')
        .optional({checkFalsy: true}),
    check('tags')
        .optional({checkFalsy: true}),
    handleValidationErrors
]

//TODO: must paginate GET routes
// Get all gigs
router.get('/all', asyncHandler(async (req, res) => {
    const gigs = await ActingGig.findAll();
    return res.json(gigs)
}))

// Get Company gigs
router.get('/by_company', asyncHandler(async(req, res) => {
    const companyId = req.body.companyId
    const companyGigs = await ActingGig.findAll({where: {companyId: companyId}})
    return res.json(companyGigs)
}))

// Get User Gigs
router.post('/by_user',  asyncHandler(async(req, res) => {
    const userId = req.body.userId
    const usersGigs = await ActingGig.findAll({where: {userId: userId}})
    console.log("NEW GIG: ", usersGigs)
    return res.json(usersGigs)
}))

// Create New Gig
router.post('/', validateGig,  asyncHandler(async (req, res) => {
    const requiredData = matchedData(req, { includeOptionals: false });
    const {userId, companyId, title, description, rehearsalProductionDates, compensationDetails, location, gigType, tags} = requiredData;
    const newGig = await ActingGig.create({companyId, userId, title, description, rehearsalProductionDates, compensationDetails, location, gigType})
    if (tags.length) {
        await Promise.all(tags.map(async (string) => {
            const sanitizedString = string.trim().toLowerCase()
            const [tag, created] = await Tag.findOrCreate({where: {name: sanitizedString}})
            return await newGig.addTag(tag)
        }))
    }
    return res.json(newGig)
}))

// Update Gig
router.put('/', validateUpdate,  asyncHandler(async (req, res) => {
    const requiredData = matchedData(req, { includeOptionals: false });
    const {id, userId, companyId, title, description, rehearsalProductionDates, compensationDetails, location, gigType, tags} = requiredData;
    const gigToUpdate = await ActingGig.findByPk(id);
    const updatedGig = await gigToUpdate.updateDetails(userId, companyId, title, description, rehearsalProductionDates, compensationDetails, location, gigType, tags);

    res.json(updatedGig);
}))

// Delete Gig
router.delete('/', asyncHandler(async (req, res, next) => {
    const gigId = req.body.gigId;
    const gigToDelete = await ActingGig.scope('withTags').findByPk(gigId);
    if (!gigToDelete) return next(new Error('Gig does not exist'))
    await Promise.all(gigToDelete.tags.map(async tag => {
        const actingGigTagToDelete = await ActingGigTag.findOne({where: {actingGigId: gigToDelete.id, tagId: tag.id}})
        return await actingGigTagToDelete.destroy()
    }))
    await gigToDelete.destroy();
    return res.json({'message': "successfully deleted"})
  }));

module.exports = router;
