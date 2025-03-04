import {Card} from "./Card.js";
import { Player } from "./Player.js";

const symbols: string[] = ["X", "Y", "!", "?", "Z", "%", "A"];
let cards: Card[] = [];
const players: Player[] = [];

//Creating the cards array
for (let i = 0; i < symbols.length; i++)
{
    for (let j = 0; j < 2; j++)
    {
        let playingCard = new Card(symbols[i]);
        cards.push(playingCard);
    }
}

//Algorithm to randomly shuffle an array
function shuffleArray(array: Card[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(cards);

//Appending the cards to the website
for (let i = 0; i < cards.length; i++)
{
    const cardsContainer = document.getElementById("cards-container");
    let element = cards[i].html;
    cardsContainer?.appendChild(element);
}

//Creating the players array and choosing who starts
for (let i = 0; i < 2; i++)
{
    let player = new Player();
    players.push(player);
}

Player.chooseWhoStarts();


//Main Game handler
let counter: number = 0;

function raiseCounter(): void
{
    counter++;
}

function resetCounter(): void
{
    counter = 0;
}

function updatePlayerTurn(): void
{
    let playerTurnHtml = document.getElementById("playerTurn") as Element;
    let playerPlaying = Player.checkWhichPlayerPlays();
    
    if (playerPlaying === players[0])
    {
        playerTurnHtml.textContent = "Player 1 Turn";
    }
    else
    {
        playerTurnHtml.textContent = "Player 2 Turn";
    }
}

function restartGame()
{
    window.location.reload();
}

const buttonRestart = document.getElementById("refresh");
buttonRestart?.addEventListener("click", () => restartGame());

updatePlayerTurn();

export {updatePlayerTurn, resetCounter, raiseCounter, counter, cards, players};
