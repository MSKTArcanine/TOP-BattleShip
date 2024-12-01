import Ship from "./ship.js";

export default class Cuirasse extends Ship{
    constructor(sunk, hit){
        super(sunk, hit);
        this.length = 5;
    }
}