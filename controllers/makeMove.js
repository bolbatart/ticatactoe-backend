const mongoose = require('mongoose');
const gamesModel = mongoose.model('games');
const calculateWinner = require('../helper');

const makeMove = async (req, res) => {
  try {
    gamesModel.findById(req.body._id, async (err, doc) => {
      if (err) throw new Error(err);

      doc.moves.push({
        who: req.params.who,
        fieldNr: req.body.fieldNr,
      });

      if (doc.moves.length >= 5) {
        const winner = calculateWinner(doc);
        if (winner) {
          doc.finished = true;
          doc.winner = winner;
        } else if (doc.moves.length === 9) {
          doc.finished = true;
          doc.draw = 'Draw';
        }
      }

      await doc.save();
      return res.send(doc.toObject());
    });
  } catch (err) {
    return res.status(500).send('Something went wrong...');
  }
};

module.exports = makeMove;
