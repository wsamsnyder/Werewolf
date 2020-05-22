/* eslint-disable no-console */
const express = require('express');
const { db } = require('../database/controllers');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/newRoom', (req, res) => {
  const { name } = req.body;

  db.createRoom(name)
    .then((val) => {
      res.status(201).json(val);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.get('/api/startGame', (req, res) => {
  const { townsPeople, roomId } = req.body;

  db.createGame(townsPeople, roomId)
    .then((val) => {
      res.status(201).json(val);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.listen(port, () => console.log(`listening on port ${port}`));
