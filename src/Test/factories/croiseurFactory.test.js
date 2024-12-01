import CroiseurFactory from "../../ShipFactory/croiseurFactory";
import Croiseur from "../../Ships/croiseur";
import SunkEvent from "../../PubSub/SunkEvent"
import HitEvent from "../../PubSub/HitEvent"
jest.mock('../../Ships/croiseur.js');

describe("Init", ()=>{
    const sunkEvent = new SunkEvent();
    const hitEvent = new HitEvent();
    const croiseurFactory = new CroiseurFactory(sunkEvent, hitEvent);
    test('maxInstance = 4', ()=>expect(croiseurFactory.maxInstance).toBe(2));
    test('this.hitEvent instanceof HitEvent', ()=>expect(croiseurFactory.hitEvent instanceof HitEvent).toBeTruthy());
    test('this.sunkEvent instanceof SunkEvent', ()=>expect(croiseurFactory.sunkEvent instanceof SunkEvent).toBeTruthy());

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