require('dotenv').config();
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { db } = require('../database/controllers');
const { Timer } = require('./Timer');

const port = process.env.SERVER_PORT;

app.use(express.static('public'));
app.use(express.json());

// takes in the roomID and creates socket listeners
// I want to factor this out to it's own file
const createChatRooms = (namespaceId) => {
  const validPlayers = {};

  const namespace = io
    .of(`/${namespaceId}`)
    .on('connection', (socket) => {

      socket.on('firstConnection', (username, userId, gameId, roomName) => {
        // see if the player's userId is already in the db w/socketId. reject the connection if true
        db.validatePlayer(userId, gameId, roomName, socket.id)
          .then((isValidPlayer) => {
            if (isValidPlayer) {
              validPlayers[socket.id] = true;
              namespace.emit('message', { username, message: 'joined!' });
            } else {
              socket.disconnect();
            }
          });
      });

      socket.on('message', (messageObj) => {
        if (validPlayers[socket.id]) {
          namespace.emit('message', messageObj);
        } else {
          socket.disconnect();
        }
      });
    });
};

// room that time and other mod commands will go through
const createCommandRoom = (namespaceId) => {
  let moderator;
  // ensure the
  const namespace = io
    .of(`/${namespaceId}`)
    .on('connection', (socket) => {
      const timer = new Timer();

      // if there isn't a mod already, verifies before setting to moderator
      // when a new player joins emit a new list of the playernames
      socket.on('firstConnection', (gameId) => {
        if (!moderator) {
          moderator = socket.id;
        } else {
          db.getAllPlayers(gameId)
            .then((players) => {
              namespace.emit('newPlayer', players);
            });
        }
      });

      // on disconnect, remove the player from all roles in game

      socket.on('startTime', () => {
        if (socket.id === moderator) {
          timer.start((time) => namespace.emit('time', time));
        } else {
          socket.disconnect();
        }
      });

      socket.on('setTime', (amountOfTime) => {
        if (socket.id === moderator) {
          timer.set(amountOfTime);
        } else {
          socket.disconnect();
        }
      });

      socket.on('stopTime', () => {
        if (socket.id === moderator) {
          timer.stop();
        } else {
          socket.disconnect();
        }
      });

      socket.on('addTime', (additionalTime) => {
        if (socket.id === moderator) {
          timer.add(additionalTime);
        } else {
          socket.disconnect();
        }
      });
    });
};

// returns moderatorId as namespaceIds for townsPeople, wolves
// doctor and seer. gameId = commandRoomId. modId used for verification.
app.post('/createNamespace', (req, res) => {
  const { modUsername } = req.body;

  db.createRoom(modUsername)
    .then(({
      _id,
      moderator,
      townsPeople,
      wolves,
      doctor,
      seer,
    }) => {
      createCommandRoom(_id);

      const channels = [townsPeople, wolves, doctor, seer];
      channels.forEach((channel) => {
        createChatRooms(channel[0]._id);
      });

      res.status(201).json(
        {
          gameId: _id,
          modId: moderator._id,
          townChat: { townName: 'townsPeople', townId: townsPeople[0]._id },
          otherChats: [
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

// returns the townsPersonChatId(namespace to join for chat)
// and the townsPersonId (identifier for the room)
app.post('/joinNamespace', (req, res) => {
  const { username, roomId } = req.body;
  db.joinGame(username, roomId)
    .then(({ townRoomId, townsPersonId }) => {
      res.status(201).json({ townRoomId, townsPersonId });
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
