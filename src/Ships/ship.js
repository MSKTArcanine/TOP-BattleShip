export default class Ship {
    constructor(){
        if(new.target === Ship)throw new Error('Implementation');
        this.length;
        this.sunk = false;
        this.hits = 0; 
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

