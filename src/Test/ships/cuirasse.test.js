import GameBoard from "../../gameBoard.js";
import GameOverEvent from "../../PubSub/GameOverEvent.js";
import HitEvent from "../../PubSub/HitEvent.js";
import SunkEvent from "../../PubSub/SunkEvent.js";
import Cuirasse from "../../Ships/cuirasse.js";

describe('cuirasse', ()=>{
    const hitEvent = new HitEvent();
    const sunkEvent = new SunkEvent();
    const gameOverEvent = new GameOverEvent()
    const gameBoard = new GameBoard(sunkEvent, hitEvent, gameOverEvent);
    const cuirasse = new Cuirasse(sunkEvent, hitEvent);

    test('init', ()=>{
        expect(cuirasse.length).toBe(5);
        expect(cuirasse.hits).toBe(0);
        expect(cuirasse.sunk).toBeFalsy();
    })

    test('hit', ()=>{
        cuirasse.hit(cuirasse);
        expect(cuirasse.hits).toBe(1);
        cuirasse.hit(cuirasse);
        expect(cuirasse.hits).toBe(2);
    })

    test('isSunk', ()=>{
        expect(cuirasse.isSunk()).toBeFalsy();
        expect(cuirasse.sunk).toBeFalsy();
        cuirasse.hit(cuirasse);
        expect(cuirasse.hits).toBe(3);
        expect(cuirasse.isSunk()).toBeFalsy();
        expect(cuirasse.sunk).toBeFalsy();
        cuirasse.hit(cuirasse);
        expect(cuirasse.hits).toBe(4);
        expect(cuirasse.isSunk()).toBeFalsy();
        expect(cuirasse.sunk).toBeFalsy();
        cuirasse.hit(cuirasse);
        expect(cuirasse.hits).toBe(5);
        expect(cuirasse.isSunk()).toBeTruthy();
        expect(cuirasse.sunk).toBeTruthy();
    })
})