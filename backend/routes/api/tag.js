const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, matchedData } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, ActingGig, Tag } = require('../../db/models');

const router = express.Router();
const validateTag = [
    check('name')
        .exists()
        .withMessage('Name required')
        .isString()
        .withMessage('Invalid data type')
        ,
        handleValidationErrors
]
// Get tags (paginated)
router.get('/all', asyncHandler(async(req, res) => {
    const offset = req.body.offset
    const tags = await Tag.findAndCountAll({
        // where: {...},
        // order: [...],
        limit: 10,
        offset: offset,
    })
    return res.json(tags)
}))
// create tag
router.post('/', validateTag, asyncHandler(async (req, res) => {
    const requiredData = matchedData(req, { includeOptionals: false});
    const sanitizedString = requiredData.name.trim().toLowerCase()
    const [tag, created] = await Tag.findOrCreate({where: {name: sanitizedString}})
    return res.json(tag);
}))

// delete tag
router.delete('/', asyncHandler(async (req, res, next) => {
    const tagId = req.body.tagId;
    const tagToDelete = await Tag.findByPk(tagId);
    if (!tagToDelete) return next(new Error('Tag does not exist'))
    await tagToDelete.destroy();
    return res.json({'message': "successfully deleted"})
  }));

module.exports = router;
