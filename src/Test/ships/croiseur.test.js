import Croiseur from "../../Ships/croiseur.js";
import HitEvent from "../../PubSub/HitEvent.js";
import SunkEvent from "../../PubSub/SunkEvent.js";
import GameBoard from "../../gameBoard.js";
import GameOverEvent from "../../PubSub/GameOverEvent.js";
import GameLogic from "../../gameLogic.js";
import GameBoardUtils from "../../gameBoardUtils.js";

describe('Croiseur', ()=>{

    global.prompt = jest.fn()
    .mockReturnValueOnce(1)
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0);
    GameBoardUtils.coordinatesPrompt = jest.fn().mockReturnValue('1,1,1,2');

    const sunkEvent = new SunkEvent();
    const hitEvent = new HitEvent();
    const gameOverEvent = new GameOverEvent();
    const croiseur = new Croiseur(sunkEvent, hitEvent);
    const gameBoard = new GameBoard(sunkEvent, hitEvent, gameOverEvent);
    const gameLogic = new GameLogic(gameOverEvent);


    test('init', ()=>{
        expect(croiseur.length).toBe(4);
        expect(croiseur.hits).toBe(0);
        expect(croiseur.sunk).toBeFalsy();
    })

    test('hit', ()=>{
        croiseur.hit(croiseur);
        expect(croiseur.hits).toBe(1);
        croiseur.hit(croiseur);
        expect(croiseur.hits).toBe(2);
    })

    test('isSunk', ()=>{
        expect(croiseur.isSunk()).toBeFalsy();
        expect(croiseur.sunk).toBeFalsy();
        croiseur.hit(croiseur);
        expect(croiseur.hits).toBe(3);
        expect(croiseur.isSunk()).toBeFalsy();
        expect(croiseur.sunk).toBeFalsy();
        croiseur.hit(croiseur);
        expect(croiseur.hits).toBe(4);
        expect(croiseur.isSunk()).toBeTruthy();
        expect(croiseur.sunk).toBeTruthy();
    })
})