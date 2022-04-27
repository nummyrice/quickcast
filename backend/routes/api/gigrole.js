const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Company, Tag, ActingGig, User, GigRole } = require('../../db/models');

const { check, matchedData } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateRole = [
    check('gigId')
        .exists()
        .withMessage('Gig ID required.')
        .bail()
        .custom(async value => {
            return await ActingGig.findByPk(value);
          }).withMessage('Gig does not exists.')
    ,
    check('title')
        .exists()
        .withMessage('Title required.')
    ,
    check('gender')
        .exists()
        .withMessage('Gender required.')
    ,
    check('ageRange')
        .exists()
        .withMessage('Age range required.')
    ,
    check('description')
        .exists()
        .withMessage('Description required.')
    ,
    handleValidationErrors
]

const validateUpdate = [
    check('id')
        .exists()
        .withMessage('Role ID required.')
        .bail()
        .custom(async value => {
            return await GigRole.findByPk(value);
        }).withMessage('Role does not exists.')
        ,
    check('gigId')
        .custom(async value => {
            return await ActingGig.findByPk(value);
        }).withMessage('Gig does not exists.')
        .optional()
    ,
    check('title')
        .optional()
    ,
    check('gender')
        .optional()
    ,
    check('ageRange')
        .optional()
    ,
    check('description')
        .optional()
    ,
    handleValidationErrors
]

  // Create  Role
// TODO: add requireAuth to middleware
router.post('/', validateRole, asyncHandler(async (req, res) => {
    const requiredData = matchedData(req, { includeOptionals: false });
    const {gigId, title, gender, ageRange, description } = requiredData
    const role = await GigRole.create({
      gigId,
      title,
      gender,
      ageRange,
      description
    });
    return res.json(role);
  }));

  // Update Role
  router.put('/', validateUpdate,  asyncHandler(async (req, res) => {
    const requiredData = matchedData(req, { includeOptionals: false });
    const {id, gigId, title, description, gender, ageRange} = requiredData;
    const roleToUpdate = await GigRole.findByPk(id);
    const updatedRole = await roleToUpdate.updateDetails(gigId, title, description, gender, ageRange);

    res.json(updatedRole);
}));

// Delete Role
router.delete('/', asyncHandler(async (req, res, next) => {
    const roleId = req.body.roleId;
    const roleToDelete = await GigRole.findByPk(roleId);
    if (!roleToDelete) return next(new Error('Role does not exist'))
    await roleToDelete.destroy();
    return res.json({'message': "successfully deleted"})
  }));

  module.exports = router;
