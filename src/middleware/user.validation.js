
const { body } = require("express-validator");
const { param } = require('express-validator');


const registrationValidationObject = {
  fullname: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    
  },
  email: {
    in: ["body"],
    isEmail: true,
    notEmpty: true,
  },
  password: {
    in: ["body"],
    isStrongPassword: true,
    notEmpty: true,
  }, 

};

const updateUserValidation = [

  body("fullname").isString().notEmpty().
  withMessage('Full name cannot be empty'),

  body("email").isEmail().notEmpty().
  withMessage('email cannot be empty'),
  
  body("password").isStrongPassword().notEmpty().
  withMessage('Password cannot be empty'),
  
];

module.exports = {
  registrationValidationObject,
  updateUserValidation
};
