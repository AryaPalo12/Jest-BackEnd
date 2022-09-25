const userService = require("./user.service");
const { validationResult } = require("express-validator");

const error500 = "Something went wrong. Please try again later";
const emailExist = "This email is already being used, Please choose another email"
const updatesuccess = "Update successful"
const registrationsuccessful = "Congratulations! Your account has been created"
const error401 = "Authorization failed" 
const errorMessage = { error500, emailExist, error401 };

const succesMessage = {
  updatesuccess, registrationsuccessful
};

const getAllUser = async (req,res) => {
  try {
    const {pageNumber,limitParm} = req.query
    const dataUser = await userService.getAllUser({pageNumber,limitParm});
    return res.json(dataUser);
  } catch (error) {
    return res.json(errorMessage);
  }
  
  
}

const editUser = async (req, res) => {
  try {
    const {fullname, email, password } = req.body;
    const { userId } = req.params;
    const  authUser  = req.auth;
    const  authUserId = authUser.id;
    const  authUserEmail = authUser.email;

    const getEditUserService = await userService.editUser({
      fullname,
      email,
      password,
      userId,
      authUserId
    })
    if (getEditUserService && authUserId==userId)
    {
      return res.status(200).json({ message : succesMessage.updatesuccess});
    }
    else if(authUserId!=userId){

      return res.status(401 ).json({ message :errorMessage.error401});
    }
    else 
    return res.status(400).json( {message : errorMessage.emailExist});

  } catch (error) {
    return res.status(500).json({ message: errorMessage.error500});
   }
}

const createUser = async (req, res) => { 
  try {
    const { fullname, email, password } = req.body;
    const createUserService = await userService.createUser({fullname,email,password });
    if (createUserService) return res.status(200).json({message : succesMessage.registrationsuccessful });   
    else 
    return res.status(400).json({message : errorMessage.emailExist});
  } catch (error) {
    return res.status(500).json({ message : errorMessage.error500});
  }
};

const getUserById = async (req,res) => {
  try {
    const {userId} = req.params;
    const user = await userService.getUserById({userId});
    res.status(200).json(user);
  } catch (error) {
    
  }
}

const userAddScore = async (req,res) => {
  try{
    const {userId} = req.params;
    await userService.userAddScore (userId)
    res.status(200).json({userId, message: 'Score Added Success'});
  }
  catch(error){
    res.status(500).json({message: 'Something gone wrong when adding the score'})
  }
}

const userController = {
  userAddScore,
  createUser,
  getAllUser,
  editUser,
  getUserById
};

module.exports = userController;
