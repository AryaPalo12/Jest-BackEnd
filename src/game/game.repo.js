const { Game } = require("../database/models");
const { Op, where } = require("sequelize");
const e = require("express");

const createGame = async ({
  name,
  description,
  authUserId,
  winner,
  user1_choice,
}) => {
  return await Game.create({
    name: name,
    description: description,
    userId1: authUserId,
    winner: winner,
    user1_choice: user1_choice,
    user2_choice: null,
    userId2: null,
  });
};
//tes
const gameList = async () => {
  return await Game.findAll({
    attributes: ["name", "description"],
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
  }else{
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

const updateWinner = async ({result,roomId}) => {
  return await Game.update(
    {winner: result},{
      where:{
        id: roomId,
      },
      returning: true
    }
  )
}

const functionGameRepo = {
  createGame,
  gameList,
  getRoom,
  updatePlayerChoice,
  updateWinner
};

module.exports = functionGameRepo;
