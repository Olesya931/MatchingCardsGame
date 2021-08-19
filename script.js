const cards = document.querySelectorAll('.card');
const startBtn = document.querySelector('.start-btn');
const time = document.querySelector('.time');
const score = document.querySelector('.score');

let flippedCard = false;
let firstCard, secondCard;
let lockTable = false;
let newGame = true;
let scoreCounter = 0;

let intervalId;

startBtn.addEventListener('click',()=>{
 
  if (newGame){
    startGame();
  } else{
    let result = confirm('Хотите начать новую игру?');
    if (result) {
      clearInterval(intervalId);
      scoreCounter = 0;
      score.innerHTML = scoreCounter;
      startGame();
    }
  }

})

function startGame(){
    shuffle();
    cards.forEach(card => card.classList.add('flip'));
    cards.forEach(card => card.addEventListener('click', flipCard));

    setTimeout(() => {
      cards.forEach(card => card.classList.remove('flip'));
    }, 1500);  
    newGame = false;
    timeCounter();
}

function timeCounter(){
  let sec = 0;
  let min = 0;
  let SS;
  let MM;

    intervalId = setInterval(()=>{
    sec++;
    if (sec==60){
      sec = 0;
      min++;
    }

    if (sec<10){
      SS = '0' + sec;
    } else{
      SS = sec;
    }

    if (min<10){
      MM = '0' + min;
    } else{
      MM = min;
    }

    time.innerHTML = MM + ":" + SS;
  },1000)

}

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
        scoreCounter++;
        score.innerHTML = scoreCounter;
        disableCards();
        if (scoreCounter===6){
          alert('Поздравляю! Вы выиграли');
          clearInterval(intervalId);
        }
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

  