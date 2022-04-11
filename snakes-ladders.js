console.log("__________FILE_START___________", "\n");
console.log(
  "\n INDEX OF MOVE TYPES \n R - Reject \n F - Finisher \n S - Snake Bite jump \n L - Ladder Climb \n M(number) - moves"
);
console.log("\n\n__________USER INPUT_____________");

// USER INPUTS START
/* Since reading File or input from console was optional, for changing the
 * inputs you can change the values of variables below
 *
 */
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
const noOfSimulations = 3;
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
let rolls = [];
let climbs = [];
let slides = [];
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

const average = (arr) => {
  let sum = 0;
  arr.forEach((x) => {
    sum += x;
  });
  return sum / arr.length;
};

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
    let noOfRollsInSimulation = 0;
    let climbInSimulation = 0;
    let slideInSimulation = 0;
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
      noOfRollsInSimulation += rollsInThisTurn.length;
      climbInSimulation += biggestClimbInThisTurn;
      slideInSimulation += biggestSlideInThisTurn;
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
    rolls.push(noOfRollsInSimulation);
    climbs.push(climbInSimulation);
    slides.push(slideInSimulation);
    console.log("\nPlayer token over turns : " + moves);
    console.log("\nAll move details : " + moveType);
  }
  rolls.sort();
  climbs.sort();
  slides.sort();
};

simulate(noOfSimulations);

// RESULT
console.log("\n__________RESULTS_____________");
console.log(
  `Minimum/Average/Maximum number of rolls needed to win : ${rolls[0]} / ${average(rolls).toFixed(2)} / ${
    rolls[rolls.length - 1]
  }`
);
console.log(
  `Minimum/Average/Maximum amount of climbs during the game : ${climbs[0]} / ${average(climbs).toFixed(2)} / ${
    climbs[climbs.length - 1]
  }`
);
console.log(
  `Minimum/Average/Maximum amount of slides during the game : ${slides[0]} / ${average(slides).toFixed(2)} / ${
    slides[slides.length - 1]
  }`
);
console.log("Biggest Slide : ", biggestSlide);
console.log("Biggest Climb : ", biggestClimb);
console.log("Longest Turn : ", longestTurn);
console.log("__________FILE_END_____________");
