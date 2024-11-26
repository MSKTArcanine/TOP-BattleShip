import Torpilleur from "../Ships/torpilleur";
import Factory from "./factory";

export default class TorpilleurFactory extends Factory{
    constructor(maxInstance = 3){
        super(maxInstance);
    }
    create(){
        if(this.maxInstance > 0){
            this.maxInstance -= 1;
            return new Torpilleur();
        }else{
            throw new Error('Maximum instances reached.')
        }
    }
}