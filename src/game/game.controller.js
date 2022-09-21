const e = require("express");
const gameService = require("./game.service");
const error500 = "Something went wrong. Please try again later";

const errorMessage = {
  error500,
};

const createGame = async (req, res) => {
  try {
    const {name, description} =  req.body 
    const  authUser  = req.auth;
    const  authUserId = authUser.id;

    const winner = "-"
    const user1_choice = "-"

    console.log("id auth", authUserId)
    const createGame = await gameService.createGame({
      name, 
      description,
      authUserId,
      winner,
      user1_choice,
    });

    return res.status(200).json(createGame);

  } catch (error) {
    return res.send(error)
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

const getRoom = async (req,res) => {
  try {
    const {roomId} = req.params;
    const room = await gameService.getRoom({roomId})
    return res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ message: errorMessage.error500 });
  }
}

const updatePlayerChoice = async (req,res) => {
  try {
    const {player, userId, userChoice, roomId} = req.body;
    const result = await gameService.updatePlayerChoice({player, userId, userChoice, roomId});
    if(player == "player1"){
      return res.status(200).json({message : "Pilihan Berhasil di Update Silahkan Tunggu Player 2 !"})
    }else{
      result = await gameService.checkWinner({roomId});
      return res.status(200).json({result})

    }
  } catch (error) {
    return res.status(500).json({ message: errorMessage.error500 });
  }
}



const functionGame = {
  createGame,
  gameList,
  getRoom,
  updatePlayerChoice
};

module.exports = functionGame;