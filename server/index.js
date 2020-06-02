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

// const removeSocket = (namespaceId, socketId) => {
//   io.of(namespaceId).
// };

// takes in the roomID and creates socket listeners
// I want to factor this out to it's own file
const createNamespace = (namespaceId) => {
  console.log(namespaceId);
  const namespace = io
    .of(`/${namespaceId}`)
    .on('connection', (socket) => {
      const validSocketIds = {};

      socket.on('firstConnection', (username, userId, gameId, roomName) => {
        // see if the player's userId is already in the db w/socketId. reject the connection if true
        console.log('on first connection');
        const socketId = socket.id.split('#')[1];
        db.validatePlayer(userId, gameId, roomName, socketId)
          .then((isValidPlayer) => {
            console.log(isValidPlayer);
            if (isValidPlayer) {
              validSocketIds[socket.id] = true;
              namespace.emit('message', { username, message: ' has joined!' });
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

app.post('/joinNamespace', (req, res) => {
  const { username, roomId } = req.body;
  db.joinGame(username, roomId)
    .then((townsPersonId) => {
      res.status(201).json(townsPersonId);
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
    });
});

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
        createNamespace(channel[0]._id);
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
