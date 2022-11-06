const { faker } = require("@faker-js/faker");
const httpMock = require("node-mocks-http");
const { createUser, getAllUser, editPassword, editUser, getUserById, userAddScore, findEmail } = require("../user.controller");
const userService = require("../user.service");

let req;
let res;

beforeEach(()=> {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
})



userService.createUser = jest.fn();

describe('user.controller.js', () => {
    describe('#createUser', () => {
        const userData = {
            fullname: faker.name.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };
        it('should be creating a new user', async() => {
            //given
            req.body = userData;
            userService.createUser.mockReturnValue({userData});
            //when
            const result = await createUser(req,res);
            //result
            expect(userService.createUser).toBeCalled();
            expect(result.statusCode).toBe(200);
            expect(result._getJSONData()).toStrictEqual({
                message: "Congratulations! Your account has been created",
            });
        });
        it('should fail to create a new user', async () => {
            //given
            req.body = userData;
            userService.createUser.mockReturnValue(null);
            //when
            const result = await createUser(req,res);
            //expect
            expect(userService.createUser).toBeCalledWith(userData);
            expect(result.statusCode).toBe(400);
        });
        it('should return failed with status code 500', async () => {
            //given
            userService.createUser.mockRejectedValue(new Error());
            //when
            const result = await createUser(req,res);
            expect(userService.createUser).toBeCalled();
            expect(result._getJSONData()).toStrictEqual({
                message: "Something went wrong. Please try again later"
            });
        });
    });
    describe('#getAllUser',()=> {
        const listData = [
            {
                fullname: faker.name.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            },
            {
                fullname: faker.name.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            },
            {
                fullname: faker.name.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            }
            ]
            const testParam = {
                pageNumber: 1,
                limitParm: 5
            }
        it('should get a list of all users', async () => {
            //given
            req.query = testParam;
            userService.getAllUser = jest.fn(()=> listData);
            //when
            const result = await getAllUser (req,res);
            //expect
            expect(userService.getAllUser).toBeCalledWith(testParam);
            expect(result._getJSONData()).toStrictEqual(listData);
        });
        it('should return an error', async () => {
            //given
            userService.getAllUser = jest.fn();
            userService.getAllUser.mockRejectedValue(new Error());
            //when
            const result = await getAllUser(req,res);
            //expect
            expect(result.statusCode).toBe(500);
            expect(result._getJSONData()).toBe('Something went wrong. Please try again later')
        });
    });
    describe('#editPassword', ()=> {
        userService.editPassword = jest.fn();
        const testUserId = {
            userId : 3,
            password : '123645Passw@',
            id: 3
        }
        it('should changed the password', async () => {
            //given
            req.params = testUserId;
            req.body = testUserId;
            req.auth = testUserId;
            userService.editPassword.mockReturnValue([1])
            //when
            const result = await editPassword(req,res);
            //expect
            expect(userService.editPassword).toBeCalled();
            expect(result._getJSONData()).toStrictEqual({
                message:'Update successful'
            });
            expect(result.statusCode).toBe(200);
        });
        it('should show Error 401 if the Password change failed', async () => {
            //given
            req.params = testUserId;
            req.body = testUserId;
            req.auth = testUserId;
            userService.editPassword.mockReturnValue();
            //when
            const result = await editPassword(req,res);
            //expect
            expect(userService.editPassword).toBeCalled();
            expect(result._getJSONData()).toStrictEqual({
                message:'update fail!'
            });
            expect(result.statusCode).toBe(401);
        });
        it('should show Error 401 Authorization failed if the token and auth is different', async () => {
            //given
            req.params = testUserId;
            req.body = testUserId;
            req.auth = {
                id : 2
            };
            //when
            const result = await editPassword(req,res);
            //expect
            expect(result._getJSONData()).toStrictEqual({
                message:'Authorization failed'
            });
            expect(result.statusCode).toBe(401);
        });
        it('should show Error 500 if password edit failed', async () => {
            //given
            req.params = testUserId;
            req.body = testUserId;
            userService.editPassword.mockRejectedValue(new Error());
            //when
            const result = await editPassword(req,res);
            //expect
            expect(result._getJSONData()).toStrictEqual({
                message:'Something went wrong. Please try again later'
            });
            expect(result.statusCode).toBe(500);
        });
    });
    describe('#editUser', () => {
        const testUserId = {
            fullname: faker.name.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            userId: 4,
            id : 4
        };
        userService.editUser = jest.fn();
        it('should successfully edit the user data', async () => {
            //given
            req.body = testUserId;
            req.params = testUserId;
            req.auth = testUserId;
            userService.editUser.mockReturnValue('Update successful');
            //when
            const result = await editUser(req,res);
            //expect
            expect(userService.editUser).toBeCalled()
            expect(result.statusCode).toBe(200);
            expect(result._getJSONData()).toEqual({ message: 'Update successful' });
        });
        it('should give a 401 Error message if the userId and token Id is different', async () => {
            //given
            req.body = testUserId;
            req.params = testUserId;
            req.auth = {
                id : 3,
                email : 'wrong@gmail.com'
            };
            //when
            const result = await editUser (req,res);
            //expect
            expect(result.statusCode).toBe(401);
            expect(result._getJSONData()).toEqual({
                message : 'Authorization failed'
            });
        });
        it('should given error code 500', async () => {
            //given
            req.body = testUserId;
            req.params = testUserId;
            req.auth = testUserId;
            userService.editUser.mockRejectedValue(new Error());
            //when
            const result = await editUser(req,res);
            //expect
            expect(userService.editUser).toBeCalled()
            expect(result.statusCode).toBe(500);
            expect(result._getJSONData()).toEqual({ message: 'Something went wrong. Please try again later' });
        });
    });
    describe('#getUserById', () => {
        const testUserId = {
            id: 2,
            fullname : faker.name.fullName(),
            email: faker.internet.email(),
            userId: 2,
            score: 0
        };
        userService.getUserById = jest.fn();
        it('should get a specific user by the Id', async () => {
            //given
            req.params = testUserId;
            userService.getUserById.mockReturnValue({
                id: 2,
                fullname: testUserId.fullname,
                email: testUserId.email,
                score: 0
            })
            //when
            const result = await getUserById (req,res);
            //expect
            expect(result.statusCode).toBe(200)
            expect(result._getJSONData().fullname).toBe(testUserId.fullname);
            expect(result._getJSONData().email).toBe(testUserId.email);
        });
        it('should show an error 500 if the get User by id failed', async () => {
            //given
            userService.getUserById.mockRejectedValue(new Error());
            //when
            const result = await getUserById(req,res);
            //expect
            expect(userService.getUserById).toBeCalled();
            expect(result.statusCode).toBe(500);
            expect(result._getJSONData()).toEqual({
                message: 'Something went wrong. Please try again later'
            });
        });
    });
    describe('#userAddScore', () => {
        const testUserId = {
            userId: 2,
        };
        userService.userAddScore = jest.fn();
        it('should successfully add the user score', async () => {
            //given
            req.params = testUserId;
            userService.userAddScore.mockReturnValue('success');
            //when
            const result = await userAddScore(req,res);
            //expect
            console.log(result._getJSONData());
            expect(userService.userAddScore).toBeCalled();
            expect(result._getJSONData()).toStrictEqual({
                userId: 2,
                message: 'Score Added Success'
            });
            expect(result.statusCode).toBe(200)
        });
        it('should show error 500 when adding score failed or user id does not exist ', async () => {
            //given
            req.params = testUserId;
            userService.userAddScore.mockRejectedValue(new Error());
            //when
            const result = await userAddScore(req,res);
            //expect
            expect(result.statusCode).toBe(500);
            expect(result._getJSONData()).toStrictEqual({
                message: 'Something gone wrong when adding the score'
            });         
        });
    });
    describe('#findEmail', () => {
        userService.findEmail = jest.fn();
        const emailTest = {
            email: faker.internet.email(),
        }
        it('should send a password reset email to the user', async () => {
            //given
            req.body = emailTest;
            userService.findEmail.mockReturnValue(emailTest.email)
            //when
            const result = await findEmail(req,res);
            //expect
            expect(result.statusCode).toBe(200);
            expect(userService.findEmail).toBeCalled();
            expect(result._getJSONData()).toStrictEqual({
                message: 'Kindly check your email account!, We have sent a new password for you'
            });
        });
        it('should return an error 400 email not found', async () => {
            //given
            req.body = emailTest;
            userService.findEmail.mockReturnValue(null)
            //when
            const result = await findEmail(req,res);
            //expect
            expect(result.statusCode).toBe(400);
            expect(userService.findEmail).toBeCalled();
            expect(result._getJSONData()).toStrictEqual({
                message: 'We do not find your email. Please, input correctly!'
            });
        });
        it('should return Error 500 something goes wrong while resetting password', async () => {
            //given
            userService.findEmail.mockRejectedValue(new Error());
            //when
            const result = await findEmail(req,res);
            //expect
            expect(result.statusCode).toBe(500);
            expect(userService.findEmail).toBeCalled();
            expect(result._getJSONData()).toStrictEqual({
                message: 'Something went wrong. Please try again later'
            });
        });
    });
});