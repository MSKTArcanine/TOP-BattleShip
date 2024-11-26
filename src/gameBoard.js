import { zeros } from "mathjs";
import { subtract } from "mathjs";
export default class GameBoard{
    constructor(){
        this.board = zeros([10, 10]);
        this.ships = [];
        this.isShipsPlaced = false;
    }
    
    addShipToStorage(ship){
        this.ships.push(ship);
    }
    
    placeShipOnBoard(){
        this.ships.forEach(
            ship => {
                let coordinates;
                let coo1, coo2, difference, nonZeroIndex;
                while(true){
                    coordinates = coordinatesPrompt(ship);
                    const [u1, v1, u2, v2] = coordinates.split(',');
                    if(coordinatesChecker(coordinates)){
                        [coo1, coo2] = getCoordinatesForm(u1, v1, u2, v2);
                        difference = getDifferenceFromCoordinates(coo1, coo2);
                        if(isLine(difference)){
                            if(lengthCheck(difference, ship.length)){
                                if(outOfBondsCheck(u1, u2, v1, v2)){
                                break
                            }
                            }
                        }
                    }
                }
                nonZeroIndex = getNonZeroFromDiff(difference);


                    // let check = false;
                    // let uStart, uEnd, vStart, vEnd;
                    // let depart;
                    // while(!check){
                    //     [uStart, vStart, uEnd, vEnd] = prompt(`${ship.name} : length = ${ship.length}. Format : uStart, vStar, uEnd, vEnd`).split(",");
                    //     const diff = subtract([uStart, vStart], [uEnd, vEnd]);
                    //     const movingIndex = (diff[0] != 0) ? 0 : 1;
                    //     if(diff.includes(0) && Math.abs(diff.reduce((acc, cur)=>acc + cur, 0)) === ship.length - 1){
                    //         console.log("pass");
                    //         for(let i = 0; i < ship.length; i++){
                    //             if(diff.reduce < 0){
                    //                 depart = [uStart, vStart];
                    //             }else{
                    //                 depart = [uEnd, vEnd];
                    //             }
                    //             let count = 0;
                    //             while(count <= ship.length){
                    //                 if(movingIndex === 0){
                    //                     this.board[depart[0] + count][depart[1]] = { ship };
                    //                 }else{
                    //                     this.board[depart[0]][depart[1] + count] = { ship };
                    //                 }
                    //             }
                    //         }
                    //         check = true;
                    //         console.log('true', true)
                    //     }else{
                    //         console.log('fail');
                    //     }
                    // }
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
        return [[u1, v1], [u2, v2]];
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