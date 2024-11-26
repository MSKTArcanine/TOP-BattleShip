import CroiseurFactory from "../../ShipFactory/croiseurFactory";
import Croiseur from "../../Ships/croiseur";

jest.mock('../../Ships/croiseur.js');

describe("Init", ()=>{
    const croiseurFactory = new CroiseurFactory();
    test('maxInstance = 4', ()=>expect(croiseurFactory.maxInstance).toBe(2))
})

describe("create()", ()=>{
    const croiseurFactory = new CroiseurFactory();
    croiseurFactory.create();
    test('Call Croiseur', ()=>expect(Croiseur).toHaveBeenCalled());
    test('Creation', ()=>expect(croiseurFactory.create()).toBeInstanceOf(Croiseur))
    test('Check : maxInstance = 2', ()=>expect(croiseurFactory.maxInstance).toBe(0))
    test('Check : Error if instance <= 0', ()=>{
        expect(() => croiseurFactory.create()).toThrow("Maximum instances reached");

    })
})