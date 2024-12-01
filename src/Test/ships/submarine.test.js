import GameBoard from "../../gameBoard.js";
import HitEvent from "../../PubSub/HitEvent.js";
import SunkEvent from "../../PubSub/SunkEvent.js";
import Submarine from "../../Ships/submarine.js";

describe('submarine', ()=>{
    const sunkEvent = new SunkEvent();
    const hitEvent = new HitEvent();
    const gameBoard = new GameBoard(sunkEvent, hitEvent);
    const submarine = new Submarine(sunkEvent, hitEvent);

    test('init', ()=>{
        expect(submarine.length).toBe(2);
        expect(submarine.hits).toBe(0);
        expect(submarine.sunk).toBeFalsy();
    })
    test('hit', ()=>{
        submarine.hit();
        expect(submarine.hits).toBe(1);
        submarine.hit();
        expect(submarine.hits).toBe(2);
        expect(submarine.sunk).toBeTruthy();
    })

    test('isSunk', ()=>{
        expect(submarine.hits).toBe(2)
        expect(submarine.isSunk()).toBeTruthy();
        expect(submarine.sunk).toBeTruthy();

        const submarine2 = new Submarine(sunkEvent, hitEvent);
        expect(submarine2.isSunk()).toBeFalsy();
    })
})