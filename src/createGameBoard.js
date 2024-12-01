// Config the game factories foreach ship types
// Create 2 users
// Create 1 board per user
// Ask users to place ships

import HitEvent from "./PubSub/HitEvent";
import SunkEvent from "./PubSub/SunkEvent";
import CroiseurFactory from "./ShipFactory/croiseurFactory";
import CuirasseFactory from "./ShipFactory/cuirasseFactory";
import SubmarineFactory from "./ShipFactory/submarineFactory";
import TorpilleurFactory from "./ShipFactory/torpilleurFactory";
import GameBoard from "./gameBoard";

export default function createGameBoard(gameOverEvent){
    const [MaxSubmarineInstaces, MaxTorpilleurInstaces, MaxCroiseurInstaces, MaxCuirasseInstaces] = createConfig();
    const [SunkEvent, HitEvent] = createEvents();
    const gameBoard1 = new GameBoard(SunkEvent, HitEvent, gameOverEvent);
    const gameBoard2 = new GameBoard(SunkEvent, HitEvent, gameOverEvent);
    const [submarineFactory1, torpilleurFactory1, croiseurFactory1, cuirasseFactory1] = createFactories(MaxSubmarineInstaces, MaxTorpilleurInstaces, MaxCroiseurInstaces, MaxCuirasseInstaces, SunkEvent, HitEvent);
    const Factories1 = [submarineFactory1, torpilleurFactory1, croiseurFactory1, cuirasseFactory1];
    const [submarineFactory2, torpilleurFactory2, croiseurFactory2, cuirasseFactory2] = createFactories(MaxSubmarineInstaces, MaxTorpilleurInstaces, MaxCroiseurInstaces, MaxCuirasseInstaces, SunkEvent, HitEvent);
    const Factories2 = [submarineFactory2, torpilleurFactory2, croiseurFactory2, cuirasseFactory2];
    
    addShipsToGameBoard(Factories1, gameBoard1);
    addShipsToGameBoard(Factories2, gameBoard2);
    return [gameBoard1, gameBoard2];
}

function createConfig(){
    return [
    checkPrompt(0,5, "How many submarines ? [0 - 5]"),
    checkPrompt(0,4, "How many torpilleurs ? [0 - 4]"),
    checkPrompt(0,3, "How many croiseurs ? [0 - 3]"),
    checkPrompt(0,2, "How many cuirasses ? [0 - 2]")]
}

function checkPrompt(min, max, prompted){
    let res;
    while(true){
        res = prompt(prompted);
        if(res >= min && res <= max)
        break;
    }
    return res;
}

function createEvents(){
    return [new SunkEvent(), new HitEvent()];
}

function createFactories(MaxS, MaxT, MaxCr, MaxCu, sunkEvent, hitEvent){
    return [
        new SubmarineFactory(sunkEvent, hitEvent, MaxS),
        new TorpilleurFactory(sunkEvent, hitEvent, MaxT),
        new CroiseurFactory(sunkEvent, hitEvent, MaxCr),
        new CuirasseFactory(sunkEvent, hitEvent, MaxCu),
    ]
}

function addShipsToGameBoard(factories, gameBoard){
    while(true){
        factories.forEach(factory => {
            while(factory.maxInstance > 0){
                gameBoard.addShipToStorage(factory.create())}
        })
        gameBoard.placeShipOnBoard();
        break;
    }
}