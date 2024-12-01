import GameBoard from "../../gameBoard.js";
import GameOverEvent from "../../PubSub/GameOverEvent.js";
import HitEvent from "../../PubSub/HitEvent.js";
import SunkEvent from "../../PubSub/SunkEvent.js";
import Torpilleur from "../../Ships/torpilleur.js";

describe('torpilleur', ()=>{
    const sunkEvent = new SunkEvent();
    const hitEvent = new HitEvent();
    const gameOverEvent = new GameOverEvent()
    const gameBoard = new GameBoard(sunkEvent, hitEvent, gameOverEvent);
    const torpilleur = new Torpilleur(sunkEvent, hitEvent);

    test('init', ()=>{
        expect(torpilleur.length).toBe(3);
        expect(torpilleur.hits).toBe(0);
        expect(torpilleur.sunk).toBeFalsy();
    })

    test('hit', ()=>{
        torpilleur.hit(torpilleur);
        expect(torpilleur.hits).toBe(1);
        torpilleur.hit(torpilleur);
        expect(torpilleur.hits).toBe(2);
    })

    test('isSunk', ()=>{
        expect(torpilleur.isSunk()).toBeFalsy();
        expect(torpilleur.sunk).toBeFalsy();
        torpilleur.hit(torpilleur);
        expect(torpilleur.hits).toBe(3);
        expect(torpilleur.isSunk()).toBeTruthy();
        expect(torpilleur.sunk).toBeTruthy();
    })
})