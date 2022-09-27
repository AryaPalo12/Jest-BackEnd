const userService = require("./user.service");
const { validationResult } = require("express-validator");

const error500 = "Something went wrong. Please try again later";
const emailExist =
  "This email is already being used, Please choose another email";
const updatesuccess = "Update successful";
const registrationsuccessful = "Congratulations! Your account has been created";
const error401 = "Authorization failed";
const errorMessage = { error500, emailExist, error401 };

const succesMessage = {
  updatesuccess,
  registrationsuccessful,
};

const getAllUser = async (req, res) => {
  try {
    const { pageNumber, limitParm } = req.query;
    const dataUser = await userService.getAllUser({ pageNumber, limitParm });
    return res.json(dataUser);
  } catch (error) {
    return res.json(errorMessage);
  }
};

const editPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;
    const authUser = req.auth;
    const authUserId = authUser.id;
    
    if (authUserId == userId) {
      const editPassword = userService.editPassword ({userId,password});
      if(editPassword)return res.status(200).json({ message:updatesuccess});
      else return res.status(401).json({ message: "update fail!" });
    }else {
      return res.status(401).json({ message: errorMessage.error401 });
    }
  } catch (error) {
    return res.status(500).json({ message: errorMessage.error500 });
  }
};

const editUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const { userId } = req.params;
    const authUser = req.auth;
    const authUserId = authUser.id;
    const authUserEmail = authUser.email;

    if (authUserId == userId) {
      const getEditUserService = await userService.editUser({
        fullname,
        email,
        password,
        userId,
        authUserId,
      });
      return res.status(200).json({ message: getEditUserService });
    } else {
      return res.status(401).json({ message: errorMessage.error401 });
    }
  } catch (error) {
    return res.status(500).json({ message: errorMessage.error500 });
  }
};

const createUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const createUserService = await userService.createUser({
      fullname,
      email,
      password,
    });
    if (createUserService)
      return res
        .status(200)
        .json({ message: succesMessage.registrationsuccessful });
    else return res.status(400).json({ message: errorMessage.emailExist });
  } catch (error) {
    return res.status(500).json({ message: errorMessage.error500 });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById({ userId });
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: errorMessage.error500 });
  }
};

const userAddScore = async (req, res) => {
  try {
    const { userId } = req.params;
    await userService.userAddScore(userId);
    res.status(200).json({ userId, message: "Score Added Success" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something gone wrong when adding the score" });
  }
};

const findEmail = async (req, res) => { 
  try {
    const {email} = req.body;

    const checkEmail = await userService.findEmail({email});
    return res.json(checkEmail);
    // if (checkEmail) return res.status(200).json({message : succesMessage.emailExist1 });   
    // else 
    // return res.status(400).json({message : errorMessage.emailExist});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message : errorMessage.error500});
  }
};

const userController = {
  userAddScore,
  createUser,
  getAllUser,
  editUser,
  getUserById,
  editPassword,
  findEmail
};

module.exports = userController;
