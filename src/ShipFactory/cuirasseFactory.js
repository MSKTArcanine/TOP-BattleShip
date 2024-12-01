import Cuirasse from "../Ships/cuirasse";
import Factory from "./factory";

export default class CuirasseFactory extends Factory{
    constructor(sunkEvent, hitEvent, maxInstance = 1){
        super(maxInstance, sunkEvent, hitEvent);
    }
    create(){
        if(this.maxInstance > 0){
            this.maxInstance -= 1;
            return new Cuirasse(this.sunkEvent, this.hitEvent);
        }else{
            throw new Error('Maximum instances reached.')
        }
    }
}