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
            const gigExists = await ActingGig.findByPk(value);
            if (!gigExists) return Promise.reject('Gig does not exist.')
            return true;
          })
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
        .exists({checkFalsy:true})
        .withMessage('Role ID required.')
        .bail()
        .custom(async value => {
            const roleExists = await GigRole.findByPk(value);
            if (!roleExists) return Promise.reject('Role does not exists.')
            return true;
        })
        ,
    check('gigId')
        .custom(async value => {
            const gigExists = await ActingGig.findByPk(value);
            if (!gigExists) return Promise.reject('Gig does not exist.')
            return true;
        })
        .optional({checkFalsy:true})
    ,
    check('title')
        .optional({checkFalsy:true})
    ,
    check('gender')
        .optional({checkFalsy:true})
    ,
    check('ageRange')
        .optional({checkFalsy:true})
    ,
    check('description')
        .optional({checkFalsy:true})
    ,
    handleValidationErrors
]
// Get role
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id
    const role = await GigRole.scope('includeApplicantIds').findByPk(id)
    if (!role) return next(new Error('Role does not exist'))
    return res.json(role)
}))


// Get all roles
router.post('/all', asyncHandler(async (req, res) => {
    const offset = req.body.offset
    const roles = await GigRole.findAndCountAll({
        // where: {...},
        // order: [...],
        limit: 5,
        offset: offset,
    })
    return res.json(roles)
}))

router.post('/by_user', asyncHandler(async (req, res) => {
    const userId = req.body.userId
    const gigRoles = await ActingGig.scope('userGigRoles').findAll({where:{userId: userId}})
    return res.json(gigRoles)
}))
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
