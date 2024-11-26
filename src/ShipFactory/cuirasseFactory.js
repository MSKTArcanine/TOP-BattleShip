import Cuirasse from "../Ships/cuirasse";
import Factory from "./factory";

export default class CuirasseFactory extends Factory{
    constructor(maxInstance = 1){
        super(maxInstance);
    }
    create(){
        if(this.maxInstance > 0){
            this.maxInstance -= 1;
            return new Cuirasse();
        }else{
            throw new Error('Maximum instances reached.')
        }
    }
}