import { updatePlayerTurn, resetCounter, raiseCounter, counter, cards } from "./script.js";
import { gameOver } from "./scoreboard.js";
import { Player } from "./Player.js";
let firstCard;
let secondCard;
class Card {
    constructor(value) {
        this.value = value;
        this.removed = false;
        this.flipStatus = false;
        //Creating the card element
        const cardMuster = document.getElementsByClassName("card")[0];
        const newCard = cardMuster.cloneNode(true);
        const pText = newCard.getElementsByClassName("value")[0];
        pText.textContent = this.value;
        newCard.classList.remove("muster");
        //Using arrow function for the event listener, otherwise it does not retain 'this'
        newCard.addEventListener("click", () => this.flipCard());
        newCard.addEventListener("click", () => this.checkIfSame());
        this.html = newCard;
        const cardsContainer = document.getElementById("cards-container");
        cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.appendChild(this.html);
    }
    flipCard() {
        if (this.flipStatus) {
            this.html.classList.replace("faceup", "facedown");
            this.flipStatus = false;
        }
        else {
            this.html.classList.replace("facedown", "faceup");
            this.flipStatus = true;
        }
    }
    removeCard() {
        this.html.classList.add("hidden");
        this.removed = true;
    }
    checkIfSame() {
        raiseCounter();
        //Saving the card object in the cards variables to compare them
        if (!firstCard) {
            firstCard = this;
            firstCard.html.classList.add("unclickable");
        }
        else {
            secondCard = this;
        }
        this.compareCards();
    }
    compareCards() {
        if (counter === 2) {
            //To make the other cards unclickable while other two are being compared
            for (let i = 0; i < cards.length; i++) {
                cards[i].html.classList.add("unclickable");
            }
            //Small delay to enable the user to see the cards
            setTimeout(() => {
                const firstCardValue = firstCard === null || firstCard === void 0 ? void 0 : firstCard.html.getElementsByClassName("value")[0].textContent;
                const secondCardValue = secondCard === null || secondCard === void 0 ? void 0 : secondCard.html.getElementsByClassName("value")[0].textContent;
                //Check if the cards have the same value
                if (firstCardValue === secondCardValue) {
                    firstCard === null || firstCard === void 0 ? void 0 : firstCard.removeCard();
                    secondCard === null || secondCard === void 0 ? void 0 : secondCard.removeCard();
                    let playerPlaying = Player.checkWhichPlayerPlays();
                    playerPlaying === null || playerPlaying === void 0 ? void 0 : playerPlaying.gainPoint();
                }
                else {
                    firstCard === null || firstCard === void 0 ? void 0 : firstCard.flipCard();
                    secondCard === null || secondCard === void 0 ? void 0 : secondCard.flipCard();
                    Player.changePlayerTurn();
                    updatePlayerTurn();
                }
                resetCounter();
                firstCard = undefined;
                secondCard = undefined;
                //To make the other cards clickable again
                for (let i = 0; i < cards.length; i++) {
                    cards[i].html.classList.remove("unclickable");
                }
                gameOver();
            }, 1500);
        }
    }
}
export { Card };
