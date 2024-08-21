'use strict';

// Function to start a new game
const newGame = function () {
  // Reset scores and current scores
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  // Hide the dice and reset game state
  diceEl.classList.add('hidden');
  playing = true;

  // Remove winner class and set active player
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// Function to switch the active player
const switchPlayer = function () {
  // Reset current score
  currentScore = 0;

  // Toggle active player class
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  // Reset current score display
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Switch active player
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;
newGame();

// New game functionality
btnNew.addEventListener('click', newGame);

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    let player = document.getElementById(`current--${activePlayer}`);

    // Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check if rolled dice is 1
    if (dice === 1) {
      // Switch to next player
      switchPlayer();
    } else {
      // Add dice to current score
      currentScore += dice;
      player.textContent = currentScore;
    }
  }
});

// Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    let playerScore = document.getElementById(`score--${activePlayer}`);
    playerScore.textContent = scores[activePlayer];
    console.log(`player ${activePlayer} score: ${scores[activePlayer]}`);

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      let player = document.querySelector(`.player--${activePlayer}`);
      player.classList.add('player--winner');
      player.classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});
