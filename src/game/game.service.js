const postRepo = require("./game.repo");

const createGame = async ({name,description,authUserId}) => {
  return await postRepo.createGame({
    name,
    description,
    authUserId
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