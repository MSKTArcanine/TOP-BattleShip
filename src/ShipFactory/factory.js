export default class Factory{
    constructor(maxInstance = 0){
        if(new.target === Factory) throw new Error('Implementation');
        this.maxInstance = maxInstance;
    }
    create(){throw new Error('implement')}
}