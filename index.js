const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db/db');

//controllers
const startGame = require('./controllers/startGame');
const makeMove = require('./controllers/makeMove');
const getLastGame = require('./controllers/getLastGame');
const getAllActions = require('./controllers/getAllActions');

//middlewares
const validateMove = require('./middlewares/validateMove');

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true,
    exposedHeaders: [
      'Accept',
      'authorization',
      'Content-Type',
      'If-None-Match',
      'SourceType',
    ],
  })
);
app.use(bodyParser.json());

//routes
app.get('/', (res, req) => {
  return getLastGame(res, req);
});

app.get('/all-actions', (res, req) => {
  return getAllActions(res, req);
});

app.get('/start', (res, req) => {
  return startGame(res, req);
});

app.post('/move/:who', validateMove, (res, req) => {
  return makeMove(res, req);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
