import Ship from "./ship.js";

export default class Torpilleur extends Ship{
    constructor(sunk, hit){
        super(sunk, hit);
        this.length = 3;
    }
}