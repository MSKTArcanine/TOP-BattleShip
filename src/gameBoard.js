import { zeros } from "mathjs";
import { subtract } from "mathjs";
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
                let coordinates;
                let coo1, coo2, difference, nonZeroIndex, coordinateToChange;
                let arrayOfCoordinates = [];
                while(true){
                    coordinates = coordinatesPrompt(ship);
                    const [u1, v1, u2, v2] = coordinates.split(',');
                    if(coordinatesChecker(coordinates)){
                        [coo1, coo2] = getCoordinatesForm(u1, v1, u2, v2);
                        difference = getDifferenceFromCoordinates(coo1, coo2);
                        if(isLine(difference)){
                            if(lengthCheck(difference, ship.length)){
                                if(outOfBondsCheck(u1, u2, v1, v2)){
                                    nonZeroIndex = getNonZeroFromDiff(difference);
                                    coordinateToChange = getBiggestCoordinates(coo1, coo2);
                                    arrayOfCoordinates = getArrayOfCoordinates(coordinateToChange, ship.length, nonZeroIndex);
                                    if(checkForCoordinatesCollisions(this, arrayOfCoordinates)){
                                        positionShipOnBoard(this.board, ship, arrayOfCoordinates)
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
        this.isShipsPlaced = true;
    }
}

export function coordinatesPrompt({name, length}){
    return prompt(`${name} = ${length} length : U1, V1, U2, V2`);
}
export function coordinatesChecker(coordinates){
    return new RegExp(/^[0-9],[0-9],[0-9],[0-9]$/).test(coordinates);
}
export function outOfBondsCheck(u1, v1, u2, v2){
    for(let i of [u1, v1, u2, v2]){
        if(i >= 10 || i < 0)
            return false;
    }
    return true;
}
export function getCoordinatesForm(u1, v1, u2, v2){
    return [[+u1, +v1], [+u2, +v2]];
}
export function getDifferenceFromCoordinates(coo1, coo2){
    return subtract(coo1, coo2);
}
export function isLine(difference){
    return difference.includes(0);
}
export function lengthCheck(difference, length){
    return Math.abs(difference.reduce((acc, cur)=> acc + cur, 0)) === length - 1;
}
export function getNonZeroFromDiff(difference){
    return difference[0] === 0 ? 1 : 0;
}
export function getBiggestCoordinates(coo1, coo2){
    return Math.abs(coo1[getNonZeroFromDiff(coo1)]) > Math.abs(coo2[getNonZeroFromDiff(coo2)]) ? coo1 : coo2;
}
export function subtractFromCoordinates(coordinates, nonZeroIndex){
    return nonZeroIndex === 0 ? [coordinates[0] - 1, coordinates[1]] : [coordinates[0], coordinates[1] - 1];
}
export function getArrayOfCoordinates(maxCoo, length, nonZeroIndex){
    const arr = [maxCoo];
    while(length - 1){
        maxCoo = subtractFromCoordinates(maxCoo, nonZeroIndex)
        arr.push(maxCoo);
        length -= 1;
    }
    return arr;
}
export function positionShipOnBoard(board, ship, arrayOfCoordinates){
    arrayOfCoordinates.forEach(
        coordinates => {
            board[coordinates[0]][coordinates[1]] = ship;
        }
    )
}
export function checkForCoordinatesCollisions(gameboard, arrayOfCoordinates){
    for(let coordinates of arrayOfCoordinates){
        if(gameboard.getShipAt(coordinates[0], coordinates[1]) != 0){
            return false;}
        }
        return true;
    }