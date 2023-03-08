'use strict';

const playerName = document.getElementById(`name--1`);
const player = document.querySelectorAll(`.player`);
const dice = document.querySelector('.dice');
const score_0 = document.getElementById(`score--0`);
const score_1 = document.getElementById(`score--1`);
const current_0 = document.getElementById(`current--0`);
const current_1 = document.getElementById(`current--1`);
const winner = document.querySelector(`.winner`);
const faq = document.querySelector(`.faq`);
const main = document.querySelector(`main`);
const dicePic = document.getElementById('dice--pic');

let userName = `Player 2`;
let computerScore = 0;
let userScore = 0;
let currentScore = 0;
let playerTurn = true;
let refresh;
let roll;


function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


const changePlayer = function () {
  if(roll != 1){dicePic.src = `dice-0.png`};
  player.forEach(plr => {
  plr.classList.toggle(`player--active`)
  });
  if(playerTurn){computerTurn()}
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
    winner.style.display = `none`;
    main.classList.remove(`main-hider`);
    clearInterval(refresh);
    faq.style.display = `none`
};

let winTester = function () {
  setTimeout(function(){  if (userScore >= 100) {
    winner.textContent = `The winner is ${userName}`;
    winner.style.display = `block`;
    main.classList.add(`main-hider`);
  }
  if (computerScore >= 100) {
    winner.textContent = `Computer has won!`;
    winner.style.display = `block`;
    main.classList.add(`main-hider`);
  }} ,2000)

};


let diceRoll = function(){
  roll = Math.floor(Math.random() * 6) + 1;
  dicePic.src = `dice-${roll}.png`;
  dice.classList.add(`dice--effect`);
  setTimeout(function () {
        dice.classList.remove(`dice--effect`);
      }, 600);
  if(roll===1){
      clearInterval(refresh);
      dice.classList.add(`dice--effect--red`);
      setTimeout(function () {
      dice.classList.remove(`dice--effect--red`);
      }, 600);
      currentScore = 0;
      current_0.textContent = currentScore;
      current_1.textContent = currentScore;
      if(playerTurn){changePlayer(); playerTurn = false}
      else{changePlayer(); playerTurn = true}
    } else{currentScore += roll;}
};

let dicetest = function(){
        dice.classList.add(`dice--effect--red`);
        dice.classList.remove(`dice--effect--red`);
};

let hold = function () {
  if(playerTurn){
    userScore += currentScore;
    winTester();
    score_1.textContent = userScore;
    currentScore = 0;
    current_1.textContent = currentScore;
    changePlayer();
    playerTurn = false;
}};

let takeScore = function () {
  if(playerTurn){
  diceRoll();
  current_1.textContent = currentScore;
}};


let renameBox = function () {
  userName = document.getElementById(`name`).value
  playerName.textContent = userName;
};



let compCycle_1 = function () {
  diceRoll();
  current_0.textContent = currentScore;
};

let compCycle_2_hold = function () {
  clearInterval(refresh);
  
  setTimeout(function () {  
    computerScore += currentScore;
    winTester()
    score_0.textContent = computerScore;
    currentScore = 0;
    current_0.textContent = currentScore;
    changePlayer();
    playerTurn = true;
  }, 1500);

};

let computerTurn = function(){ 
refresh = setInterval(function () {
    compCycle_1();
      if(currentScore + computerScore >= 100){compCycle_2_hold()}
      if(currentScore >= 18 && computerScore < 30 && userScore < 50){compCycle_2_hold()}
      if(currentScore >= 23 && computerScore < 60 && userScore < 75){compCycle_2_hold()}
  }, 1000)};

let instructions = function(){
  main.classList.toggle(`main-hider`);
  faq.style.display  == `block` ? faq.style.display = `none` : faq.style.display = `block`;
}
let enterKeypress = function(k){if(k.key === `Enter`){instructions()}}


document.querySelector(`.btn--new`).addEventListener('click', newGame);
document.querySelector(`.btn--faq`).addEventListener('click', instructions);
document.querySelector(`.btn--roll`).addEventListener('click', takeScore);
document.querySelector(`.btn--hold`).addEventListener('click', hold);
document.getElementById(`name`).addEventListener('input', renameBox);
document.addEventListener('keydown', enterKeypress);


