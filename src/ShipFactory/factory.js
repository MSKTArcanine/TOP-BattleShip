export default class Factory{
    constructor(maxInstance = 0, sunkEvent, hitEvent){
        if(new.target === Factory) throw new Error('Implementation');
        this.sunkEvent = sunkEvent;
        this.hitEvent = hitEvent;
        this.maxInstance = maxInstance;
    }
    create(){throw new Error('implement')}
}