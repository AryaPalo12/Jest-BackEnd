    const { Game } = require("../database/models");
    const { Op, where } = require("sequelize");
    const e = require("express");


    const createGame = async ({name,description,authUserId}) => {
    return await Game.create({
        name : name,
        description : description,
        userId: authUserId,
    });
    };
    const gameList = async () => {
        return await Game.findAll({
            attributes: ['name', 'description']
        })
        };
  
    const functionGameRepo = {
    createGame,
    gameList

    };

    module.exports = functionGameRepo;
