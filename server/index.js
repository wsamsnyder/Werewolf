require('dotenv').config();
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { db } = require('../database/controllers');

const port = process.env.SERVER_PORT;

app.use(express.static('public'));
app.use(express.json());

// takes in the roomID and creates socket listeners
// I want to factor this out to it's own file
const createChatRooms = (namespaceId) => {
  const namespace = io
    .of(`/${namespaceId}`)
    .on('connection', (socket) => {
      const validSocketIds = {};

      socket.on('firstConnection', (username, userId, gameId, roomName) => {
        // see if the player's userId is already in the db w/socketId. reject the connection if true
        const socketId = socket.id.split('#')[1];
        db.validatePlayer(userId, gameId, roomName, socketId)
          .then((isValidPlayer) => {
            if (isValidPlayer) {
              validSocketIds[socket.id] = true;
              namespace.emit('message', { username, message: 'joined!' });
            } else {
              console.log('player is invalid');
              socket.disconnect();
            }
          });
      });

      socket.on('message', (messageObj) => {
        if (validSocketIds[socket.id]) {
          namespace.emit('message', messageObj);
        } else {
          socket.disconnect();
        }
      });
    });
};

// room that time and other mod commands will go through
const createCommandRoom = (namespaceId) => {
  // ensure the
  const namespace = io
    .of(`/${namespaceId}`)
    .on('connection', (socket) => {
      let moderator;

      socket.on('firstConnection', (userId, gameId) => {
        // see if the player's userId is already in the db w/socketId. reject the connection if true
        const socketId = socket.id.split('#')[1];
        db.validatePlayer(userId, gameId, roomName, socketId)
          .then((isValidPlayer) => {

            // if (isValidPlayer) {
            //   validSocketIds[socket.id] = true;
            //   namespace.emit('message', { username, message: 'joined!' });
            // } else {
            //   console.log('player is invalid');
            //   socket.disconnect();
            // }
          });
      });

      socket.on('message', (messageObj) => {
        if (validSocketIds[socket.id]) {
          namespace.emit('message', messageObj);
        } else {
          socket.disconnect();
        }
      });
    });
};

app.post('/createNamespace', (req, res) => {
  const { moderator } = req.body;
  console.log('moderator', moderator);

  // needs to create the socket for the room
  db.createRoom(moderator)
    .then(({
      _id,
      townsPeople,
      wolves,
      doctor,
      seer,
    }) => {
      // console.log(_id, wolves[0], doctor[0], seer[0], townsPeople[0]);
      const channels = [[{ _id }], townsPeople, wolves, doctor, seer];
      channels.forEach((channel) => {
        createChatRooms(channel[0]._id);
      });

      res.status(201).json(
        {
          gameId: _id,
          chatRooms: [
            { roomName: 'townsPeople', roomId: townsPeople[0]._id },
            { roomName: 'wolves', roomId: wolves[0]._id },
            { roomName: 'doctor', roomId: doctor[0]._id },
            { roomName: 'seer', roomId: seer[0]._id },
          ],
        },
      );
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
    });
});

app.post('/joinNamespace', (req, res) => {
  const { username, roomId } = req.body;
  db.joinGame(username, roomId)
    .then((townsPersonId) => {
      res.status(201).json(townsPersonId);
    })
    .catch((error) => {
      console.log(error);
      res.status(400);
    });
});

// this needs to be refactored
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

server.listen(port, () => console.log(`listening on port ${port}`));
