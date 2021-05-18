const cards = document.querySelectorAll('.card');
shuffle();
let flippedCard = false;
let firstCard, secondCard;
let lockTable = false;

function flipCard() {
    if(lockTable) return;
    if(this===firstCard) return;

  this.classList.add('flip');

  if (!flippedCard){
      //first click
      flippedCard=true;
      firstCard = this;
  }else{
      //second click
      secondCard=this;
      checkMatch();
  }
}

function checkMatch(){
    if(firstCard.dataset.space===secondCard.dataset.space){
        //match
        disableCards();
    }else{
        //not a match
        unflipCards();
       
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetTable();
}

function unflipCards() {
    lockTable = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetTable();
    }, 1500);
  }

function resetTable() {
    flippedCard = false;
    lockTable = false;
    firstCard = null;
    secondCard = null;
  }

  function shuffle() {
    cards.forEach(card => {
      let rndPosition = Math.floor(Math.random() * 12);
      card.style.order = rndPosition;
    });
  }

  
cards.forEach(card => card.addEventListener('click', flipCard));