const bcrypt = require("bcrypt");
const tokenVerification = require("../middleware/token.verification");
const userRepo = require("./user.repo");
const saltRound = 10;

const getAllUser = async ({ pageNumber, limitParm }) => {
  const getAllUserinRepo = await userRepo.getAllUser({ pageNumber, limitParm });
  return getAllUserinRepo;
};

const createUser = async ({ fullname, email, password }) => {
  const hashPassword = await bcrypt.hash(password, saltRound);
  console.log(hashPassword);
  const checkEmailUser = await userRepo.checkEmailAllUser(email);
  console.log(checkEmailUser);

  if (!checkEmailUser) {
    const getUserRepo = await userRepo.createUser({
      fullname,
      email,
      password: hashPassword,
    });
    console.log(getUserRepo);
    return getUserRepo;
  } else return null;
};

const editUser = async ({ fullname, email, userId, authUserId }) => {
  //CEK EMAIL YANG INGIN DIUPDATE ADA ATAU ENGGA DALAM TABEL USERS
  const checkEmailAllUser = await userRepo.checkEmailAllUser(email);

  //Jika hanya ingin update Fullnamenya/passwordnya aja
  const checkSameEmail = await userRepo.checkSameEmail({ email, authUserId });

  if (!checkEmailAllUser || checkSameEmail) {
    const getUserRepo = await userRepo.editUser({
      fullname,
      email,
      userId,
    });
    return "Update successful";
  } else return "This email is already being used, Please choose another email";
};

const editPassword = async ({ userId, password }) => {
  const hashPassword = await bcrypt.hash(password, saltRound);
  const changedPassword = await editPassword.editPassword({
    userId,
    hashPassword,
  });
  if (changedPassword) {
    return "Update Successful";
  } else {
    return "Update Failed!";
  }
};

const getUserById = async ({ userId }) => {
  return await userRepo.getUserById({ userId });
};

const userAddScore = async (userId) => {
  const userWinner = await userRepo.getUserById({ userId });
  const score = userWinner.score + 1;
  await userRepo.updateScore({ score, userId });
};

const userService = {
  userAddScore,
  createUser,
  getAllUser,
  editUser,
  getUserById,
  editPassword,
};

module.exports = userService;
