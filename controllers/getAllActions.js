const mongoose = require('mongoose');
const gamesModel = mongoose.model('games');

const getAllActions = async (req, res) => {
  try {
    gamesModel.find().exec((err, docs) => {
      return res.send(docs);
    });
  } catch (err) {
    return res.status(500).send('Something went wrong...');
  }
};

module.exports = getAllActions;
