const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://mongo:27017/tictactoe', (err) => {
  if (!err) {
    console.log('Successful connection');
  } else {
    console.log('error ' + err);
  }
});

require('./games.model');
