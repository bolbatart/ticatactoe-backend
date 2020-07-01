const mongoose = require('mongoose');
const gamesModel = mongoose.model('games');

const getLastGame = async (req, res) => {
  try {
    gamesModel
      .find()
      .limit(1)
      .sort({ $natural: -1 })
      .exec((err, doc) => {
        if (err) throw new Error(err);
        return res.send(doc[0]);
      });
  } catch (err) {
    return res.status(500).send('Something went wrong...');
  }
};

module.exports = getLastGame;
