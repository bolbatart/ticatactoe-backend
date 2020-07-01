const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  finished: {
    type: Boolean,
  },
  moves: {
    type: Array,
  },
  winner: {
    type: String,
  },
  draw: {
    type: String,
  },
});

mongoose.model('games', gameSchema);

module.exports = gameSchema;
