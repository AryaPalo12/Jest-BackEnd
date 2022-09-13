
const { User } = require("../database/models");

const authUser =  async ({email}) =>{
return await User.findOne({ where: { email }});
}

const functionAuthRepo = {
    authUser
}
module.exports = functionAuthRepo
