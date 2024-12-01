import CuirasseFactory from "../../ShipFactory/cuirasseFactory";
import Cuirasse from "../../Ships/cuirasse";
import SunkEvent from "../../PubSub/SunkEvent";
import HitEvent from "../../PubSub/HitEvent";

jest.mock('../../Ships/Cuirasse.js');
const sunkEvent = new SunkEvent();
const hitEvent = new HitEvent();

describe("Init", ()=>{
    const cuirasseFactory = new CuirasseFactory(sunkEvent, hitEvent);
    test('maxInstance = 4', ()=>expect(cuirasseFactory.maxInstance).toBe(1))
    test('this.hitEvent instanceof HitEvent', ()=>expect(cuirasseFactory.hitEvent instanceof HitEvent).toBeTruthy());
    test('this.sunkEvent instanceof SunkEvent', ()=>expect(cuirasseFactory.sunkEvent instanceof SunkEvent).toBeTruthy());

})

describe("create()", ()=>{
    const cuirasseFactory = new CuirasseFactory(sunkEvent, hitEvent);
    test('Creation', ()=>expect(cuirasseFactory.create()).toBeInstanceOf(Cuirasse))
    test('Check : maxInstance = 2', ()=>expect(cuirasseFactory.maxInstance).toBe(0))
    test('Check : Error if instance <= 0', ()=>{
        expect(() => cuirasseFactory.create()).toThrow("Maximum instances reached");

    })
})