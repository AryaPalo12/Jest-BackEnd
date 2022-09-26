const express = require("express");
const { checkSchema } = require("express-validator");
const tokenVerification = require("../middleware/token.verification");
const { registrationValidationObject, getOneUserValidation, updateUserValidation,updatePasswordObject } = require("../middleware/user.validation")
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
 *    parameters:
 *      - in: query
 *        name: limitParm
 *        required: false
 *        schema:
 *          type: integer
 *        description : how many data that show in one page, fill pageNumber if you want use this filter
 *      - in: query
 *        name: pageNumber
 *        required: false
 *        schema:
 *          type: integer
 *        description : which page we wanna see
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

userRouter.get("/users", userController.getAllUser)

// API USER REGISTRATION
/**
 * @swagger
 * /user/registration:
 *  post:
 *    tags:
 *      - users
 *    summary: API User Registration (PUBLIC & VALIDATION)
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fullname:
 *                type: string
 *                example: Greiq Imapuly
 *              email:
 *                type: string
 *                example: greiq@gmail.com
 *              password:
 *                type: string
 *                example: 123456&Qz
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
 *     
 */
  

//---------------------------------------------------------------------#

userRouter.post("/user/registration", checkSchema(registrationValidationObject),
validate, userController.createUser);

// API EDIT USER 

/**
 * @swagger
 * /user/{userId}:
 *  put:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - users
 *    summary: API Edit User (PRIVATE & VALIDATION)
 *    parameters:
 *      - in: path
 *        name: userId
 *        value : 1
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fullname:
 *                type: string
 *                example: Nama lengkap
 *              email:
 *                type: string
 *                example: contoh@gmail.com
 *    responses:
 *      '200':
 *        description: Update successful
 */


userRouter.put("/user/:userId",tokenVerification, checkSchema(updateUserValidation),
validate, userController.editUser)

//---------------------------------------------------------------------#

//API Edit Password 

/**
 * @swagger
 * /user/changePassword/{userId}:
 *  put:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - users
 *    summary: API Edit Password (PRIVATE & VALIDATION)
 *    parameters:
 *      - in: path
 *        name: userId
 *        value : 1
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *                example: Password@123!
 *    responses:
 *      '200':
 *        description: Update successful
 */
userRouter.put("/user/changePassword/:userId",tokenVerification, checkSchema(updatePasswordObject),
validate, userController.editPassword)

//GET SPICIFIC USER

/**
 * @swagger
 * /user/{userId}:
 *  get:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - users
 *    summary: API get Specific User (PRIVATE & VALIDATION)
 *    parameters:
 *      - in: path
 *        name: userId
 *        value : 1
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                fullname:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                score:
 *                  type: integer
 *                createdAt:
 *                  type: string
 *                updatedAt:
 *                  type: string
 */
userRouter.get("/user/:userId",tokenVerification,userController.getUserById);

//Add 1 score point
/**
 * @swagger
 * /user/addScore/{userId}:
 *  get:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - users
 *    summary: API add Score / Points (PRIVATE & VALIDATION)
 *    parameters:
 *      - in: path
 *        name: userId
 *        value : 1
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                fullname:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                score:
 *                  type: integer
 *                createdAt:
 *                  type: string
 *                updatedAt:
 *                  type: string
 */
userRouter.post("/user/addScore/:userId",tokenVerification,userController.userAddScore);

module.exports = userRouter;
