const { createGame, gameList, getRoom, updatePlayerChoice, updateWinner } = require("../game.repo");

describe("game.repo.js", () => {

    const gameTest = {
        name: 'Testing I',
        description: ' Testing only'
    }

    describe("#createGame", () => {
      it("should create new game room!", async () => {
        const result = await createGame({name: gameTest.name, description: gameTest.description});
        expect(result.name).toBe(gameTest.name);
        expect(result.description).toBe(gameTest.description);
        expect(typeof result).toBe('object');
      });
      it('should show Sequelize Error if description undefined', async () => {
        try{
            const result = await createGame({name: gameTest.name});
        } catch(e){
            expect(e.name).toBe('SequelizeDatabaseError');
        }        
      });
      it('should show Sequelize Error if name undefined', async () => {
        try{
            const result = await createGame ({description: gameTest.description});
        } catch (e) {
            expect(e.name).toBe('SequelizeDatabaseError')
        }
      });
    });
    describe('#gameList', ()=> {
        it('should show all list of game room', async ()=> {
            const result = await gameList();
            expect(result).toBeTruthy();
            expect(result.length).not.toBe(0);
        });
        it('should show all game list of game room with page', async () =>{
            const result = await gameList(1);
            expect(result).toBeTruthy();
            expect(result.length).not.toBe(0);
        });
    });
    describe('#getRoom', ()=> {
        it('should get show the room by room Id', async ()=> {
            const result = await getRoom ({roomId : 1});
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
    describe('#updateWinner', () =>{
        it('should update the room Winner', async () => {
            const result = await updateWinner ({roomId : 1, result: 'FakeHero'});
            expect(result).toBeTruthy();
            expect(result[0]).toBe(1);
            expect(result[1][0].winner).toBe('FakeHero');
        });
    })
});