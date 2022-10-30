const bcrypt = require("bcrypt");
const tokenVerification = require("../middleware/token.verification");
const userRepo = require("./user.repo");
const saltRound = 10;

const generator = require('generate-password');
const nodemailer = require('nodemailer');
// const handlebars = require("handlebars");
// const fs = require("fs");
// const path = require("path");

const getAllUser = async ({ pageNumber, limitParm }) => {
  const getAllUserinRepo = await userRepo.getAllUser({ pageNumber, limitParm });
  return getAllUserinRepo;
};

const createUser = async ({ fullname, email, password }) => {
  const hashPassword = await bcrypt.hash(password, saltRound);
  const checkEmailUser = await userRepo.checkEmailAllUser(email);

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

const findEmail = async ({ email }) => { 
  const checkEmailUser = await userRepo.checkEmailAllUser(email);
  // const userId = checkEmailUser.id;
  // const userName = checkEmailUser.fullname;
  if(checkEmailUser){
    const userId = checkEmailUser.id;
    const userName = checkEmailUser.fullname;
    //generate password
    const password = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
    });  
   
    const hashPassword = await bcrypt.hash(password, saltRound); 
    const changedPassword = await userRepo.editPassword({
      userId,
      hashPassword,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testingtitikkoma@gmail.com',
        pass: 'onynfexkygqmqlns'
      }
    });
    
    const mailOptions = {
      from: 'testingtitikkoma@gmail.com',
      to: checkEmailUser.email,
      subject: 'Password Recovery',
      // text: 'That was easy! ' + password,
      html:`
      <p>Hi ${userName},</p>
      <p>Password has been changed successfully</p>     
      <h2>Your new password is :  ${password}</h2>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        info.response;
      }
    });
  } else {
    return null;
  }
  return checkEmailUser.email;  
};

const editPassword = async ({ userId, password }) => {
  const hashPassword = await bcrypt.hash(password, saltRound);
  const changedPassword = await userRepo.editPassword({
    userId,
    hashPassword,
  });
 return changedPassword;
};

const getUserById = async ({ userId }) => {
  return await userRepo.getUserById({ userId });
};

const userAddScore = async (userId) => {
  const userWinner = await userRepo.getUserById({ userId });
  const score = userWinner.score + 1;
  return await userRepo.updateScore({ score, userId });
};

const userService = {
  userAddScore,
  createUser,
  getAllUser,
  editUser,
  getUserById,
  editPassword,
  findEmail
};

module.exports = userService;
