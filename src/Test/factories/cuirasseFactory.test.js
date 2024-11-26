import CuirasseFactory from "../../ShipFactory/cuirasseFactory";
import Cuirasse from "../../Ships/cuirasse";

jest.mock('../../Ships/Cuirasse.js');

describe("Init", ()=>{
    const cuirasseFactory = new CuirasseFactory();
    test('maxInstance = 4', ()=>expect(cuirasseFactory.maxInstance).toBe(1))
})

describe("create()", ()=>{
    const cuirasseFactory = new CuirasseFactory();
    test('Creation', ()=>expect(cuirasseFactory.create()).toBeInstanceOf(Cuirasse))
    test('Check : maxInstance = 2', ()=>expect(cuirasseFactory.maxInstance).toBe(0))
    test('Check : Error if instance <= 0', ()=>{
        expect(() => cuirasseFactory.create()).toThrow("Maximum instances reached");

    })
})