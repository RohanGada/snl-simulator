console.log("__________FILE_START___________", "\n");
console.log(
  "\n INDEX OF MOVE TYPES \n R - Reject \n F - Finisher \n S - Snake Bite jump \n L - Ladder Climb \n M(number) - moves"
);
console.log("\n\n__________USER INPUT_____________");

// USER INPUTS START
const ladders = [
  [2, 10],
  [5, 11],
  [7, 21],
  [17, 25],
  [4, 58],
  [27, 47],
  [77, 98],
];
const snakes = [
  [3, 9],
  [1, 10],
  [11, 22],
  [31, 40],
  [51, 72],
  [81, 90],
  [91, 94],
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
let biggestClimbInThisTurn = 0;
let biggestSlide = 0;
let biggestSlideInThisTurn = 0;
let rollsInThisTurn = [];
let longestTurn = [];
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

let moveType = [];

const diceRoll = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const turn = (currentPosition, moveIndexInTurn) => {
  const number = diceRoll();
  rollsInThisTurn.push(number);
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
      if (biggestSlideInThisTurn < currentPositionInTurn - snakes[solIndex][0]) {
        biggestSlideInThisTurn += currentPositionInTurn - snakes[solIndex][0];
      }
      currentPositionInTurn = snakes[solIndex][0];
    } else if (sol === "L") {
      moveType[moveIndexInTurn] += " " + squareState;
      if (biggestClimbInThisTurn < ladders[solIndex][1] - currentPositionInTurn) {
        biggestClimbInThisTurn += ladders[solIndex][1] - currentPositionInTurn;
      }
      currentPositionInTurn = ladders[solIndex][1];
    }
  }

  if (number === 6) {
    return turn(currentPositionInTurn, moveIndexInTurn);
  } else {
    return currentPositionInTurn;
  }
};

const simulate = (n) => {
  for (let j = 1; j <= n; j++) {
    moves = [];
    moveType = [];

    console.log(`\n__________SIMULATION ${j}_____________`);
    let tokenPosition = 0;
    let moveIndex = 0;
    while (tokenPosition < 100) {
      // INITIALIZING
      biggestClimbInThisTurn = 0;
      biggestSlideInThisTurn = 0;
      moveType[moveIndex] = "";
      rollsInThisTurn = [];
      // END
      // TURN EXECUTION
      tokenPosition = turn(tokenPosition, moveIndex++);
      // END
      //
      moves.push(tokenPosition);
      if (biggestClimb < biggestClimbInThisTurn) {
        biggestClimb = biggestClimbInThisTurn;
      }
      if (biggestSlide < biggestSlideInThisTurn) {
        biggestSlide = biggestSlideInThisTurn;
      }
      if (
        rollsInThisTurn.length > longestTurn.length ||
        (rollsInThisTurn.length == longestTurn.length &&
          rollsInThisTurn[rollsInThisTurn.length - 1] > longestTurn[longestTurn - 1])
      ) {
        longestTurn = rollsInThisTurn;
      }
    }
    console.log("\nPlayer token over turns : " + moves);
    console.log("\nAll move details : " + moveType);
  }
};

simulate(noOfSimulations);

// RESULT
console.log("\n__________RESULTS_____________");
console.log("Biggest Slide : ", biggestSlide);
console.log("Biggest Climb : ", biggestClimb);
console.log("Longest Turn : ", longestTurn);
console.log("__________FILE_END_____________");
