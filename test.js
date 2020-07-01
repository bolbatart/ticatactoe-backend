const _ = require('lodash');

const winning = [0, 4, 8];
const crossesLines = [4, 0, 8];

console.log(_.difference(winning, crossesLines).length === 0);

// if (_.includes(crossesLines, winningLines[i])) return 'crosses';
// if (_.includes(noughtsLines, winningLines[i])) return 'noughts';
