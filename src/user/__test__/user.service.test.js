const { createUser, getAllUser, editUser, findEmail, editPassword, getUserById, userAddScore } = require("../user.service");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const userRepo = require("../user.repo");
// const nodemailer = require('nodemailer');

// jest.mock('nodemailer');

const testData = {
    fullname : faker.name.fullName(),
    email : faker.internet.email(),
    password: faker.internet.password()
};

bcrypt.hash = jest.fn(() => "test");
// nodemailer.createTransport = jest.fn(()=> 'done transport');

describe('user.service.js', () => {
    describe('#getAllUser', () => {
        it('should return a list of all user', async () => {
            //when
            const result = await getAllUser({pageNumber: 1, limitParm: 5});
            //result
            expect(typeof result).toBe('object');
            expect(result).not.toBeNull();
        });
        it('should show error if no args were given', async () => {
            try{
                const reult = await getAllUser();
            }catch(e){
                expect(e.name).toBe('TypeError');
            }
        });
    });
    describe('#createUser', ()=> {
        it('should create a new user', async () => {
            //given
            userRepo.checkEmailAllUser = jest.fn(()=> null);
            //when
            const result = await createUser(testData);
            //result
            expect(bcrypt.hash).toBeCalledWith(testData.password, 10);
            expect(result.fullname).toBe(testData.fullname);
            expect(result.email).toBe(testData.email);
        });
        it('should return null because created with registered email', async () => {
            //given
            userRepo.checkEmailAllUser = jest.fn(()=> {
                return {fullname: 'registered'}
            });
            //when
            const result = await createUser(testData);
            //result
            expect(bcrypt.hash).toBeCalledWith(testData.password, 10);
            expect(userRepo.checkEmailAllUser).toBeCalledWith(testData.email);
            expect(result).toBeNull();
        });
    });
    describe('#editUser', () => {
        //given
        const testEditUser = {
            fullname: faker.name.fullname,
            userId : 3,
            authUserId : 3
        }
        it('should edit the user', async () => {
            //given
            userRepo.checkEmailAllUser = jest.fn(()=> null);
            userRepo.checkSameEmail = jest.fn(()=>null);
            //when
            const result = await editUser({fullname : testEditUser.fullname, email: testData.email, userId: testEditUser.userId, authUserId: testEditUser.authUserId}); 
            expect(userRepo.checkEmailAllUser).toBeCalledWith(testData.email);
            expect(userRepo.checkSameEmail).toBeCalledWith({email: testData.email, authUserId: testEditUser.authUserId});
            expect(result).toBe("Update successful");
        })
        it('should not edit the user', async () => {
            //given
            userRepo.checkEmailAllUser = jest.fn(()=> {
                return {
                    fullname: 'registered'
                }
            });
            userRepo.checkSameEmail = jest.fn(()=>null);
            //when
            const result = await editUser({ fullname : testEditUser.fullname, email: testData.email, userId: testEditUser.userId, authUserId: testEditUser.authUserId});
            expect(userRepo.checkEmailAllUser).toBeCalledWith(testData.email);
            expect(userRepo.checkSameEmail).toBeCalledWith({email: testData.email, authUserId: testEditUser.authUserId});
            expect(result).toBe('This email is already being used, Please choose another email')
        });
    });
    // describe('#findEmail', () => {
    //     it('should get the user email', async () => {
    //         //given
    //         userRepo.checkEmailAllUser = jest.fn(()=> {
    //             return {
    //                 fullname: 'registered',
    //                 email: 'fake1@mail.com'
    //             }
    //         });
    //         userRepo.editPassword = jest.fn(() => {
    //             return 
    //         } );
    //         //when
    //         const result = await findEmail ({email: testData.email});
    //         expect(result).toBe({});
    //     });
    // });
    describe('#editPassword', () => {
        it('should edit the user by userId and new Password', async () => {
            //given
            const testEditUser = {
                userId : 3,
                password : '112233'
            }
            //when
            const result = await editPassword(testEditUser);
            //result
            expect(bcrypt.hash).toBeCalledWith(testEditUser.password,10);
            expect(result[0]).toStrictEqual(1);
        });
    });
    describe('#getUserById', () => {
        it('should get the user by the ID', async () => {
            //given
            const testEditUser = {
                userId : 1
            }
            //when
            const result = await getUserById(testEditUser);
            //result
            expect(result.fullname).toBe('FirstUser');
            expect(result.email).toBe('example@example.com');
            expect(result).not.toBeNull();
        });
    });
    describe('#userAddScore', () => {
        it('should update the user score', async () => {
            //given
            userRepo.getUserById = jest.fn(()=> {
                return{ 
                    score:2
                }
            });
            //when
            const result = await userAddScore(1);
            //result
            expect(userRepo.getUserById).toBeCalledWith({userId: 1})
            expect(result[0]).toBe(1);
        })
        
    })
})