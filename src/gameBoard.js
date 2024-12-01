import { zeros } from "mathjs";
import GameBoardUtils from "./gameBoardUtils";
import Ship from "./Ships/ship";
import SunkEvent from "./PubSub/SunkEvent";
import HitEvent from "./PubSub/HitEvent";
export default class GameBoard{
    static id = 0;
    constructor(sunkEvent, hitEvent, gameOverEvent){
        this.id = GameBoard.id++;
        this.board = zeros([10, 10]);
        this.ships = [];
        this.isShipsPlaced = false;
        this.sunkEvent = sunkEvent;
        this.hitEvent = hitEvent;
        this.sunkenShips = 0;
        this.sunkEvent.subscribe(this.receiveOnSunk.bind(this));
        this.gameOverEvent = gameOverEvent;
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
                    console.log(`Placing ship: ${ship.name} at ${arrayOfCoordinates}`)
                    GameBoardUtils.positionShipOnBoard(this.board, ship, arrayOfCoordinates);
                    break;
                }
            }
        )
        this.isShipsPlaced = true;
    }
    receiveAttack(u, v){
        const hitObj = this.getShipAt(u, v);
        if(hitObj instanceof Ship){
            //todo : signal to ship, make chip.hits += 1, checkforsink => PUBSUB
            
            //EVENT ONHIT
            this.emitOnHit(hitObj);
            //Place X on hitzone
            this.placeAt("X", u, v);
            return true;
        }else{
            if(hitObj === "X")
                return false;
            
            this.placeAt("O", u, v);
            return false;
        }
    }
    emitOnHit(ship){
        console.log('ship emitted : ' + ship.constructor.name)
        this.hitEvent.emit(ship);
    }
    receiveOnSunk(ship){
        console.log(`${ship.name} has been sunk !`);
        this.sunkenShips += 1;
        if(this.sunkenShips > this.ships.length)
            this.emitGameOver();
    }
    emitGameOver(){
        console.log('Emitted from emitGameOver');
        this.gameOverEvent.emit();
    };
}