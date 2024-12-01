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
        this.hitEvent.subscribe(ship => _hit(ship));
    }
    isSunk(){
        if(this.hits >= this.length){
            this.sunk = true;
            this.emitOnSunk();
            return true
        }
        return false;
    }
    emitOnSunk(){
        this.sunkEvent.emit(this);
    }
}

function _hit(ship){
    console.log(`${ship.name} has been hit !`);
    ship.hits += 1;
    ship.isSunk();
}