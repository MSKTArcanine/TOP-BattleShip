import { subtract } from "mathjs";
export default class GameBoardUtils {
    static coordinatesPrompt({name, length}){
        return prompt(`${name} = ${length} length : U1, V1, U2, V2`);
    }
    static coordinatesChecker(coordinates){
        return new RegExp(/^[0-9],[0-9],[0-9],[0-9]$/).test(coordinates);
    }
    static outOfBondsCheck(u1, v1, u2, v2){
        for(let i of [u1, v1, u2, v2]){
            if(i >= 10 || i < 0)
                return false;
        }
        return true;
    }
    static getCoordinatesForm(u1, v1, u2, v2){
        return [[+u1, +v1], [+u2, +v2]];
    }
    static getDifferenceFromCoordinates(coo1, coo2){
        return subtract(coo1, coo2);
    }
    static isLine(difference){
        return difference.includes(0);
    }
    static lengthCheck(difference, length){
        return Math.abs(difference.reduce((acc, cur)=> acc + cur, 0)) === length - 1;
    }
    static getNonZeroFromDiff(difference){
        return difference[0] === 0 ? 1 : 0;
    }
    static getBiggestCoordinates(coo1, coo2){
        return Math.abs(coo1[this.getNonZeroFromDiff(coo1)]) > Math.abs(coo2[this.getNonZeroFromDiff(coo2)]) ? coo1 : coo2;
    }
    static subtractFromCoordinates(coordinates, nonZeroIndex){
        return nonZeroIndex === 0 ? [coordinates[0] - 1, coordinates[1]] : [coordinates[0], coordinates[1] - 1];
    }
    static getArrayOfCoordinates(maxCoo, length, nonZeroIndex){
        const arr = [maxCoo];
        while(length - 1){
            maxCoo = this.subtractFromCoordinates(maxCoo, nonZeroIndex)
            arr.push(maxCoo);
            length -= 1;
        }
        return arr;
    }
    static positionShipOnBoard(board, ship, arrayOfCoordinates){
        arrayOfCoordinates.forEach(
            coordinates => {
                console.log('ship placed : ' + ship.constructor.name + ' at : ' + coordinates);
                board[coordinates[0]][coordinates[1]] = ship;
            }
        )
    }
    static checkForCoordinatesCollisions(gameboard, arrayOfCoordinates){
        for(let coordinates of arrayOfCoordinates){
            if(gameboard.getShipAt(coordinates[0], coordinates[1]) != 0){
                return false;}
            }
            return true;
        }
    static checkForHit(gameboard, u, v){
        return gameboard.getShipAt(u,v);
    }
}