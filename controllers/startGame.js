const mongoose = require('mongoose');
const gamesModel = mongoose.model('games');

const startGame = async (req, res) => {
  try {
    await gamesModel.find({ finished: false }, (err, arr) => {
      arr.forEach(async (el) => {
        el.finished = true;
        await el.save();
      });
    });
    const game = new gamesModel();
    game.finished = false;
    game.winner = null;
    game.draw = null;
    game.moves = [];
    await game.save();
    return res.send(game);
  } catch (err) {
    return res.status(500).send('Something went wrong...');
  }
};

module.exports = startGame;
