import GameBoard, { getArrayOfCoordinates, getBiggestCoordinates, getCoordinatesForm, getDifferenceFromCoordinates, getNonZeroFromDiff, outOfBondsCheck, subtractFromCoordinates } from "../../gameBoard";
import Submarine from "../../Ships/submarine";
import { coordinatesPrompt, coordinatesChecker, isLine, lengthCheck } from "../../gameBoard";

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

describe('coordinatesPrompt()', () => {
    global.prompt = jest.fn().mockReturnValueOnce('1,1,1,2')
    .mockReturnValueOnce('9,0,10,0');
    expect(coordinatesPrompt(new Submarine())).toBe('1,1,1,2');
    expect(coordinatesPrompt(new Submarine())).toBe('9,0,10,0');
});

describe('coordinatesChecker()', () => {
    expect(coordinatesChecker('1,1,1,2')).toBeTruthy();
    expect(coordinatesChecker('1,1,4,2,4')).toBeFalsy();
    expect(coordinatesChecker('')).toBeFalsy();
    expect(coordinatesChecker('9,0,10,0')).toBeFalsy();
})
describe('isLine()', ()=>{
    expect(isLine([0,2])).toBeTruthy();
    expect(isLine([1,2])).toBeFalsy();
    expect(isLine([0,-1])).toBeTruthy();
})
describe('lengthCheck()', ()=>{
    expect(lengthCheck([0,2], 2)).toBeFalsy();
    expect(lengthCheck([0,1], 2)).toBeTruthy();
    expect(lengthCheck([0,1], 3)).toBeFalsy();
    expect(lengthCheck([0,2], 3)).toBeTruthy();
})
describe('getCoordinatesForm()', ()=>{
    expect(getCoordinatesForm(1,1,1,2)).toEqual([[1,1],[1,2]]);
    expect(getCoordinatesForm(6,2,2,4)).toEqual([[6,2],[2,4]]);
})
describe('getDifferenceFromCoordinates()', ()=>{
    expect(getDifferenceFromCoordinates([1,1], [1,2])).toEqual([0, -1]);
    expect(getDifferenceFromCoordinates([4,6], [1,0])).toEqual([3, 6]);
    expect(getDifferenceFromCoordinates([9,0], [10,0])).toEqual([-1, 0]);
})
describe('getNonZeroFromDiff()', ()=>{
    expect(getNonZeroFromDiff([0,2])).toBe(1);
})
describe('getBiggestCoordinates()', ()=>{
    expect(getBiggestCoordinates([0,2], [0,9])).toEqual([0,9]);
    expect(getBiggestCoordinates([2,0], [0,0])).toEqual([2,0]);
    expect(getBiggestCoordinates([0,-6], [0,5])).toEqual([0,-6]);
})
describe('outOfBondsCheck()', ()=>{
    expect(outOfBondsCheck(1, 2, 3, 4)).toBeTruthy();
    expect(outOfBondsCheck(1, 1, 1, 2)).toBeTruthy();
    expect(outOfBondsCheck(11,1,1,1)).toBeFalsy();
    expect(outOfBondsCheck(9,0,10,0)).toBeFalsy();
})


describe('subtractFromCoordinates()', ()=>{
    expect(subtractFromCoordinates([0,5], 1)).toEqual([0,4]);
    expect(subtractFromCoordinates([5,5], 1)).toEqual([5,4]);
})
describe('getArrayOfCoordinates()', ()=>{
    expect(getArrayOfCoordinates([5,5], 2, 1)).toEqual([[5,5], [5,4]])
    expect(getArrayOfCoordinates([6,3], 3, 0)).toEqual([[6,3], [5,3], [4,3]])
    expect(getArrayOfCoordinates([1,6], 2, 1)).toEqual([[1,6], [1,5]])
    expect(getArrayOfCoordinates([9,2], 3, 0)).toEqual([[9,2], [8,2], [7,2]])
})