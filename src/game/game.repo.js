    const { Game } = require("../database/models");
    const { Op, where } = require("sequelize");
    const e = require("express");


    const createGame = async ({name,description,authUserId,winner,user1_choice}) => {
    return await Game.create({
        name : name,
        description : description,
        userId1: authUserId,
        winner : winner,
        user1_choice : user1_choice,
        user2_choice: null,
        userId2 : null
    });
    };
    //tes
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
