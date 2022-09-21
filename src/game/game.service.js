const gameRepo = require("./game.repo");

const createGame = async ({ name, description, authUserId }) => {
  return await postRepo.createGame({
    name,
    description,
    authUserId,
  });
};

const gameList = async () => {
  return await gameRepo.gameList();
};

const getRoom = async ({ roomId }) => {
  return await gameRepo.getRoom({ roomId });
};

const updatePlayerChoice = async ({ player, userId, userChoice, roomId }) => {
  return await gameRepo.updatePlayerChoice({
    player,
    userId,
    userChoice,
    roomId,
  });
};

const checkWinner = async ({roomId}) => {
  let result = "";
  const room = await gameRepo.getRoom({roomId});
  if(room.user1_choice == room.user2_choice){
    result = "DRAW";
  }else{
    if(room.user1_choice == "P" && room.user2_choice == "R") result = room.userId1;
    if(room.user1_choice == "R" && room.user2_choice == "S") result = room.userId1;
    if(room.user1_choice == "S" && room.user2_choice == "P") result = room.userId1;
    if(room.user1_choice == "P" && room.user2_choice == "S") result = room.userId2;
    if(room.user1_choice == "R" && room.user2_choice == "P") result = room.userId2;
    if(room.user1_choice == "S" && room.user2_choice == "R") result = room.userId2;
  }
  await gameRepo.updateWinner({result,roomId})
  return result;
}

const FunctionGameService = {
  createGame,
  gameList,
  getRoom,
  updatePlayerChoice,
  checkWinner
};

module.exports = FunctionGameService;
