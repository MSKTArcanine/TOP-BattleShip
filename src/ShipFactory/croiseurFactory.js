import Croiseur from "../Ships/croiseur";
import Factory from "./factory";

export default class CroiseurFactory extends Factory{
    constructor(sunkEvent, hitEvent, maxInstance = 2){
        super(maxInstance, sunkEvent, hitEvent);
    }
    create(){
        if(this.maxInstance > 0){
            this.maxInstance -= 1;
            return new Croiseur(this.sunkEvent, this.hitEvent);
        }else{
            throw new Error('Maximum instances reached.')
        }
    }
}