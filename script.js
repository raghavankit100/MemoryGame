const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let Attempts=0;
let tried= document.querySelector(".attempt")
let ResetButton= document.querySelector(".reset")

function resetAll(){
  Attempts = 0;
  tried.innerText = `Attempts: ${Attempts}`;

  // Unflip all cards
  cards.forEach(card => {card.classList.remove('flip'); card.lockBoard=false; card.addEventListener('click', flipCard); });
}

ResetButton.addEventListener('click',resetAll);

function flipCard() {
  Attempts++;
  tried.innerText= `Attempts: ${Attempts}`;
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}


cards.forEach(card => card.addEventListener('click', flipCard));

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

