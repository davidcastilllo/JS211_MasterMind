'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = 'abcd';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  let RightPosition = 0
  let RightLetter = 0
  let brokenSolution = Array.from(solution)
  let brokenGuess = Array.from(guess)
  let letterOccurences = {}
  for (let i = 0; i < solution.length; i++) {
    let letter = solution[i]
    let ObjKey = letterOccurences[letter]
    if (!ObjKey) {
      letterOccurences[letter] = 1
    }
    else {
      letterOccurences[letter] = ObjKey + 1
    }
  }
  console.log(letterOccurences)
  console.log('Solution   ' + brokenSolution)
  console.log('Guess   ' + brokenGuess)
  for (let i = 0; i < brokenSolution.length; i++) {
    if (brokenSolution[i] == brokenGuess[i]) {RightPosition += 1; letterOccurences[brokenGuess[i]] = letterOccurences[brokenGuess[i]] - 1}
    else if (brokenSolution.includes(brokenGuess[i]) && letterOccurences[brokenGuess[i]] > 0 ) {RightLetter += 1; letterOccurences[brokenGuess[i]] = letterOccurences[brokenGuess[i]] - 1}
  }
  return RightPosition + '-' + RightLetter
}


const mastermind = (guess) => {
  solution = 'abcd'; 
  board.push(guess)
  if (guess == solution) {return 'You guessed it!'}
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}