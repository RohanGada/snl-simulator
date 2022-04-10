console.log("__________FILE_START___________", "\n");
let moves = [];
const ladders = [
  [2, 10],
  [5, 11],
  [7, 21],
];
const snakes = [
  [3, 9],
  [1, 10],
];
let i = 0;
let board = new Array(100).fill(null);
for (i = 0; i < snakes.length; i++) {
  board[snakes[i][1] - 1] = "S" + i;
}
for (i = 0; i < ladders.length; i++) {
  board[ladders[i][0] - 1] = "L" + i;
}
console.log(board);
// while () {}

const turn = (currentPosition) => {
  const number = diceRoll();
  const movesSoFar = moves.length;
  console.log(number);
  let diffFromWin = 100 - currentPosition;
  if (diffFromWin <= 6) {
    if (number !== diffFromWin) {
      return currentPosition;
    } else {
      return currentPosition + number;
    }
  }
  let currentPositionInTurn = currentPosition + number;
  // let snakeIterator = 0;
  // while (snakes[snakeIterator][1] && currentPositionInTurn <= snakes[snakeIterator][1]) {
  //   if (currentPositionInTurn == snakes[snakeIterator][1]) {
  //     currentPositionInTurn = snakes[snakeIterator][0];
  //   } else {
  //     snakeIterator++;
  //   }
  // }
  // let ladderIteraror = 0;
  // let squareState = board[currentPositionInTurn];
  // if(squareState !== null){
  //   let SoL = squareState.charAt(0);

  // }

  if (number === 6) {
    return turn(currentPositionInTurn);
  } else {
    return currentPositionInTurn;
  }
};

const diceRoll = () => {
  return Math.floor(Math.random() * 6) + 1;
};

let tokenPosition = 0;
// while (tokenPosition < 100) {
//   tokenPosition = turn(tokenPosition);
//   moves.push(tokenPosition);
//   console.log(moves);
// }
console.log("all moves :", moves);

console.log("Hi hey whatsup");
console.log("__________FILE_END_____________");
