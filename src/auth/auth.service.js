const authRepo = require("./auth.repo");

const authUser =  async ({email}) =>{
   return await authRepo.authUser({email})
}

const functionAuthService = {
    authUser
}

module.exports = functionAuthService;