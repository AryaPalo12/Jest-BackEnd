const postRepo = require("./game.repo");

const createGame = async ({name,description,authUserId,winner, user1_choice}) => {
  return await postRepo.createGame({
    name,
    description,
    authUserId,
    winner,
    user1_choice,
  });
};

const gameList = async () => {
  return await postRepo.gameList();
};


const FunctionGameService = {
  createGame,
  gameList
};

module.exports = FunctionGameService;