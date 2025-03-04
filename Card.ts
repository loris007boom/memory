import { updatePlayerTurn, resetCounter, raiseCounter, counter, cards } from "./script.js";
import { gameOver } from "./scoreboard.js";
import { Player } from "./Player.js";

interface Cards{
    html: Element;
    value: string;
    removed: boolean;
    flipStatus: boolean;

    flipCard: () => void;
    removeCard: () => void;
    checkIfSame: () => void;
}

let firstCard: Card | undefined;
let secondCard: Card | undefined;

class Card implements Cards{
    value: string;
    removed: boolean;
    flipStatus: boolean;
    html: Element;

    constructor(value: string)
    {
        this.value = value;
        this.removed = false;
        this. flipStatus =  false;

        //Creating the card element
        const cardMuster: Element = document.getElementsByClassName("card")[0];
        const newCard = cardMuster.cloneNode(true) as Element;
        const pText: Element = newCard.getElementsByClassName("value")[0];
        pText.textContent = this.value;
        newCard.classList.remove("muster");

        //Using arrow function for the event listener, otherwise it does not retain 'this'
        newCard.addEventListener("click", () => this.flipCard());
        newCard.addEventListener("click", () => this.checkIfSame());
        this.html = newCard;

        const cardsContainer = document.getElementById("cards-container");
        cardsContainer?.appendChild(this.html);
    }

    flipCard(): void
    {
        if (this.flipStatus)
        {
            this.html.classList.replace("faceup", "facedown");
            this.flipStatus = false;
        }
        else
        {
            this.html.classList.replace("facedown", "faceup");
            this.flipStatus = true;
        }
    }

    removeCard(): void
    {
        this.html.classList.add("hidden");
        this.removed = true;
    }

    checkIfSame(): void
    {
        raiseCounter();
        //Saving the card object in the cards variables to compare them
        if (!firstCard)
        {
            firstCard = this;
            firstCard.html.classList.add("unclickable");
        }
        else
        {
            secondCard = this;
        }

        this.compareCards();
    }

    compareCards(): void
    {
        if (counter === 2)
            {
                //To make the other cards unclickable while other two are being compared
                for (let i = 0; i < cards.length; i++)
                {
                    cards[i].html.classList.add("unclickable");
                }

                //Small delay to enable the user to see the cards
                setTimeout(() => {
                    const firstCardValue = firstCard?.html.getElementsByClassName("value")[0].textContent;
                    const secondCardValue = secondCard?.html.getElementsByClassName("value")[0].textContent;
                    //Check if the cards have the same value
                    if (firstCardValue === secondCardValue)
                    {
                        firstCard?.removeCard();
                        secondCard?.removeCard();
                        let playerPlaying = Player.checkWhichPlayerPlays();
                        playerPlaying?.gainPoint();
                    }
                    else
                    {
                        firstCard?.flipCard();
                        secondCard?.flipCard();
                        Player.changePlayerTurn();
                        updatePlayerTurn();
                    }
        
                    resetCounter();
                    firstCard = undefined;
                    secondCard = undefined;
                    //To make the other cards clickable again
                    for (let i = 0; i < cards.length; i++)
                    {
                        cards[i].html.classList.remove("unclickable");
                    }

                    gameOver();
                }, 1500);
            }
    }
}

export {Card};
