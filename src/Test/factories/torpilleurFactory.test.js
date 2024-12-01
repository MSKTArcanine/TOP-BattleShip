import HitEvent from "../../PubSub/HitEvent";
import SunkEvent from "../../PubSub/SunkEvent";
import TorpilleurFactory from "../../ShipFactory/torpilleurFactory";
import Torpilleur from "../../Ships/torpilleur";

jest.mock('../../Ships/torpilleur.js');

describe("Init", ()=>{
    const hitEvent = new HitEvent();
    const sunkEvent = new SunkEvent();
    const torpilleurFactory = new TorpilleurFactory(sunkEvent, hitEvent);
    test('maxInstance = 4', ()=>expect(torpilleurFactory.maxInstance).toBe(3))
    test('this.hitEvent instanceof HitEvent', ()=>expect(torpilleurFactory.hitEvent instanceof HitEvent).toBeTruthy());
    test('this.sunkEvent instanceof SunkEvent', ()=>expect(torpilleurFactory.sunkEvent instanceof SunkEvent).toBeTruthy());

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