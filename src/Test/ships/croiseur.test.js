import Croiseur from "../../Ships/croiseur.js";

describe('Croiseur', ()=>{
    const croiseur = new Croiseur();

    test('init', ()=>{
        expect(croiseur.length).toBe(4);
        expect(croiseur.hits).toBe(0);
        expect(croiseur.sunk).toBeFalsy();
    })

    test('hit', ()=>{
        croiseur.hit();
        expect(croiseur.hits).toBe(1);
        croiseur.hit();
        expect(croiseur.hits).toBe(2);
    })

    test('isSunk', ()=>{
        expect(croiseur.isSunk()).toBeFalsy();
        expect(croiseur.sunk).toBeFalsy();
        croiseur.hit();
        expect(croiseur.hits).toBe(3);
        expect(croiseur.isSunk()).toBeFalsy();
        expect(croiseur.sunk).toBeFalsy();
        croiseur.hit();
        expect(croiseur.hits).toBe(4);
        expect(croiseur.isSunk()).toBeTruthy();
        expect(croiseur.sunk).toBeTruthy();
    })
})