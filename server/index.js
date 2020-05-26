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

// takes in the roomID and creates socket listeners
// I want to factor this out to it's own file
const createNamespace = (namespaceId) => {
  const namespace = io
    .of(`/${namespaceId}`)
    .on('connection', (socket) => {
      console.log('created namespace: ', namespaceId);
      // socket.emit('connection', 'socket');
      socket.join('townsPeopleChat');

      socket.on('message', ({ message, username }) => {
        console.log(message, username);
        namespace.emit('message', { message, username });
      });
    });

};

app.post('/createNamespace', (req, res) => {
  const { moderator } = req.body;

  // needs to create the socket for the room
  db.createRoom(moderator)
    .then(({ _id }) => {
      createNamespace(_id);
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


// io.on('connection', (socket) => {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', (data) => {
//     console.log(data);
//   });
// });

server.listen(port, () => console.log(`listening on port ${port}`));
