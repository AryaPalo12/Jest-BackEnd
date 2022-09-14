    const { Game } = require("../database/models");
    const { Op, where } = require("sequelize");
    const e = require("express");


    const createGame = async ({name}) => {
    return await Game.create({
        name
    });
    };
    const gameList = async () => {
        return await Game.findAll()
        };
  
    const functionGameRepo = {
    createGame,
    gameList

    };

    module.exports = functionGameRepo;
