const express = require('express');
const gameRouter = express.Router();
const tokenVerification = require('../middleware/token.verification');
const gameController = require("./game.controller");
const { createGameValidation } = require("../middleware/game.validation")
const { validate } = require("../middleware/validation");
const { generateHTML } = require('swagger-ui-express');

gameRouter.use(express.json());

// API CREATE GAME

gameRouter.post("/game/createGame", tokenVerification, createGameValidation, validate, (gameController.createGame))



/**
 * @swagger
 * /game/createGame:
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
 *              description:
 *                type: string
 *                example: testing
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

// API GAME LIST

gameRouter.get("/game/list", (gameController.gameList))



/**
 * @swagger
 * /game/list:
 *  get:
 *    tags:
 *      - games
 *    summary: API Game list (PUBLIC)
 *    parameters:
 *      - in: query
 *        name: pageNumber
 *        required: false
 *    description: API Game List
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 */
  




// -------------------------------------------------------------#

//UPDATE PILIHAN Player Dan CheckWinner
//changed
//gameRouter.put("/game/play",gameController.updatePlayerChoice)
/**
 * @swagger
 * /game/play/{roomId}:
 *  put:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - games
 *    summary: API to update Player Choice and Check Room winner
 *    description: API to update Player Choice and Check Room winner
 *    parameters:
 *      - in: path
 *        name: roomId
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              player:
 *                type: string
 *                example: Player1
 *              userId:
 *                type: int
 *                example: 1
 *              userChoice:
 *                type: string
 *                example: P
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: string
 */  
gameRouter.put("/game/play/:roomId",tokenVerification,gameController.updatePlayerChoice)

//GET ROOM
/**
 * @swagger
 * /game/{roomId}:
 *  get:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - games
 *    summary: API to get detail room with room id
 *    description: API to get detail room with room id
 *    parameters:
 *      - in: path
 *        name: roomId
 *        required: true
 *    requestBody:
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                winner:
 *                  type: string
 *                user1_choice:
 *                  type: string
 *                user2_choice:
 *                  type: string
 *                userId1:
 *                  type: integer
 *                userId2:
 *                  type: integer
 *                updatedAt:
 *                  type: string
 *                createdAt:
 *                  type: string
 */  
gameRouter.get("/game/:roomId",tokenVerification,gameController.getRoom);



module.exports = gameRouter;