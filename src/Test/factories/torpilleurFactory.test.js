import TorpilleurFactory from "../../ShipFactory/torpilleurFactory";
import Torpilleur from "../../Ships/torpilleur";

jest.mock('../../Ships/torpilleur.js');

describe("Init", ()=>{
    const torpilleurFactory = new TorpilleurFactory();
    test('maxInstance = 4', ()=>expect(torpilleurFactory.maxInstance).toBe(3))
})

describe("create()", ()=>{
    const torpilleurFactory = new TorpilleurFactory();
    torpilleurFactory.create();
    test('Call torpilleur', ()=>expect(Torpilleur).toHaveBeenCalled());
    test('Creation', ()=>expect(torpilleurFactory.create()).toBeInstanceOf(Torpilleur))
    test('Check : maxInstance = 2', ()=>expect(torpilleurFactory.maxInstance).toBe(1))
    test('Check : Error if instance <= 0', ()=>{
        torpilleurFactory.create();
        expect(() => torpilleurFactory.create()).toThrow("Maximum instances reached");

    })
})