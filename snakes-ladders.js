console.log("__________FILE_START___________", "\n");
console.log("\n R - Reject \n F - Finisher \n S - Snake Bite jump \n L - Ladder Climb \n M(number) - moves");
console.log("\nUser input : ");

// USER INPUTS START
const ladders = [
  [2, 10],
  [5, 11],
  [7, 21],
];
const snakes = [
  [3, 9],
  [1, 10],
  [51, 82],
];
const noOfSimulations = 2;
// USER INPUTS END

// USER INPUT LOG START
console.log(`\nSnakes : ${snakes.join("|")}`);
console.log(`\Ladders : ${ladders.join("|")}`);
console.log(`\Simulations : ${noOfSimulations}`);
// USER INPUT LOG END

// STAT VARIABLES
let biggestClimb = 0;
let biggestSlide = 100;
// STAT VARIABLES

let moves = [];
let i = 0;
let board = new Array(100).fill(null);
for (i = 0; i < snakes.length; i++) {
  board[snakes[i][1] - 1] = "S" + i;
}
for (i = 0; i < ladders.length; i++) {
  board[ladders[i][0] - 1] = "L" + i;
}
console.log(board);
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
      moveType[moveIndexInTurn] += " " + squareState;
      currentPositionInTurn = snakes[solIndex][0];
      console.log("\n", sol, solIndex, snakes[solIndex][0]);
    } else if (sol === "L") {
      moveType[moveIndexInTurn] += " " + squareState;
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

const simulate = (n) => {
  for (let j = 1; j <= n; j++) {
    moves = [];
    moveType = [];
    console.log(`__________SIMULATION ${j}_____________`);
    let tokenPosition = 0;
    let moveIndex = 0;
    while (tokenPosition < 100) {
      moveType[moveIndex] = "";
      tokenPosition = turn(tokenPosition, moveIndex++);
      moves.push(tokenPosition);
    }
    console.log("\nPlayer token : " + moves);
    console.log("\nMove Detail : " + moveType);
  }
};

simulate(noOfSimulations);
console.log("__________FILE_END_____________");
