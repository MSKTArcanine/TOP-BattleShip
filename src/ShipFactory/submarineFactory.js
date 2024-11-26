import Submarine from "../Ships/submarine";
import Factory from "./factory";

export default class SubmarineFactory extends Factory{
    constructor(maxInstance = 4){
        super(maxInstance);
    }
    create(){
        if(this.maxInstance > 0){
            this.maxInstance -= 1;
            return new Submarine();
        }else{
            throw new Error('Maximum instances reached.')
        }
    }
}