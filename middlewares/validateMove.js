const mongoose = require('mongoose');
const gamesModel = mongoose.model('games');

const validateMove = async (req, res, next) => {
  gamesModel.findById(req.body._id, (err, doc) => {
    try {
      // check if the game has not been finished
      if (doc.finished === true) throw new Error('Game has been finished');
      // check if the right person makes the move
      if (
        doc.moves.length !== 0 &&
        doc.moves[doc.moves.length - 1].who === req.params.who
      )
        throw new Error('Wrong player makes move');
      // check if the field is empty and it is allowed to make the move there
      doc.moves.forEach((el) => {
        if (el.fieldNr === req.body.fieldNr)
          throw new Error('This field is not empty');
      });
      // check if the fieldNr is between 0 and 10
      if (req.body.fieldNr < 0 || req.body.fieldNr > 8)
        throw new Error('There is no such field');
      // check if the type of player is correct
      if (req.params.who !== 'crosses' && req.params.who !== 'noughts')
        throw new Error('There is no such type of players');
      return next();
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
};

module.exports = validateMove;
