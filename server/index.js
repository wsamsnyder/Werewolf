require('dotenv').config();
const express = require('express');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const { db } = require('../database/controllers');

const port = process.env.SERVER_PORT;

// not sure if these will be needed once Sockets are in place
app.use(express.static('public'));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.post('/newRoom', (req, res) => {
  const { modName } = req.body;

  db.createRoom(modName)
    .then(({ _id }) => {
      res.status(201).json(_id);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.get('/startGame', (req, res) => {
  const { townsPeople, roomId } = req.body;

  db.createGame(townsPeople, roomId)
    .then((val) => {
      res.status(201).json(val);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});

server.listen(port, () => console.log(`listening on port ${port}`));
