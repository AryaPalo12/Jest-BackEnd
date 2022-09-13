    const { Game } = require("../database/models");
    const { Op, where } = require("sequelize");
    const e = require("express");


    const createGame = async ({title}) => {
    return await Game.create({
        title
    });
    };
  
    const functionGameRepo = {
    createGame,

    };

    module.exports = functionGameRepo;
