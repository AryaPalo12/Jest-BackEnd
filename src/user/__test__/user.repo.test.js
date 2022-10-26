const { createUser } = require("../user.repo");

describe("App.js", () => {

    const userTest = {
        fullname: 'Alayka',
        password: 'Testing123@!',
        email: 'testing@gmail.com'
    }
    describe("#createNewUser", () => {
      it("should create a new user!", async () => {
        const result = await createUser(userTest);
  
        expect(result.id).toBe(1);
        expect(result.fullname).toBe(userTest.fullname);
        expect(result.password).toBe(userTest.password);
        expect(result.email).toBe(userTest.email);
      });
    });
});