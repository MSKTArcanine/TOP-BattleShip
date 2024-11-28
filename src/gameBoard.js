import { zeros } from "mathjs";
import GameBoardUtils from "./gameBoardUtils";
export default class GameBoard{
    constructor(){
        this.board = zeros([10, 10]);
        this.ships = [];
        this.isShipsPlaced = false;
    }
    
    getBoard(){return this.board}
    getShipAt(u, v){
        return this.board[u][v];
    }
    addShipToStorage(ship){
        this.ships.push(ship);
    }
    placeAt(value, u, v){
        this.board[u][v] = value;
    }
    placeShipOnBoard(){
        this.ships.forEach(
            ship => {
                while(true){
                    const coordinates = GameBoardUtils.coordinatesPrompt(ship);
                    const [u1, v1, u2, v2] = coordinates.split(',');
                    if(!GameBoardUtils.coordinatesChecker(coordinates))
                        continue;
                    const [coo1, coo2] = GameBoardUtils.getCoordinatesForm(u1, v1, u2, v2);
                    const difference = GameBoardUtils.getDifferenceFromCoordinates(coo1, coo2);
                    if(!GameBoardUtils.isLine(difference))
                        continue;
                    if(!GameBoardUtils.lengthCheck(difference, ship.length))
                        continue;
                    if(!GameBoardUtils.outOfBondsCheck(u1, v1, u2, v2))
                        continue;
                    const nonZeroIndex = GameBoardUtils.getNonZeroFromDiff(difference);
                    const coordinateToChange = GameBoardUtils.getBiggestCoordinates(coo1, coo2);
                    const arrayOfCoordinates = GameBoardUtils.getArrayOfCoordinates(coordinateToChange, ship.length, nonZeroIndex);
                    if(!GameBoardUtils.checkForCoordinatesCollisions(this, arrayOfCoordinates))
                        continue;
                    GameBoardUtils.positionShipOnBoard(this.board, ship, arrayOfCoordinates);
                    break;
                }
            }
        )
        this.isShipsPlaced = true;
    }
    receiveAttack(u, v){
        if(GameBoardUtils.checkForHit(this, u, v)){
            //todo : signal to ship, make chip.hits += 1, checkforsink => PUBSUB
        }
    }
}