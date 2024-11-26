import "./style.css";
import GameBoard from "./gameBoard";
import SubmarineFactory from "./ShipFactory/submarineFactory";
import { isLine } from "./gameBoard";

const gameBoard = new GameBoard();
const submarineFactory = new SubmarineFactory(1);

while(submarineFactory.maxInstance){
    gameBoard.addShipToStorage(submarineFactory.create());
}
console.log(gameBoard.ships)

gameBoard.placeShipOnBoard()

console.log(gameBoard.board)