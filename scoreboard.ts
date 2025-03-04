import { cards, players } from "./script.js";
import { Player } from "./Player.js";

let hasGameEnded: boolean = false;

function gameOver()
{
    //Checking how many cards have been removed
    let cardsRemoved: number = 0;
    for (let i = 0; i < cards.length; i++)
    {
        let isCardRemoved = cards[i].removed;
        if (isCardRemoved)
        {
            cardsRemoved++;
        }
    }

    //Checking if all cards have been removed
    if (cardsRemoved === cards.length)
    {
        hasGameEnded = true;
        winningScreen();
    }
}

function winningScreen()
{
    const cardsContainer = document.getElementById("cards-container");
    const scores = document.getElementById("scores");
    const playerTurnHtml = document.getElementById("playerTurn") as Element;
    playerTurnHtml.textContent = "";
    const winningPhrase = document.createElement("h1");
    const endScores = document.createElement("h1");
    endScores.textContent = `Player 1 score: ${players[0].score} - Player 2 score: ${players[1].score}`;

    const winningPlayer = Player.winningPlayer();
    if (winningPlayer === players[0])
    {
        winningPhrase.textContent = "Player 1 won!!!";
    }
    else
    {
        winningPhrase.textContent = "Player 2 won!!!";
    }

    cardsContainer?.replaceChildren(winningPhrase);
    scores?.appendChild(endScores);
}


export {gameOver};
