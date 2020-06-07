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
  let gameStarted = false;
  const game = namespaceId;
  const timer = new Timer();
  // ensure the
  const namespace = io
    .of(`/${namespaceId}`)
    .on('connection', (socket) => {
      // if there isn't a mod already, verifies before setting to moderator
      // when a new player joins emit a new list of the playernames
      socket.on('firstConnection', (gameId, userId) => {
        if (!moderator) {
          moderator = socket.id;
        } else {
          db.validatePlayer(userId, gameId, 'allPlayers', socket.id)
            .then((players) => {
              if (players) {
                const allPlayers = players.allPlayers.map(({ username }) => username);
                namespace.emit('newPlayer', allPlayers);
              } else {
                socket.disconnect();
              }
            });
        }
      });

      // on disconnect, remove the player from all roles in game

      socket.on('startTime', () => {
        if (socket.id === moderator) {
          console.log('starting time');
          timer.start((time) => namespace.emit('time', time));
        } else {
          socket.disconnect();
        }
      });

      socket.on('setTime', (amountOfTime) => {
        console.log('setting time', amountOfTime);
        if (socket.id === moderator) {
          timer.set(amountOfTime);
        } else {
          socket.disconnect();
        }
      });

      socket.on('pauseTime', () => {
        if (socket.id === moderator) {
          timer.pause();
        } else {
          socket.disconnect();
        }
      });

      // this should be moved to the DB, doesn't make a ton of sense to be here ////////////////////////////////
      const gatherModAndPlayers = (room) => {
        const roles = { wolves: { wolvesArr: [] }, seer: {}, doctor: {} };
        room.wolves.forEach((wolf) => {
          if (room.moderator.username === wolf.username) {
            roles.wolves.chatRoomId = wolf._id;
          } else {
            let playerSocketId;
            for (let i = 0; i < room.allPlayers.length; i++) {
              if (room.allPlayers[i].username === wolf.username) {
                playerSocketId = room.allPlayers[i].socketId;
              }
            }

            roles.wolves.wolvesArr.push({ id: wolf._id, chatRoom: 'wolves', socketId: playerSocketId });
          }
        });

        room.seer.forEach((player) => {
          if (room.moderator.username === player.username) {
            roles.seer.chatRoomId = player._id;
          } else {
            let playerSocketId;
            for (let i = 0; i < room.allPlayers.length; i++) {
              if (room.allPlayers[i].username === player.username) {
                playerSocketId = room.allPlayers[i].socketId;
              }
            }
            roles.seer.id = player._id;
            roles.seer.chatRoom = 'seer';
            roles.seer.socketId = playerSocketId;
          }
        });

        room.doctor.forEach((player) => {
          if (room.moderator.username === player.username) {
            roles.doctor.chatRoomId = player._id;
          } else {
            let playerSocketId;
            for (let i = 0; i < room.allPlayers.length; i++) {
              if (room.allPlayers[i].username === player.username) {
                playerSocketId = room.allPlayers[i].socketId;
              }
            }
            roles.doctor.id = player._id;
            roles.doctor.chatRoom = 'doctor';
            roles.doctor.socketId = playerSocketId;
          }
        });

        return roles;
      };

      socket.on('startGame', () => {
        if (socket.id === moderator) {
          if (!gameStarted) {
            db.startGame(game)
              .then((assignedRoles) => {
                gameStarted = true;
                // filter for each room and emit that that socket should join the room
                // console.log(JSON.stringify(gatherModAndPlayers(assignedRoles)));
                // const roles = { wolves: { wolvesArr: [] }, seer: {}, doctor: {} };
                const { wolves, doctor, seer } = gatherModAndPlayers(assignedRoles);

                // This whole process needs to be cleaned up and factored out
                // Wrote Everything Twice
                // console.log('wolves', wolves, 'doctor', doctor, 'seer', seer);
                socket.broadcast.to(seer.socketId).emit('roleAssignment', {
                  roomName: seer.chatRoom,
                  userId: seer.id,
                  roomId: seer.chatRoomId,
                });

                socket.broadcast.to(doctor.socketId).emit('roleAssignment', {
                  roomName: doctor.chatRoom,
                  userId: doctor.id,
                  roomId: doctor.chatRoomId,
                });

                // roles.wolves.chatRoomId = wolf._id;
                // { id: wolf._id, chatRoom: 'wolves', socketId: playerSocketId }
                wolves.wolvesArr.forEach((wolf) => {
                  socket.broadcast.to(wolf.socketId).emit('roleAssignment', {
                    roomName: wolf.chatRoom,
                    userId: wolf.id,
                    // roomId is not showing up?
                    roomId: wolves.chatRoomId,
                  });
                });
              });
          }
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
    .then(({ townRoomId, townsPersonId, controlSocketId }) => {
      res.status(201).json({ townRoomId, townsPersonId, controlSocketId });
    })
    .catch((error) => {
      console.log(error);
      res.status(400);
    });
});

// this needs to be refactored
// app.get('/startGame', (req, res) => {
//   const { townsPeople, roomId } = req.body;

//   db.createGame(townsPeople, roomId)
//     .then((val) => {
//       res.status(201).json(val);
//     })
//     .catch((error) => {
//       res.status(500).json(error);
//     });
// });

server.listen(port, () => console.log(`listening on port ${port}`));
