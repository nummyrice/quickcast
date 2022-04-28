'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Company, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true,
    });
    User.hasMany(models.ActingGig, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true,
    })
    User.hasMany(models.PortfolioGallery, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true
    })
    User.hasOne(models.ActorPortfolio, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true
    })
  };
  //IN PROGRESS: must add other associations here as they are built
  // returns object with only the User instance information that is safe to save to a JWT
  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email, Company, ActingGigs } = this; // context will be the User instance
    return { id, username, email, Company, ActingGigs};
  };

  // checks if recieved password matches the User instance hashed password
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  // uses current user scope to return a User with the provided id
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  // accepts object with password and credential attributes; searches for user with specified credential
  // if user is found, validates password and returns the user by using currentUser scope
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findOne({where: {id: user.id}, include: {all: true}});
    }
  };

  // hashes password, creates user in db and then returns that created user with currentUser scope
  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.prototype.updateDetails = async function (username, email, password) {

    if (username) this.username  = username;
    if (email) this.email = email;
    if (password) {
      const hashedPassword = bcrypt.hashSync(password);
      this.password = hashedPassword
    }
    await this.save();
    return this.toSafeObject()
  }

  return User;
};
