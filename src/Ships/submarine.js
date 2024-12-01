import Ship from "./ship";

export default class Submarine extends Ship {
    _count = 0;
    constructor(sunk, hit){
        super(sunk, hit);
        this.length = 2;
    }
}