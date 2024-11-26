import Cuirasse from "../../Ships/cuirasse.js";

describe('cuirasse', ()=>{
    const cuirasse = new Cuirasse();

    test('init', ()=>{
        expect(cuirasse.length).toBe(5);
        expect(cuirasse.hits).toBe(0);
        expect(cuirasse.sunk).toBeFalsy();
    })

    test('hit', ()=>{
        cuirasse.hit();
        expect(cuirasse.hits).toBe(1);
        cuirasse.hit();
        expect(cuirasse.hits).toBe(2);
    })

    test('isSunk', ()=>{
        expect(cuirasse.isSunk()).toBeFalsy();
        expect(cuirasse.sunk).toBeFalsy();
        cuirasse.hit();
        expect(cuirasse.hits).toBe(3);
        expect(cuirasse.isSunk()).toBeFalsy();
        expect(cuirasse.sunk).toBeFalsy();
        cuirasse.hit();
        expect(cuirasse.hits).toBe(4);
        expect(cuirasse.isSunk()).toBeFalsy();
        expect(cuirasse.sunk).toBeFalsy();
        cuirasse.hit();
        expect(cuirasse.hits).toBe(5);
        expect(cuirasse.isSunk()).toBeTruthy();
        expect(cuirasse.sunk).toBeTruthy();
    })
})