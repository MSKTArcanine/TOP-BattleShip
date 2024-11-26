import Croiseur from "../Ships/croiseur";
import Factory from "./factory";

export default class CroiseurFactory extends Factory{
    constructor(maxInstance = 2){
        super(maxInstance);
    }
    create(){
        if(this.maxInstance > 0){
            this.maxInstance -= 1;
            return new Croiseur();
        }else{
            throw new Error('Maximum instances reached.')
        }
    }
}