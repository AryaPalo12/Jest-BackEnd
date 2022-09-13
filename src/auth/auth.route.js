require("dotenv").config();
const express = require("express");
const authRouter = express.Router();
const { loginValidation } = require("../middleware/auth.validation");
const { validate } = require("../middleware/validation");
const authController = require("./auth.controller");
/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags: 
 *      - authorization
 *    summary: API login (PUBLIC & VALIDATION)
 *    description: Api ini digunakan untuk login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: greiq@gmail.com
 *              password:
 *                type: string
 *                example: 123456&Qz
 *    responses:
 *      '200':
 *        description: login successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                  example: aiuwhrp2h3p48uy24184auewfpa8y34pr8ujrp8u2394p812ejuapwf823r89q23y[293u4[23u4ihr9283y4q02783ywfjaidhjfoaw]]
 *      '400':
 *        description: Login failed
 */
authRouter.post("/auth/login", loginValidation, validate, authController.authUser)
module.exports = authRouter;
