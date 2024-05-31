const cards = [
  "img/1.png",
  "img/2.png",
  "img/3.png",
  "img/4.png",
  "img/5.png",
  "img/6.png",
  "img/1.png",
  "img/2.png",
  "img/3.png",
  "img/4.png",
  "img/5.png",
  "img/6.png",
];
const game = document.querySelector(".game");
const attemps = document.querySelector(".attemps");
const guessed = document.querySelector(".guessed");
const animation = document.querySelector(".animation");
let attempscount = 0;
let guessedcount = 0;
let flipedCards = [];
let lockBoard = false;
const createCard = (value) => {
  const card = document.createElement("div");
  card.classList.add("card");
  const img = document.createElement("img");
  img.src = value;
  img.classList.add("hidden");
  card.appendChild(img);
  card.addEventListener("click", () => flipCard(card, img));
  return card;
};
const flipCard = (card, img) => {
  if (lockBoard) {
    return;
  }
  if (!card.classList.contains("flip") && flipedCards.length < 2) {
    img.classList.remove("hidden");
    card.classList.add("flip");
    flipedCards.push(card);
    if (flipedCards.length === 2) {
      const [card1, card2] = flipedCards;
      attempscount++;
      if (card1.firstChild.src === card2.firstChild.src) {
        card1.removeEventListener("click", flipCard);
        card2.removeEventListener("click", flipCard);
        flipedCards = [];
        guessedcount++;
        if (guessedcount === 6) {
          animation.style.display = "block";
        }
      } else {
        lockBoard = true;
        setTimeout(() => {
          card1.firstChild.classList.add("hidden");
          card2.firstChild.classList.add("hidden");
          card1.classList.remove("flip");
          card2.classList.remove("flip");
          flipedCards = [];
          lockBoard = false;
        }, 1000);
      }
      attemps.textContent = attempscount;
      guessed.textContent = guessedcount;
    }
  }
};
const createGame = () => {
  game.innerHTML = "";
  cards.sort(() => 0.5 - Math.random());
  cards.forEach((card) => {
    const element = createCard(card);
    game.appendChild(element);
  });
};
createGame();
