const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getlineSum(gameArr, line) {
  const [i, j, k] = line;
  return gameArr[i] + gameArr[j] + gameArr[k];
}

function getFreeSpaces(gameArr, line) {
  let free = []
  for (let i of line) {
    if (gameArr[i] === 0) free.push(i);
  }
  return free;
}

function randomFreeSpace(gameArr) {
  const freeSpaceIndicies = [];
  for (let i = 0; i < gameArr.length; i++) {
    if (gameArr[i] === 0) freeSpaceIndicies.push(i);
  }
  const randomSpace = Math.floor(Math.random()*freeSpaceIndicies.length);
  return freeSpaceIndicies[randomSpace];
}

const Util = {

  getWinner: function(gameArr) {
    for (let line of LINES) {
      const sum = getlineSum(gameArr, line);
      if (sum > 2) {
        return [1, line];
      } else if (sum < -2) {
        return [-1, line];
      }
    }
    return [null, null];
  },

  smartNextMove: function(gameArr) {
    let moveNumber = gameArr.map((x) => x !== 0).reduce((x,y) => x + y);
    if (moveNumber <= 1) return randomFreeSpace(gameArr);
    const isXsTurn = (moveNumber % 2) === 0;
    let moveScores = Array(9).fill(0);
    //let bestMove = randomFreeSpace(gameArr);
    //let bestMoveValue = 0;
    for (let line of LINES) {
      const freeSpaces = getFreeSpaces(gameArr, line);
      // if there are no free spaces, check next line
      if (freeSpaces.length === 0) continue;
      const lineSum = getlineSum(gameArr, line);
      if (isXsTurn) {
        // game winning move for X
        if (lineSum === 2) return freeSpaces[0];
        // block O from having game winning move next turn
        else if (lineSum === -2) {
          moveScores[freeSpaces[0]] += 20
        }
        // continue toward 2 Xs in a row
        else if (lineSum === 1) {
          freeSpaces.forEach(space => moveScores[space] += 2);
        }
      } else { //is O's turn
        // game winning move for O
        if (lineSum === -2) return freeSpaces[0];
        // block X from having game winning move next turn
        else if (lineSum === 2) {
          moveScores[freeSpaces[0]] += 20
        }
        // continue toward 2 0s in a row
        else if (lineSum === -1) {
          freeSpaces.forEach(space => moveScores[space] += 2);
        }
      }
    }
    // pick random move out of moves with maximum score
    let maxScore = Math.max(...moveScores);
    let moveOptions = [];
    for (let i = 0; i < 9; i++) {
      if (moveScores[i] === maxScore) moveOptions.push(i);
    }
    return moveOptions[Math.floor(Math.random()*moveOptions.length)];
  },

  randomNextMove: function(gameArr) {
    return randomFreeSpace(gameArr);
  }
};

export default Util;
