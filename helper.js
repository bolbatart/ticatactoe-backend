const _ = require('lodash');

const calculateWinner = (game) => {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let crossesLines = [];
  let noughtsLines = [];
  game.moves.forEach((move) => {
    if (move.who === 'crosses') crossesLines.push(move.fieldNr);
    else if (move.who === 'noughts') noughtsLines.push(move.fieldNr);
  });
  for (let i = 0; i < winningLines.length; i++) {
    if (_.difference(winningLines[i], crossesLines).length === 0)
      return 'crosses';
    if (_.difference(winningLines[i], noughtsLines).length === 0)
      return 'noughts';
  }
  return null;
};

module.exports = calculateWinner;
