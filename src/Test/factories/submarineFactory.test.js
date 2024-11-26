import SubmarineFactory from "../../ShipFactory/submarineFactory";
import Submarine from "../../Ships/submarine";

jest.mock('../../Ships/submarine.js');

describe("Init", ()=>{
    const submarineFactory = new SubmarineFactory();
    test('maxInstance = 4', ()=>expect(submarineFactory.maxInstance).toBe(4))
})

describe("create()", ()=>{
    const submarineFactory = new SubmarineFactory();
    submarineFactory.create();
    test('Call submarine', ()=>expect(Submarine).toHaveBeenCalled());
    test('Creation', ()=>expect(submarineFactory.create()).toBeInstanceOf(Submarine))
    test('Check : maxInstance = 2', ()=>expect(submarineFactory.maxInstance).toBe(2))
    test('Check : Error if instance <= 0', ()=>{
        submarineFactory.create();
        submarineFactory.create();
        expect(() => submarineFactory.create()).toThrow("Maximum instances reached");

    })
})

describe('test instances :', ()=>{
    const submatineFactory = new SubmarineFactory(5);
    test('5 instances : ', ()=>expect(submatineFactory.maxInstance).toBe(5));
})