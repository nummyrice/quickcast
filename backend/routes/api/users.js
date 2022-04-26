const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check, matchedData } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

const validateUpdate = [
  check('userId')
    .exists()
    .withMessage('User ID required.')
    .bail()
    .custom(async (value) => {
      const userExists = await User.findByPk(value)
      if (!userExists) Promise.reject('User does not exist')
    }),
  check('username')
    .optional()
    .custom(async (value, {req}) => {
      const userId = req.body.userId
      const usernameExists = await User.findOne({where: {username: value}})
      if (usernameExists && usernameExists.id !== userId) {
        return Promise.reject('Username is already in use.');
      }
      return true;
    }),
    check('email')
      .optional()
      .isEmail()
      .withMessage('Please provide a valid email.')
      .custom(async (value, {req}) => {
        const userId = req.body.userId
        const emailExists = await User.findOne({where: {email: value}})
        if (emailExists && emailExists.id !== userId) {
          return Promise.reject('Email is already in use');
        }
        return true;
      }),
      check('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
        handleValidationErrors
];

// Sign up
router.post('/', validateSignup, asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });

  await setTokenCookie(res, user);

  return res.json({
    user,
  });
}),
);

// Update User
router.put('/', validateUpdate, asyncHandler(async (req, res) => {
  const requiredData = matchedData(req, { includeOptionals: false });
  const {email, password, userId, username} = requiredData;
  const user = await User.findByPk(userId)
  const updatedUser = await user.updateDetails(username, email, password)
  return res.json(updatedUser)
}))

// Delete User
router.delete('/', asyncHandler(async (req, res, next) => {
  const { userId } = req.body
  const user = await User.findByPk(userId)
  if (user) {
    await user.destroy()
    return res.json({message: "successfully destroyed"})
  }
  const err = new Error('user does not exist')
  err.status = 404
  next(err)
}))


module.exports = router;
