import Ship from "./ship";

export default class Croiseur extends Ship{
    constructor(sunk, hit){
        super(sunk, hit);
        this.length = 4;
    }
}