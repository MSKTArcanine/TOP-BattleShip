import createGameBoard from "./createGameBoard";
import GameOverEvent from "./PubSub/GameOverEvent";

export default class GameLogic{
    constructor(){
        this.gameOver = false;
        this.gameOverEvent = new GameOverEvent();
        this.gameOverEvent.subscribe(() => this.receiveGameOver());
        [this.user1, this.user2] = createGameBoard(this.gameOverEvent);
    }
    receiveGameOver(){
        console.log('RECEIVED GAME OVER SIGNAL')
        this.gameOver = true;
    }

    gameLoop(){
        while(true){
            console.log("User1 to play");
            const [u1, v1] = prompt('u,v').split(',');
            this.user2.receiveAttack(u1, v1);
            console.log('user 2 got attacked');
            if(this.gameOver)
                break;
            console.log("User2 to play");
            const [u2, v2] = prompt('u,v').split(',');
            this.user1.receiveAttack(u2, v2);
            if(this.gameOver)
                break;
        }
    }
}