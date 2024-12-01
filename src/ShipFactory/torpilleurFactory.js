import Torpilleur from "../Ships/torpilleur";
import Factory from "./factory";

export default class TorpilleurFactory extends Factory{
    constructor(sunkEvent, hitEvent, maxInstance = 3){
        super(maxInstance, sunkEvent, hitEvent);
    }
    create(){
        if(this.maxInstance > 0){
            this.maxInstance -= 1;
            return new Torpilleur(this.sunkEvent, this.hitEvent);
        }else{
            throw new Error('Maximum instances reached.')
        }
    }
}