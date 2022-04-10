console.log("__________FILE_START___________", "\n");
console.log(" R - Reject \n F - Finisher \n S - Snake Bite jump \n L - Ladder Climb \n M(number) - moves");
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
let moveType = [];

const turn = (currentPosition, moveIndexInTurn) => {
  const number = diceRoll();
  let diffFromWin = 100 - currentPosition;
  if (diffFromWin <= 6) {
    if (number !== diffFromWin) {
      moveType[moveIndexInTurn] += ` R(${number})`;
      return currentPosition;
    } else {
      moveType[moveIndexInTurn] += ` M(${number})`;
      moveType[moveIndexInTurn] += " F";
      return currentPosition + number;
    }
  }
  let currentPositionInTurn = currentPosition + number;
  moveType[moveIndexInTurn] += ` M(${number})`;
  let squareState = board[currentPositionInTurn];
  if (squareState !== null) {
    let sol = squareState.charAt(0);
    let solIndex = parseInt(squareState.substring(1));
    if (sol === "S") {
      moveType[moveIndexInTurn] += " S";
      currentPositionInTurn = snakes[solIndex][0];
    } else if (sol === "L") {
      moveType[moveIndexInTurn] += " L";
      currentPositionInTurn = ladders[solIndex][1];
    }
  }

  if (number === 6) {
    return turn(currentPositionInTurn, moveIndexInTurn);
  } else {
    return currentPositionInTurn;
  }
};

const diceRoll = () => {
  return Math.floor(Math.random() * 6) + 1;
};

let tokenPosition = 0;
let moveIndex = 0;
while (tokenPosition < 100) {
  moveType[moveIndex] = "";
  tokenPosition = turn(tokenPosition, moveIndex++);
  moves.push(tokenPosition);
}
console.log("Player token : " + moves);
console.log("Move Detail : " + moveType);

console.log("__________FILE_END_____________");
