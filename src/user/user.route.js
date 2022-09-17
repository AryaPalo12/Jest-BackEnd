const express = require("express");
const { checkSchema } = require("express-validator");
const tokenVerification = require("../middleware/token.verification");
const { registrationValidationObject, getOneUserValidation } = require("../middleware/user.validation")
const { validate } = require("../middleware/validation");
const userRouter = express.Router();

const userController = require("./user.controller");

// API GET ALL USER

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *      - users
 *    summary: API Get All User (PUBLIC)
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                fullname:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *                createdAt:
 *                  type: string
 */
  

//---------------------------------------------------------------------#

// userRouter.get("/users", userController.getAllUser)



module.exports = userRouter;
