const httpMock = require("node-mocks-http");
const { faker } = require("@faker-js/faker");
const jwt = require("jsonwebtoken");
const tokenVerification = require("../token.verification");
const userRouter = require("../../user/user.route");

let req;
let res;

beforeEach(()=> {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
});

jwt.verify = jest.fn();

describe('token.verification.js', () => {
    describe('#tokenVerification', () => {
        const authData = {
            authorization : 'Bearer asiodmfopONomngTKS6262'
        };
        const tokenData = {
            email: faker.internet.email(),
            fullname: faker.name.fullName(),
            id: 3 
        };
        it('should return req.auth with credential data if the supplied data is valid.', async() => {
            //given
            req.headers = authData;
            jwt.verify.mockReturnValue({
                id: tokenData.id,
                email: tokenData.email,
                fullname: tokenData.fullname,
            });
            next = jest.fn(()=> 'pass')
            //when
            const result = await tokenVerification(req,res,next);
            //result
            expect(req.auth).toStrictEqual({
                id: tokenData.id,
                email: tokenData.email,
                fullname: tokenData.fullname
            })
            expect(jwt.verify).toBeCalled();
        });
        it('should show error 400 caused by cookies/token not supplied.', async() => {
            //when
            const result = await tokenVerification(req,res);
            //result
            expect(result.statusCode).toBe(400)
            expect(result._getData()).toStrictEqual({
                message: 'Missing Authorization header'
            });
        });
        it('should show error 401 caused by error while verify / token not valid.', async() => {
            //given
            req.headers = authData;
            jwt.verify.mockRejectedValue(new Error(0))
            //when
            const result = await tokenVerification(req,res);
            //result
            expect(result.statusCode).toBe(401)
            expect(jwt.verify).toBeCalled();
            expect(result._getJSONData()).toStrictEqual({
                message: 'Invalid token'
            });
        });
    });
});