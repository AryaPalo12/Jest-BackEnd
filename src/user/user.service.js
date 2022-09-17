const bcrypt = require("bcrypt");
const tokenVerification = require("../middleware/token.verification");
const userRepo = require("./user.repo");
const saltRound = 10;

const getAllUser = async () => {
   const getAllUserinRepo = await userRepo.getAllUser();
   return getAllUserinRepo;
}

const createUser = async ({ fullname, email, password }) => {
  const hashPassword = await bcrypt.hash(password, saltRound);
  console.log(hashPassword);
  const checkEmailUser = await userRepo.checkEmailAllUser(email);
  console.log(checkEmailUser);

  if(!checkEmailUser){
  const getUserRepo = await userRepo.createUser({ fullname, email, password: hashPassword });
  console.log(getUserRepo);
  return getUserRepo;
  }
  else return null;
};

const editUser = async({  fullname, email, password, userId, authUserId}) =>{

  const hashedPassword = await bcrypt.hash(password, saltRound)

  //CEK EMAIL YANG INGIN DIUPDATE ADA ATAU ENGGA DALAM TABEL USERS
  const checkEmailAllUser = await userRepo.checkEmailAllUser(email);

  //Jika hanya ingin update Fullnamenya/passwordnya aja
  const checkSameEmail = await userRepo.checkSameEmail({email, authUserId});

  if(!checkEmailAllUser || checkSameEmail){
      const getUserRepo = await userRepo.editUser({
      fullname, 
      email,
      password : hashedPassword, 
      userId
    })
    return getUserRepo;
  }
  else return null;
}
const userService = {
  createUser,
  getAllUser,
  editUser 
};

module.exports = userService;
