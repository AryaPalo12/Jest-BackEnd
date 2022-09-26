
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

const updatePasswordObject = {
  password: {
    in: ["body"],
    isStrongPassword: true,
    notEmpty: true,
  }, 
};

const loginValidationObject = {
  email: {
    in: ["body"],
    isEmail: true,
  },
  password: {
    in: ["body"],
    isStrongPassword: true,
  },
};

const updateUserValidation = {
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
};


module.exports = {
  registrationValidationObject,
  loginValidationObject,
  updateUserValidation,
  updatePasswordObject
};
