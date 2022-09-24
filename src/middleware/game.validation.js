const { query, body } = require("express-validator");
const { param } = require("express-validator");

const createGameValidation = [
  //added because from test case it will pass if the user did not enter anything
  body("name").notEmpty(),
  body("description").notEmpty(),
];

module.exports = {
  createGameValidation,
};
