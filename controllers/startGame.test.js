const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const gameSchema = require('../db/games.model');
const startGame = require('./startGame');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
    mongoose.model('games', gameSchema);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  // tests
  it('after game start should return started game', async () => {
    const games = mongoose.model('games');

    const mockStartedGame = {
      _id: 'some-gmae-id',
      moves: [],
      finished: false,
      winner: null,
      draw: null,
    };
    startGame({}, {});

    games.find({}, (err, doc) => {
      expect(doc).toEqual(mockStartedGame);
    });
  });
});
