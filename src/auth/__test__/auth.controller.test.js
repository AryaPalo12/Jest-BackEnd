const httpMock = require("node-mocks-http");
const functionAuthService = require("../auth.service");
const jwt = require("jsonwebtoken");
const { authUser } = require("../auth.controller");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

let req;
let res;

beforeEach(()=> {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
});

functionAuthService.authUser = jest.fn();
bcrypt.compare = jest.fn();
jwt.sign = jest.fn();

describe('auth.controller.js', () => {
    describe('#authUser', () => {
        const userData = {
            fullname: faker.name.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            accessToken : 'Bearer asdgsdg529g2d9+2vcfwTnomoaifaBRSfhrt92',
            id: 4,
            loginStatus: 1,
        };
        it('should response with accessToken, id, loginStatus, email, and fullname with a successful login.', async() => {
            //given
            req.body = userData;
            bcrypt.compare.mockReturnValue(true);
            jwt.sign.mockReturnValue('Bearer asdgsdg529g2d9+2vcfwTnomoaifaBRSfhrt92');
            functionAuthService.authUser.mockReturnValue({
                id: userData.id,
                loginStatus: 1,
                email: userData.email,
                fullname: userData.fullname,
            });
            //when
            const result = await authUser(req,res);
            //result
            expect(functionAuthService.authUser).toBeCalled();
            expect(jwt.sign).toBeCalled();
            expect(bcrypt.compare).toBeCalled();
            expect(result.statusCode).toBe(200);
            expect(result._getJSONData()).toEqual({
                accessToken : userData.accessToken,
                id: userData.id,
                loginStatus: 1,
                email: userData.email,
                fullname: userData.fullname,
            });
        });
        it('should show error 400 Login failed if the password given is wrong.', async() => {
            //given
            req.body = userData;
            bcrypt.compare.mockReturnValue(false);
            functionAuthService.authUser.mockReturnValue({
                id: userData.id,
                loginStatus: 1,
                email: userData.email,
                fullname: userData.fullname,
            });
            //when
            const result = await authUser(req,res);
            //result
            expect(functionAuthService.authUser).toBeCalled();
            expect(bcrypt.compare).toBeCalled();
            expect(result.statusCode).toBe(400);
            expect(result._getJSONData()).toStrictEqual({
                message: 'Login failed'
            });
        });
        it('should show error 404 Login failed if the email given is wrong.', async() => {
            //given
            req.body = userData;
            functionAuthService.authUser.mockReturnValue(null);
            //when
            const result = await authUser(req,res);
            //result
            expect(functionAuthService.authUser).toBeCalled();
            expect(result.statusCode).toBe(404);
            expect(result._getJSONData()).toStrictEqual({
                message: 'User not found'
            });
        });
    });
});