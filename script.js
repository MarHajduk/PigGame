'use strict';

const playerName = document.getElementById(`name--1`);
const player = document.querySelectorAll(`.player`);
const dice = document.querySelector('.dice');
const score_0 = document.getElementById(`score--0`);
const score_1 = document.getElementById(`score--1`);
const current_0 = document.getElementById(`current--0`);
const current_1 = document.getElementById(`current--1`);
const winner = document.querySelector(`.winner`);
const main = document.querySelector(`main`);

let userName = `String`;
let computerScore = 0;
let userScore = 0;
let currentScore = 0;
let playerTurn = true;
let refresh;

const changePlayer = function () {
  player.forEach(plr => {
    if(plr.classList.contains(`player--active`)){
        plr.classList.remove(`player--active`);
    } else {
        plr.classList.add(`player--active`);
    };
  });
  if(playerTurn){
document.querySelector(`.btn--roll`).removeEventListener('click', diceRoll);
document.querySelector(`.btn--roll`).removeEventListener('click', takeScore);
document.querySelector(`.btn--hold`).removeEventListener('click', hold);} else{
  document.querySelector(`.btn--roll`).addEventListener('click', diceRoll);
  document.querySelector(`.btn--roll`).addEventListener('click', takeScore);
  document.querySelector(`.btn--hold`).addEventListener('click', hold);
}
};

let newGame = function(){
    computerScore = 0;
    userScore = 0;
    currentScore = 0;
    score_0.textContent = 0;
    score_1.textContent = 0;
    current_0.textContent = 0;
    current_1.textContent = 0;
    player[0].classList.remove(`player--active`);
    player[1].classList.add(`player--active`);
    playerTurn=true;
    document.querySelector(`.btn--roll`).addEventListener('click', diceRoll);
    document.querySelector(`.btn--roll`).addEventListener('click', takeScore);
    document.querySelector(`.btn--hold`).addEventListener('click', hold);
    winner.style.display = `none`;
    main.classList.remove(`main-hider`);
};

let diceRoll = function(){
    let roll = Math.floor(Math.random() * 6) + 1;
    switch (roll) {
      case 1: document.getElementById('dice--pic').src = 'dice-1.png';
        dice.classList.add(`dice--effect--red`);
        setTimeout(function () {
        dice.classList.remove(`dice--effect--red`);
          }, 500);
      currentScore = 0;
      current_0.textContent = currentScore;
      current_1.textContent = currentScore;
      if(!playerTurn){changePlayer(); playerTurn = true}
      else{changePlayer(); playerTurn = false}
        break;
      case 2: document.getElementById('dice--pic').src = 'dice-2.png';
      currentScore += 2;
        break;
      case 3: document.getElementById('dice--pic').src = 'dice-3.png';
      currentScore += 3;
        break;
      case 4: document.getElementById('dice--pic').src = 'dice-4.png';
      currentScore += 4;
        break;
      case 5: document.getElementById('dice--pic').src = 'dice-5.png';
      currentScore += 5;
        break;
      case 6: document.getElementById('dice--pic').src = 'dice-6.png';
      currentScore += 6;
        break;
    };
    dice.classList.add(`dice--effect`);

    setTimeout(function() {dice.classList.remove(`dice--effect`);}, 100);
    
    return roll
};

let compCycle_1 = function () {
  diceRoll();
  current_0.textContent = currentScore;
};

let compCycle_2_hold = function () {
  computerScore += currentScore;
  score_0.textContent = computerScore;
  currentScore = 0;
  current_0.textContent = currentScore;
  changePlayer();
  playerTurn = true;
};


refresh = setInterval(function () {
    if(!playerTurn){
    compCycle_1();
    if(currentScore+computerScore>=100){compCycle_2_hold()}
    if (currentScore > 18 && computerScore < 75 && userScore < 75) {
      compCycle_2_hold();
    }
}
  }, 1000);

  let winTester = setInterval(function () {
    if (userScore>=100) {
        winner.textContent = `The winner is ${userName}`;
        winner.style.display = `block`;
        main.classList.add(`main-hider`)
    }
    if (computerScore >= 100) {
        winner.textContent = `Computer has won!`;
        winner.style.display = `block`;
        main.classList.add(`main-hider`);}
}, 500);

let hold = function(){
    userScore += currentScore;
    score_1.textContent = userScore;
    currentScore = 0;
    current_1.textContent = currentScore;
    changePlayer();
    playerTurn = false
};
let takeScore = function(){
    current_1.textContent = currentScore;
}

document.querySelector(`.btn--new`).addEventListener('click', newGame);
document.querySelector(`.btn--roll`).addEventListener('click', diceRoll);
document.querySelector(`.btn--roll`).addEventListener('click', takeScore);
document.querySelector(`.btn--hold`).addEventListener('click', hold);

let rename = function(){
userName = prompt('Please enter your name');
playerName.textContent = userName
}
playerName.addEventListener('click', rename);



