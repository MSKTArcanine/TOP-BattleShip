import GameBoard from "../gameBoard"
import HitEvent from "../PubSub/HitEvent";
import SunkEvent from "../PubSub/SunkEvent";
import SubmarineFactory from "../ShipFactory/submarineFactory";

describe('Intergation testing', ()=>{

    const hitEvent = new HitEvent();
    const sunkEvent = new SunkEvent();
    const gameBoard = new GameBoard(sunkEvent, hitEvent);
    const submarineFactory = new SubmarineFactory(sunkEvent, hitEvent, 2);
    it('', () => expect(true).toBeTruthy());
})