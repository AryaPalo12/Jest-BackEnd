const postRepo = require("./game.repo");

const createGame = async ({name}) => {
  return await postRepo.createGame({
    name
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