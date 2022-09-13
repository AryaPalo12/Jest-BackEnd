const { body } = require("express-validator");

const loginValidation = [
  body("email").isEmail().
  withMessage('Please insert a valid email address').
  notEmpty().withMessage('Email cannot be empty'),
  
  body("password").isString().notEmpty().
  withMessage('Password cannot be empty'),
];

module.exports = {
  loginValidation,
};
