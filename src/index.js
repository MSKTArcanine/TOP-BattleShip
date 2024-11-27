import "./style.css";
import GameBoard from "./gameBoard";
import SubmarineFactory from "./ShipFactory/submarineFactory";
import CroiseurFactory from "./ShipFactory/croiseurFactory";
import TorpilleurFactory from "./ShipFactory/torpilleurFactory";
import CuirasseFactory from "./ShipFactory/cuirasseFactory";

const gameBoard = new GameBoard();
const submarineFactory = new SubmarineFactory(1);
const croiseurFactory = new CroiseurFactory(1);
const cuirasseFactory = new CuirasseFactory(1);
const torpilleurFactory = new TorpilleurFactory(1);
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