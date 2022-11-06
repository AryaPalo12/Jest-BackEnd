const httpMock = require("node-mocks-http");
const { faker } = require("@faker-js/faker");
const { createGame, gameList, getRoom, updatePlayerChoice } = require("../game.controller");
const FunctionGameService = require("../game.service");

let req;
let res;

beforeEach(()=> {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
});

describe('game.controller.js', () => {
    describe('#createGame', () => {
        FunctionGameService.createGame = jest.fn()
        const gameData = {
            name: faker.name.firstName(),
            description : faker.word.adverb(),
        };
        const roomResponse = {
            name: gameData.name,
            description: gameData.description,
            winner : null,
            user1_choice: null,
            user2_choice: null,
            userId1 : null,
            userId2 : null,
        };
        it('should be creating a new room', async() => {
            //given
            req.body = gameData;
            FunctionGameService.createGame.mockReturnValue(roomResponse)
            //when
            const result = await createGame(req,res);
            //result
            expect(FunctionGameService.createGame).toBeCalled();
            expect(result.statusCode).toBe(200);
            expect(result._getJSONData().name).toBe(gameData.name);
            expect(result._getJSONData().description).toBe(gameData.description);
        });
        it('should fail to create a room', async () => {
            //given
            FunctionGameService.createGame.mockRejectedValue(new Error());            
            //when
            const result = await createGame(req,res);
            //expect
            expect(FunctionGameService.createGame).toBeCalled();
            expect(result.statusCode).toBe(500);
        }); 
    });
    describe('#gameList', () => {
        FunctionGameService.gameList = jest.fn();
        const pageData = {
            pageNumber : 1
        }
        const pageResponse = [
            {
                id: 4,
                name: 'Testing I',
                description: ' Testing only',
                winner: null
              },
              {
                id: 1,
                name: 'Testing I',
                description: ' Testing only',
                winner: 'FakeHero'
              }
        ]
        it('should show list of game room', async () => {
            //given
            req.query = pageData
            FunctionGameService.gameList.mockReturnValue([
                    {
                        id: 4,
                        name: 'Testing I',
                        description: ' Testing only',
                        winner: null
                    },
                      {
                        id: 1,
                        name: 'Testing I',
                        description: ' Testing only',
                        winner: 'FakeHero'
                    }]
                );
            //when
            const result = await gameList (req,res);
            //expect
            expect(result.statusCode).toBe(200);
            expect(FunctionGameService.gameList).toBeCalled();
            expect(result._getJSONData()).toStrictEqual([
                {
                    id: 4,
                    name: 'Testing I',
                    description: ' Testing only',
                    winner: null
                  },
                  {
                    id: 1,
                    name: 'Testing I',
                    description: ' Testing only',
                    winner: 'FakeHero'
                  }
            ]);
        });
        it('should show Error 500 when it failed to fetch the game room list.', async () => {
            //given
            req.query = pageData
            FunctionGameService.gameList.mockRejectedValue(new Error())
            //when
            const result = await gameList (req,res);
            //expect
            expect(result.statusCode).toBe(500);
            expect(FunctionGameService.gameList).toBeCalled();
            expect(result._getJSONData()).toStrictEqual({
                message: "Something went wrong. Please try again later"
            });
        });
    });
    describe('#getRoom', () => {
        FunctionGameService.getRoom = jest.fn();
        const roomData = {
            roomId : 1
        }
        const roomResponse = {
            id: 1,
            name: faker.name.jobTitle(),
            description: faker.commerce.product(),
            winner: faker.name.fullName(),
            user1_choice: 'P',
            user2_choice: 'S',
            userId1: 3,
            userId2: 4,
            createdAt: 'date now',
            updatedAt: 'date soon'
        }
        it('shouid return a game room details', async () => {
            //given
            req.params = roomData
            FunctionGameService.getRoom.mockReturnValue(roomResponse)
            //when
            const result = await getRoom (req,res);
            //expect
            expect(FunctionGameService.getRoom).toBeCalled();
            expect(result.statusCode).toBe(200);
            expect(result._getJSONData()).toStrictEqual({
                id: roomResponse.id,
                name: roomResponse.name,
                description: roomResponse.description,
                winner: roomResponse.winner,
                user1_choice: roomResponse.user1_choice,
                user2_choice: roomResponse.user2_choice,
                userId1: roomResponse.userId1,
                userId2: roomResponse.userId2,
                createdAt: roomResponse.createdAt,
                updatedAt: roomResponse.updatedAt
            });
        });
        it('should return an error 500 if the room details fetching data failed.', async () => {
            //given
            req.params = roomData
            FunctionGameService.getRoom.mockRejectedValue(new Error());
            //when
            const result = await getRoom (req,res);
            //expect
            expect(result.statusCode).toBe(500);
            expect(FunctionGameService.getRoom).toBeCalled();
            expect(result._getJSONData()).toStrictEqual({
                message: "Something went wrong. Please try again later"
            });
        });
    });
    describe('#updatePlayerChoice', () => {
        const roomData1 = {
            player: 'player1',
            userId: 2,
            userChoice: 'P',
            roomId : 5,
        };
        const roomData2 = {
            player: 'player2',
            userId: 1,
            userChoice: 'S',
            roomId : 5,
        };
        FunctionGameService.updatePlayerChoice= jest.fn();
        FunctionGameService.checkWinner = jest.fn()
        it('should update the player 1 choice', async () => {
            //given
            req.body = roomData1;
            req.params = roomData1;
            FunctionGameService.updatePlayerChoice.mockReturnValue([1])
            //when
            const result = await updatePlayerChoice(req,res);
            //expect
            expect(result.statusCode).toBe(200);
            expect(FunctionGameService.updatePlayerChoice).toBeCalled();
            expect(result._getJSONData()).toStrictEqual({
                message: 'Pilihan Berhasil di Update Silahkan Tunggu Player 2 !'
            });
        });
        it('should update the player 2 choice', async () => {
            //given
            req.body = roomData2;
            req.params = roomData2;
            FunctionGameService.updatePlayerChoice.mockReturnValue([1])
            FunctionGameService.checkWinner.mockReturnValue('WinnerName')
            //when
            const result = await updatePlayerChoice(req,res);
            //expect
            expect(result.statusCode).toBe(200);
            expect(result._getJSONData()).toStrictEqual({
                result: 'WinnerName'
            });
            expect(FunctionGameService.updatePlayerChoice).toBeCalled();
            expect(FunctionGameService.checkWinner).toBeCalled();
        });
        it('should give a Error 500 if there is something wrong while updating the player choice to the room.', async () => {
            //given
            req.body = roomData1;
            req.params = roomData1;
            FunctionGameService.updatePlayerChoice.mockRejectedValue(new Error());
            //when
            const result = await updatePlayerChoice(req,res);
            //expect
            expect(result.statusCode).toBe(500);
            expect(FunctionGameService.updatePlayerChoice).toBeCalled();
            expect(result._getJSONData()).toStrictEqual({
                message: 'Something went wrong. Please try again later'
            });
        });
    })
});