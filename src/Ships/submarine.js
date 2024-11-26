import Ship from "./ship";

export default class Submarine extends Ship {
    constructor(){
        super();
        this.length = 2;
        this.name = "submarine";
    }
}