import GameBoard, { checkForCoordinatesCollisions, checkForHit, getArrayOfCoordinates, getBiggestCoordinates, getCoordinatesForm, getDifferenceFromCoordinates, getNonZeroFromDiff, outOfBondsCheck, positionShipOnBoard, subtractFromCoordinates } from "../../gameBoard";
import Submarine from "../../Ships/submarine";
import { coordinatesPrompt, coordinatesChecker, isLine, lengthCheck } from "../../gameBoard";
import { zeros } from "mathjs";
import GameBoardUtils from "../../gameBoardUtils";

jest.mock("../../Ships/submarine");

const gameboard = new GameBoard();

describe('init', ()=>{
    it('has board', ()=>expect(gameboard).toBeTruthy());
    it('has a storage for ships', ()=>expect(gameboard.ships).toBeTruthy());
    test('ships length === 0', ()=>expect(gameboard.ships.length).toBe(0));
})

describe('Add ship to storage', ()=>{
    test('ship is added correctly', ()=>{
        gameboard.addShipToStorage(new Submarine());
        expect(gameboard.ships.length).toBe(1);
    })
    test('Only ship are allowed', ()=>{
        expect(gameboard.ships[0]).toBeInstanceOf(Submarine)
    })
})

describe('getBoard, getShipAt', ()=>{
    test('getBoard gives a zeros matrix 10x10', ()=>{
        expect(gameboard.getBoard()).toEqual(zeros([10,10]))
    })
    test('getShipAt returns 0 if no ship', () => {
        expect(gameboard.getShipAt(0,0)).toBe(0);
    })
    const gameBoardWithShip = new GameBoard();
    gameBoardWithShip.board[0][0] = new Submarine();
    test('getBoard returns a non zeros matrix is ships are present', () => expect(gameBoardWithShip.getBoard()).not.toEqual(zeros([10,10])))
    test('getShipAt return ship object correctly', ()=>{
        expect(gameBoardWithShip.getShipAt(0,0)).toBeInstanceOf(Submarine)
    })
})

describe('coordinatesPrompt()', () => {
    global.prompt = jest.fn().mockReturnValueOnce('1,1,1,2')
    .mockReturnValueOnce('9,0,10,0');
    expect(GameBoardUtils.coordinatesPrompt(new Submarine())).toBe('1,1,1,2');
    expect(GameBoardUtils.coordinatesPrompt(new Submarine())).toBe('9,0,10,0');

    delete global.prompt;
});

describe('coordinatesChecker()', () => {
    expect(GameBoardUtils.coordinatesChecker('1,1,1,2')).toBeTruthy();
    expect(GameBoardUtils.coordinatesChecker('1,1,4,2,4')).toBeFalsy();
    expect(GameBoardUtils.coordinatesChecker('')).toBeFalsy();
    expect(GameBoardUtils.coordinatesChecker('9,0,10,0')).toBeFalsy();
})
describe('isLine()', ()=>{
    expect(GameBoardUtils.isLine([0,2])).toBeTruthy();
    expect(GameBoardUtils.isLine([1,2])).toBeFalsy();
    expect(GameBoardUtils.isLine([0,-1])).toBeTruthy();
})
describe('lengthCheck()', ()=>{
    expect(GameBoardUtils.lengthCheck([0,2], 2)).toBeFalsy();
    expect(GameBoardUtils.lengthCheck([0,1], 2)).toBeTruthy();
    expect(GameBoardUtils.lengthCheck([0,1], 3)).toBeFalsy();
    expect(GameBoardUtils.lengthCheck([0,2], 3)).toBeTruthy();
})
describe('getCoordinatesForm()', ()=>{
    test('Type check', ()=>{
        expect(GameBoardUtils.getCoordinatesForm(1,1,1,2)[0][0] + 1).toBe(2);
        expect(GameBoardUtils.getCoordinatesForm(1,1,1,2)[0][0] + 0).not.toBe("10");
    })
    expect(GameBoardUtils.getCoordinatesForm(1,1,1,2)).toEqual([[1,1],[1,2]]);
    expect(GameBoardUtils.getCoordinatesForm(6,2,2,4)).toEqual([[6,2],[2,4]]);
})
describe('getDifferenceFromCoordinates()', ()=>{
    expect(GameBoardUtils.getDifferenceFromCoordinates([1,1], [1,2])).toEqual([0, -1]);
    expect(GameBoardUtils.getDifferenceFromCoordinates([4,6], [1,0])).toEqual([3, 6]);
    expect(GameBoardUtils.getDifferenceFromCoordinates([9,0], [10,0])).toEqual([-1, 0]);
})
describe('getNonZeroFromDiff()', ()=>{
    expect(GameBoardUtils.getNonZeroFromDiff([0,2])).toBe(1);
})
describe('getBiggestCoordinates()', ()=>{
    expect(GameBoardUtils.getBiggestCoordinates([0,2], [0,9])).toEqual([0,9]);
    expect(GameBoardUtils.getBiggestCoordinates([2,0], [0,0])).toEqual([2,0]);
    expect(GameBoardUtils.getBiggestCoordinates([0,-6], [0,5])).toEqual([0,-6]);
})
describe('outOfBondsCheck()', ()=>{
    expect(GameBoardUtils.outOfBondsCheck(1, 2, 3, 4)).toBeTruthy();
    expect(GameBoardUtils.outOfBondsCheck(1, 1, 1, 2)).toBeTruthy();
    expect(GameBoardUtils.outOfBondsCheck(11,1,1,1)).toBeFalsy();
    expect(GameBoardUtils.outOfBondsCheck(9,0,10,0)).toBeFalsy();
})


describe('subtractFromCoordinates()', ()=>{
    expect(GameBoardUtils.subtractFromCoordinates([0,5], 1)).toEqual([0,4]);
    expect(GameBoardUtils.subtractFromCoordinates([5,5], 1)).toEqual([5,4]);
})
describe('getArrayOfCoordinates()', ()=>{
    expect(GameBoardUtils.getArrayOfCoordinates([5,5], 2, 1)).toEqual([[5,5], [5,4]])
    expect(GameBoardUtils.getArrayOfCoordinates([6,3], 3, 0)).toEqual([[6,3], [5,3], [4,3]])
    expect(GameBoardUtils.getArrayOfCoordinates([1,6], 2, 1)).toEqual([[1,6], [1,5]])
    expect(GameBoardUtils.getArrayOfCoordinates([9,2], 3, 0)).toEqual([[9,2], [8,2], [7,2]])
})

describe('checkForCoordinatesCollisions()', ()=>{
    const gameBoardTestCollisions = new GameBoard();
    gameBoardTestCollisions.placeAt(new Submarine(), 0, 0);
    expect(GameBoardUtils.checkForCoordinatesCollisions(gameBoardTestCollisions, [[0,0]])).toBeFalsy();
    expect(GameBoardUtils.checkForCoordinatesCollisions(gameBoardTestCollisions, [[0,1]])).toBeTruthy();
    expect(GameBoardUtils.checkForCoordinatesCollisions(gameBoardTestCollisions, [[0,0], [1,0]])).toBeFalsy();
    expect(GameBoardUtils.checkForCoordinatesCollisions(gameBoardTestCollisions, [[1,1], [1,2]])).toBeTruthy();
})

describe('positionShipOnBoard()', ()=>{
    const gameboardPosition = new GameBoard();
    GameBoardUtils.positionShipOnBoard(gameboardPosition.getBoard(), new Submarine(), [[0,1], [0,2]]);
    expect(gameboardPosition.getShipAt(0, 1)).toBeInstanceOf(Submarine);
    expect(gameboardPosition.getShipAt(0, 2)).toBeInstanceOf(Submarine);
})

describe('checkForHit()', ()=>{
    const gameboardCheckHit = new GameBoard();
    gameboardCheckHit.placeAt(new Submarine(), 0, 0);
    gameboardCheckHit.placeAt(new Submarine(), 9, 9);
    gameboardCheckHit.placeAt(new Submarine(), 4, 5);
    it('should return true if ship is returned, else false', ()=>{
        expect(GameBoardUtils.checkForHit(gameboardCheckHit, 0, 0)).toBeTruthy();
        expect(GameBoardUtils.checkForHit(gameboardCheckHit, 9, 9)).toBeTruthy();
        expect(GameBoardUtils.checkForHit(gameboardCheckHit, 4, 5)).toBeTruthy();
        expect(GameBoardUtils.checkForHit(gameboardCheckHit, 7, 5)).toBeFalsy();
        expect(GameBoardUtils.checkForHit(gameboardCheckHit, 4, 6)).toBeFalsy();
    })
})