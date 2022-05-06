const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, matchedData } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, ActingGig, GigRole, Company, Application } = require('../../db/models');

const router = express.Router();

const validateApplicant = [
    check('applicantId')
        .exists()
        .withMessage('Applicant ID required')
        .bail()
        .custom(async value => {
            const userExists = await User.findByPk(value);
            if (!userExists) return Promise.reject('ApplicantId does not exist.')

            return true;
          }),
    check('companyId')
        .exists()
        .withMessage('Company ID required')
        .bail()
        .custom(async value => {
            const companyExists = await Company.findByPk(value)
            if (!companyExists) return Promise.reject('company does not exist')
        })
    ,
    check('roleId')
        .exists()
        .withMessage('role ID required')
        .custom(async value => {
            const roleExists = await GigRole.findByPk(value)
            if (!roleExists) return Promise.reject('role does not exist')
        })
        ,
    handleValidationErrors
]

const validateUpdate = [
    check('id')
        .exists()
        .withMessage('Application ID required')
        .bail()
        .custom(async value => {
            const appExists = await Application.findByPk(value);
            if (!appExists) return Promise.reject('Application does not exist.')
            return true;
          }),
    check('status')
        .exists()
        .withMessage('status required')
    ,
    handleValidationErrors
]

// GET all for user
router.get('/:applicantId', asyncHandler(async (req, res) => {
    const applicantId = req.params.applicantId
    const applications = await Application.findAll({where: {applicantId: applicantId}})
    return res.json(applications)
}))

router.post('/',validateApplicant, asyncHandler(async (req, res) => {
    const requiredData = matchedData(req, { includeOptionals: false });
    const userAlreadyApplied = await Application.findOne({where: {applicantId: requiredData.applicantId, roleId: requiredData.roleId}})
    if (userAlreadyApplied) return next(new Error('user already applied'))
    const newApplication = await Application.create(requiredData)
    return res.json(newApplication)
}))

router.put('/',validateUpdate, asyncHandler(async (req, res) => {
    const requiredData = matchedData(req, { includeOptionals: false });
    const appToUpdate = await Application.findByPk(requiredData.id)
    appToUpdate.status = requiredData.status
    appToUpdate.save()
    return res.json(appToUpdate)
}))

module.exports = router
