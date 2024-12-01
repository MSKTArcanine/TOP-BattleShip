import "./style.css";
import GameBoard from "./gameBoard";
import SubmarineFactory from "./ShipFactory/submarineFactory";
import CroiseurFactory from "./ShipFactory/croiseurFactory";
import TorpilleurFactory from "./ShipFactory/torpilleurFactory";
import CuirasseFactory from "./ShipFactory/cuirasseFactory";
import SunkEvent from "./PubSub/SunkEvent";
import HitEvent from "./PubSub/HitEvent";

const sunkEvent = new SunkEvent();
const hitEvent = new HitEvent()
const gameBoard = new GameBoard();
const submarineFactory = new SubmarineFactory(sunkEvent, hitEvent, 1);
const croiseurFactory = new CroiseurFactory(sunkEvent, hitEvent, 1);
const cuirasseFactory = new CuirasseFactory(sunkEvent, hitEvent, 1);
const torpilleurFactory = new TorpilleurFactory(sunkEvent, hitEvent, 1);
const factories = [submarineFactory, croiseurFactory, cuirasseFactory, torpilleurFactory]

while(true){
    factories.forEach(factory => {
        while(factory.maxInstance > 0)
            gameBoard.addShipToStorage(factory.create())
    })
    break;
}

gameBoard.placeShipOnBoard()
console.log(gameBoard.getBoard())
gameBoard.receiveAttack(1,1);
gameBoard.receiveAttack(2,2);
gameBoard.receiveAttack(0,2);
gameBoard.receiveAttack(9,9);
console.log(gameBoard.getBoard())