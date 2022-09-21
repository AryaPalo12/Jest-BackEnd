const e = require("express");
const gameService = require("./game.service");
const error500 = "Something went wrong. Please try again later";

const errorMessage = {
  error500,
};

const createGame = async (req, res) => {
  try {
    const { name, description } = req.body;
    //remove uneeded code , remove variable initiation with = '-' value == better to use null in repo creation
    //const  authUser  = req.auth;
    const authUserId = req.auth.id;
    const createGame = await gameService.createGame({
      name,
      description,
      authUserId,
    });
    return res.status(200).json(createGame);
  } catch (error) {
    return res.send(error);
  }
};

const gameList = async (req, res) => {
  try {
    const gameList = await gameService.gameList();

    return res.status(200).json(gameList);
  } catch (error) {
    return res.status(500).json({ message: errorMessage.error500 });
  }
};

const functionGame = {
  createGame,
  gameList,
};

module.exports = functionGame;
