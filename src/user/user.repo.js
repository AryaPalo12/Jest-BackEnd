const { User } = require("../database/models");

  const getAllUser = async () => {
    return await User.findAll();
  };

  const createUser = async ({ fullname, email, password }) => {
    return await User.create({
      fullname,
      email,
      password,
    });
  };

  const checkEmailAllUser = async (email) => {
    return await User.findOne({
      where: { email: email },
    });
  };

  const editUser = async ({ fullname, email, password, userId }) => {
    return await User.update(
      {
        fullname,
        email,
        password,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  };

  const checkSameEmail = async ({email, authUserId}) => {
    return await User.findOne({
      where:{
        email : email,
        id : authUserId

      }
    }
    )
  }

  const getUserById = async ({userId}) => {
    return await User.findOne ({
      where:{
        id : userId
      }
    })
  }

  const updateScore = async ({score,userId}) => {
    return await User.update(
      {score : score},
      {
        where: {
          id: userId,
        },
        returning: true,
      }
    )
    }

  const userRepo = {
    createUser,
    getAllUser,
    editUser,
    checkEmailAllUser,
    checkSameEmail,
    getUserById,
    updateScore
  };

  module.exports = userRepo;
