import Ship from "./ship";

export default class Submarine extends Ship {
    _count = 0;
    constructor(){
        super();
        this.length = 2;
    }
}