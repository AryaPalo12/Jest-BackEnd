const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authService = require("./auth.service");

const authUser = async (req, res) => {
    const { email, password } = req.body;

    const existUser = await authService.authUser({email})
  
    //   kalau gak ada email yang terdaftar response not found
    if (!existUser) return res.status(404).json({ message: "User not found" });
  
    //   kalau ada cek password
    const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
  
    if (isPasswordCorrect) {
      // generate jwt token
      const token = await jwt.sign(
        {
          id: existUser.id,
          fullname: existUser.fullname,
          email: existUser.email,
          loginStatus: 1
        },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: "7d" }
      );
  
      return res.status(200).json({ accessToken: token, id: existUser.id, loginStatus : 1});
    } else {
      return res.status(400).json({message:"Login failed"});
    }
  };
  
  const functionAuthController = {
    authUser
  }
  module.exports = functionAuthController;