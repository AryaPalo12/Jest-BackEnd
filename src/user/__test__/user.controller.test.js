const { faker } = require("@faker-js/faker");
const httpMock = require("node-mocks-http");
const { createUser, getAllUser, editPassword } = require("../user.controller");
const userService = require("../user.service");

const req = httpMock.createRequest();
const res = httpMock.createResponse({eventEmitter: require('events').EventEmitter});

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
            console.log(result);
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
            expect(result._getJSONData().error500).toBe('Something went wrong. Please try again later')
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
})