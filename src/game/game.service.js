const postRepo = require("./game.repo");

const createGame = async ({title}) => {
  return await postRepo.createGame({
    title
  });
};


const FunctionGameService = {
  createGame,
};

module.exports = FunctionGameService;