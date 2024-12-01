import Submarine from "../Ships/submarine";
import Factory from "./factory";

export default class SubmarineFactory extends Factory{
    constructor(sunkEvent, hitEvent, maxInstance = 4){
        super(maxInstance, sunkEvent, hitEvent);
    }
    create(){
        console.log("create called");
        if(this.maxInstance > 0){
            this.maxInstance -= 1;
            return new Submarine(this.sunkEvent, this.hitEvent);
        }else{
            throw new Error('Maximum instances reached.')
        }
    }
}