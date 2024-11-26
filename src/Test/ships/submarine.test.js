import Submarine from "../../Ships/submarine.js";

describe('submarine', ()=>{
    const submarine = new Submarine();

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
        expect(submarine.sunk).toBeFalsy();
    })

    test('isSunk', ()=>{
        expect(submarine.hits).toBe(2)
        expect(submarine.isSunk()).toBeTruthy();
        expect(submarine.sunk).toBeTruthy();
    })
})