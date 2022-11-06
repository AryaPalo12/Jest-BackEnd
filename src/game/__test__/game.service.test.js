const userRepo = require("../../user/user.repo");
const functionGameRepo = require("../game.repo");
const { createGame, gameList, getRoom, updatePlayerChoice, checkWinner } = require("../game.service");

describe("game.repo.js", () => {

    const gameTest = {
        name: 'Testing I',
        description: ' Testing only',
        pageNumber : 1,
        roomId : 1
    }

    describe("#createGame", () => {
      it("should create new game room!", async () => {
        const result = await createGame({name: gameTest.name, description: gameTest.description});
        expect(result.name).toBe(gameTest.name);
        expect(result.description).toBe(gameTest.description);
        expect(typeof result).toBe('object');
      });
    });
    describe('#gameList', ()=> {
        it('should show all list of game room', async ()=> {
            const result = await gameList(gameTest.pageNumber);
            expect(result).toBeTruthy();
            expect(result.length).not.toBe(0);
        });
    });
    describe('#getRoom', ()=> {
        it('should get show the room by room Id', async ()=> {
            const result = await getRoom (gameTest);
            expect(typeof result).toBe('object');
            expect(result).toBeTruthy();
            expect(result.name).not.toBe('');
        });
    });
    describe('#updatePlayerChoice', ()=>{
        it('should update a player1 choice', async () => {
            const result = await updatePlayerChoice({player: 'player1', userId: 1, userChoice: 'P', roomId: 1});
            expect(result).toBeTruthy();
            expect(result[0]).toBe(1);
            expect(result[1][0].user1_choice).toBe('P');
        });
        it('should update a player2 choice', async () => {
            const result = await updatePlayerChoice({player: 'player2', userId: 2, userChoice: 'S', roomId: 1});
            expect(result).toBeTruthy();
            expect(result[0]).toBe(1);
            expect(result[1][0].user2_choice).toBe('S');
        }); 
    });
    describe('#checkWinner', () =>{
        it('should check who the winner of the room is PR', async () => {
            //given
            const testGameData = {
                roomId:1
            };
            userRepo.getUserById = jest.fn(()=> {
                return {
                    fullname: 'Winner1'
                };
            });
            functionGameRepo.updateWinner = jest.fn(()=>null);
            functionGameRepo.getRoom = jest.fn(()=> {
                return {
                    user1_choice: 'P',
                    user2_choice: 'R',
                    userId1 : 4,
                    userId2 : 3
                }
            });
            userRepo.updateScore = jest.fn(()=>null);
            //when
            const result = await checkWinner(testGameData.roomId);
            //result
            expect(result).not.toBeNull();
            expect(result).toBe('Winner1');
        });
        it('should check who the winner of the room is PR', async () => {
            //given
            const testGameData = {
                roomId:1
            };
            userRepo.getUserById = jest.fn(()=> {
                return {
                    fullname: 'Winner1'
                };
            });
            functionGameRepo.updateWinner = jest.fn(()=>null);
            functionGameRepo.getRoom = jest.fn(()=> {
                return {
                    user1_choice: 'R',
                    user2_choice: 'S',
                    userId1 : 2,
                    userId2 : 1
                }
            });
            userRepo.updateScore = jest.fn(()=>null);
            //when
            const result = await checkWinner(testGameData.roomId);
            //result
            expect(userRepo.updateScore).toBeCalled();
            expect(result).not.toBeNull();
            expect(result).toBe('Winner1');
        });
        it('should check who the winner of the room is PR', async () => {
            //given
            const testGameData = {
                roomId:1
            };
            userRepo.getUserById = jest.fn(()=> {
                return {
                    fullname: 'Winner1'
                };
            });
            functionGameRepo.updateWinner = jest.fn(()=>null);
            functionGameRepo.getRoom = jest.fn(()=> {
                return {
                    user1_choice: 'S',
                    user2_choice: 'P',
                    userId1 : 4,
                    userId2 : 3
                }
            });
            userRepo.updateScore = jest.fn(()=>null);
            //when
            const result = await checkWinner(testGameData.roomId);
            //result
            expect(userRepo.updateScore).toBeCalled();
            expect(result).not.toBeNull();
            expect(result).toBe('Winner1');
        });
        it('should check who the winner of the room is PR', async () => {
            //given
            const testGameData = {
                roomId:1
            };
            userRepo.getUserById = jest.fn(()=> {
                return {
                    fullname: 'Winner2'
                };
            });
            functionGameRepo.updateWinner = jest.fn(()=>null);
            functionGameRepo.getRoom = jest.fn(()=> {
                return {
                    user1_choice: 'P',
                    user2_choice: 'S',
                    userId1 : 3,
                    userId2 : 4
                }
            });
            userRepo.updateScore = jest.fn(()=>null);
            //when
            const result = await checkWinner(testGameData.roomId);
            //result
            expect(result).not.toBeNull();
            expect(userRepo.updateScore).toBeCalled();
            expect(result).toBe('Winner2');
        });
        it('should check who the winner of the room is PR', async () => {
            //given
            const testGameData = {
                roomId:1
            };
            userRepo.getUserById = jest.fn(()=> {
                return {
                    fullname: 'Winner2'
                };
            });
            functionGameRepo.updateWinner = jest.fn(()=>null);
            functionGameRepo.getRoom = jest.fn(()=> {
                return {
                    user1_choice: 'R',
                    user2_choice: 'P',
                    userId1 : 3,
                    userId2 : 4
                }
            });
            userRepo.updateScore = jest.fn(()=>null);
            //when
            const result = await checkWinner(testGameData.roomId);
            //result
            console.log(result);
            expect(result).not.toBeNull();
            expect(result).toBe('Winner2');
        });
        it('should check who the winner of the room is PR', async () => {
            //given
            const testGameData = {
                roomId:1
            };
            userRepo.getUserById = jest.fn(()=> {
                return {
                    fullname: 'Winner2'
                };
            });
            functionGameRepo.updateWinner = jest.fn(()=>null);
            functionGameRepo.getRoom = jest.fn(()=> {
                return {
                    user1_choice: 'S',
                    user2_choice: 'R',
                    userId1 : 3,
                    userId2 : 4
                }
            });
            userRepo.updateScore = jest.fn(()=>null);
            //when
            const result = await checkWinner(testGameData.roomId);
            //result
            console.log(result);
            expect(result).not.toBeNull();
            expect(result).toBe('Winner2');
        });
        it('should check who the winner of the room is PR', async () => {
            //given
            const testGameData = {
                roomId:1
            };
            functionGameRepo.updateWinner = jest.fn(()=>null);
            functionGameRepo.getRoom = jest.fn(()=> {
                return {
                    user1_choice: 'R',
                    user2_choice: 'R',
                    userId1 : 4,
                    userId2 : 3
                }
            });
            //when
            const result = await checkWinner(testGameData.roomId);
            //result
            console.log(result);
            expect(result).not.toBeNull();
            expect(result).toBe('DRAW');
        });
    })
});