const { Game } = require("../database/models");
const { Op, where } = require("sequelize");
const e = require("express");

let pageFormula = 5 + 1 - 1; 
let limitValue = 5;

const createGame = async ({ name, description }) => {
  return await Game.create({
    // name : name,
    // description : description,
    name,
    description,
    winner: null,
    user1_choice: null,
    user2_choice: null,
    userId1: null,
    userId2: null,
  });
};

//tes
const gameList = async (pageNumber) => {
  return await Game.findAll({
    order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ["id", "DESC"],
    ],
    offset: (pageNumber - 1) * pageFormula,
    limit: limitValue,
    attributes: ["id", "name", "description", "winner"],
  
  });
};

const getRoom = async ({ roomId }) => {
  return await Game.findOne({
    where: {
      id: roomId,
    },
  });
};

const updatePlayerChoice = async ({ player, userId, userChoice, roomId }) => {
  if (player == "player1") {
    return await Game.update(
      { userId1: userId, user1_choice: userChoice },
      {
        where: {
          id: roomId,
        },
        returning: true,
      }
    );
  } else {
    return await Game.update(
      { userId2: userId, user2_choice: userChoice },
      {
        where: {
          id: roomId,
        },
        returning: true,
      }
    );
  }
};

const updateWinner = async ({ result, roomId }) => {
  return await Game.update(
    { winner: result },
    {
      where: {
        id: roomId,
      },
      returning: true,
    }
  );
};

const functionGameRepo = {
  createGame,
  gameList,
  getRoom,
  updatePlayerChoice,
  updateWinner,
};

module.exports = functionGameRepo;
