import Torpilleur from "../../Ships/torpilleur.js";

describe('torpilleur', ()=>{
    const torpilleur = new Torpilleur();

    test('init', ()=>{
        expect(torpilleur.length).toBe(3);
        expect(torpilleur.hits).toBe(0);
        expect(torpilleur.sunk).toBeFalsy();
    })

    test('hit', ()=>{
        torpilleur.hit();
        expect(torpilleur.hits).toBe(1);
        torpilleur.hit();
        expect(torpilleur.hits).toBe(2);
    })

    test('isSunk', ()=>{
        expect(torpilleur.isSunk()).toBeFalsy();
        expect(torpilleur.sunk).toBeFalsy();
        torpilleur.hit();
        expect(torpilleur.hits).toBe(3);
        expect(torpilleur.isSunk()).toBeTruthy();
        expect(torpilleur.sunk).toBeTruthy();
    })
})