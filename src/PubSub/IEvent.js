export default class IEvent {
    constructor(){
        if(new.target === IEvent) throw new Error('Implementation')
            this.callback;
    }

    subscribe(callback){
        this.callback = callback;
    }

    unsub(){
        this.callback = null;
    }

    emit(obj){
        this.callback(obj);
    }
}