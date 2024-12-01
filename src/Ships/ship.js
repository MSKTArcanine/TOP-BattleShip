export default class Ship {
    _shipTotal = 0;
    constructor(sunkEvent, hitEvent){
        if(new.target === Ship)throw new Error('Implementation');
        this.length;
        this.sunk = false;
        this.hits = 0;
        this._shipTotal += 1;
        this.id = this._shipTotal;
        this.name = `${this.constructor.name}`
        this.sunkEvent = sunkEvent;
        this.hitEvent = hitEvent;
    }

    hit(){
        this.hits += 1;
    }
    isSunk(){
        if(this.hits >= this.length)
            {this.sunk = true; return true}
        return false;
    }
}

