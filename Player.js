import { players } from "./script.js";
class Player {
    constructor() {
        this.ownTurn = false;
        this.score = 0;
    }
    static chooseWhoStarts() {
        const fiftyFifty = Math.floor(Math.random() * 2);
        if (fiftyFifty === 0) {
            players[0].ownTurn = true;
        }
        else {
            players[1].ownTurn = true;
        }
    }
    static changePlayerTurn() {
        for (let i = 0; i < players.length; i++) {
            if (players[i].ownTurn) {
                players[i].ownTurn = false;
            }
            else {
                players[i].ownTurn = true;
            }
        }
    }
    static checkWhichPlayerPlays() {
        for (let i = 0; i < players.length; i++) {
            if (players[0].ownTurn) {
                return players[0];
            }
            else {
                return players[1];
            }
        }
    }
    gainPoint() {
        this.score++;
    }
    static winningPlayer() {
        const firstPlayerScore = players[0].score;
        const secondPlayerScore = players[1].score;
        if (firstPlayerScore > secondPlayerScore) {
            return players[0];
        }
        return players[1];
    }
}
export { Player };
