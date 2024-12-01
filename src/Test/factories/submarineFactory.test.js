import SubmarineFactory from "../../ShipFactory/submarineFactory";
import Submarine from "../../Ships/submarine";
import SunkEvent from "../../PubSub/SunkEvent";
import HitEvent from "../../PubSub/HitEvent";

jest.mock('../../Ships/submarine.js');

const sunkEvent = new SunkEvent();
const hitEvent = new HitEvent();

describe("Init", ()=>{
    const submarineFactory = new SubmarineFactory(sunkEvent, hitEvent);
    test('maxInstance = 4', ()=>expect(submarineFactory.maxInstance).toBe(4))
    test('this.hitEvent instanceof HitEvent', ()=>expect(submarineFactory.hitEvent instanceof HitEvent).toBeTruthy());
    test('this.sunkEvent instanceof SunkEvent', ()=>expect(submarineFactory.sunkEvent instanceof SunkEvent).toBeTruthy());

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
    const submatineFactory = new SubmarineFactory(sunkEvent, hitEvent, 5);
    test('5 instances : ', ()=>expect(submatineFactory.maxInstance).toBe(5));
})