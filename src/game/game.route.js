const express = require('express');
const gameRouter = express.Router();
const tokenVerification = require('../middleware/token.verification');
const gameController = require("./game.controller");
const { createGameValidation } = require("../middleware/game.validation")
const { validate } = require("../middleware/validation");

gameRouter.use(express.json());

// API CREATE GAME

gameRouter.post("/games", tokenVerification, createGameValidation, validate, (gameController.createGame))

/**
 * @swagger
 * /games:
 *  post:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - games
 *    summary: API Create Game (PRIVATE & VALIDATION)
 *    description: API untuk Create Game
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Rock Paper Scissors
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                title:
 *                  type: string
 *                image:
 *                  type: string
 *                body:
 *                  type: string
 *                userId:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *                createdAt:
 *                  type: string
 *     
 */



// -------------------------------------------------------------#


module.exports = gameRouter;