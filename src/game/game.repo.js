const { Game } = require("../database/models");
const { Op, where } = require("sequelize");
const e = require("express");

const createGame = async ({ name, description, authUserId }) => {
  const created = await Game.create({
    // name : name,
    // description : description,
    name,
    description,
    userId1: authUserId,
    winner: null,
    user1_choice: null,
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

const functionGameRepo = {
  createGame,
  gameList,
};

module.exports = functionGameRepo;
