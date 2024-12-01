import "./style.css";
import GameBoard from "./gameBoard";
import SubmarineFactory from "./ShipFactory/submarineFactory";
import CroiseurFactory from "./ShipFactory/croiseurFactory";
import TorpilleurFactory from "./ShipFactory/torpilleurFactory";
import CuirasseFactory from "./ShipFactory/cuirasseFactory";
import SunkEvent from "./PubSub/SunkEvent";
import HitEvent from "./PubSub/HitEvent";
import Submarine from "./Ships/submarine";

const sunkEvent = new SunkEvent();
const hitEvent = new HitEvent()
const gameBoard = new GameBoard(sunkEvent, hitEvent);
const submarineFactory = new SubmarineFactory(sunkEvent, hitEvent, 1);
const croiseurFactory = new CroiseurFactory(sunkEvent, hitEvent, 1);
const cuirasseFactory = new CuirasseFactory(sunkEvent, hitEvent, 1);
const torpilleurFactory = new TorpilleurFactory(sunkEvent, hitEvent, 1);
const factories = [submarineFactory, croiseurFactory, cuirasseFactory, torpilleurFactory]

while(true){
    factories.forEach(factory => {
        while(factory.maxInstance > 0){
            console.log(factory.constructor.name);
            gameBoard.addShipToStorage(factory.create())}
    })
    break;
}

gameBoard.placeShipOnBoard()
console.table(gameBoard.getBoard())
console.log(gameBoard.getBoard()[1][1] === gameBoard.getBoard()[1][2])
console.log(gameBoard.getShipAt(1, 1) instanceof Submarine);
console.log(gameBoard.getShipAt(1,1).hits);
gameBoard.receiveAttack(1,1);
console.log(gameBoard.getShipAt(1,2).hits);
gameBoard.receiveAttack(1,2);
console.table(gameBoard.getBoard())