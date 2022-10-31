const { createUser, getAllUser, checkEmailAllUser, editUser, editPassword, checkSameEmail, getUserById, updateScore } = require("../user.repo");

describe("user.repo.js", () => {

    const userTest = {
        fullname: 'Alayka',
        password: 'Testing123@!',
        email: 'testing@gmail.com',
    }
    describe("#createNewUser", () => {
      it("should create a new user!", async () => {
        const result = await createUser(userTest);

        expect(result.fullname).toBe(userTest.fullname);
        expect(result.password).toBe(userTest.password);
        expect(result.email).toBe(userTest.email);
      });
      it("should not create a new user!", async () => {
        try{
          const result = await createUser();
        } catch (e) {
          expect(e.name).toBe('TypeError')
        }
      });
    describe('#getAllUser',()=>{
      it('should return users list', async ()=>{
        const result = await getAllUser({pageNumber : 1, limitParm : 10});
        expect(typeof result).toBe('object');
        expect(result.length).not.toBe(0);
        expect(result).toBeTruthy();
      });
      it('should return user list without limitParm', async ()=> {
        const result = await getAllUser({pageNumber:1});
        expect(typeof result).toBe('object');
        expect(result.length).not.toBe(0);
        expect(result).toBeTruthy();
      })
      it('should return all user without pageNumber', async ()=> {
        const result = await getAllUser({pageNumber: undefined});
        expect(result.length).not.toBe(0);
        expect(result).toBeTruthy();
      });
      it('should show a Type Error when entered without arguents', async ()=> {
        try{
          const result = await getAllUser();
        } catch (e){
          expect(e.name).toBe('TypeError');
        }
      })
    });
    describe('#checkEmailAllUser', () => {
      it('should search that existed', async ()=>{
        const result = await checkEmailAllUser(userTest.email);
        expect(result).toBeTruthy();
      });
      it('should not display email that not existing', async ()=>{
        const result = await checkEmailAllUser('notexisting@gmail.com');
        expect(result).toBeFalsy();
      })
    });
    describe('#editUser', ()=> {
      it('should edit an existing user email and fullname', async () =>{
        const result = await editUser({fullname: 'Amila', email: 'changed@gmail.com', userId: 3});
        expect(result).toStrictEqual([1]);
      });
      it('should not edit an incomplete parameter', async () => {
        try{
          const result = await editUser();
        } catch (e){
          expect(e.name).toBe('TypeError');
        }
      });
    })
    });

    describe('#editPassword', () => {
      it('should edit an existing user password', async () => {
        const result = await editPassword({userId : 1, hashPassword: 'gantIPass@123'});
        expect(result).toStrictEqual([1])
      });
      it('should not edit a non existing user password', async () => {
        const result = await editPassword ({userId : 0, hashPassword: 'gantIPass@123'});
        expect(result).toStrictEqual([0])
      });
    });

    describe('#checkSameEmail', () => {
      it('should get at least a user with the same email', async () => {
        const result = await checkSameEmail({email: 'changed@gmail.com', authUserId: 3});
        expect(result).toBeTruthy();
        expect(result.length).not.toBe(0)
      });
    });

    describe('#getUserById', () => {
      it('should get a user by Id', async ()=> {
        const result = await getUserById ({userId: 1});
        expect(result.length).not.toBe(0);
        expect(result).toBeTruthy();
      });
      it('should not get user by Id 0', async () => {
        try{
          const result = await getUserById({userId: 0});
        } catch (e){
          expect(e.name).toBe('TypeError');
        }
      });
      it('should not get user by undefined id', async () => {
        try{
          const result = await getUserById();
        } catch (e){
          expect(e.name).toBe('TypeError');
        }
      });
    });
    describe('#updateScore', () => {
      it('should update a user score by id', async () => {
        const result = await updateScore ({score: 1, userId : 1});
        expect(result).toBeTruthy();
        expect(result.length).not.toBe(0);
      });
      it('should not update a non existing user score', async () => {
        const result = await updateScore ({score: 999, userId: 0});
        expect(result).toStrictEqual([0, []]);
      })
    });
});