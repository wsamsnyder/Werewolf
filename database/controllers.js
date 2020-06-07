const { Room } = require('./schemas');

exports.db = {
  // rename to create game
  createRoom: (name) => {
    const newRoom = new Room({
      moderator: { username: name },
      wolves: [{ username: name }],
      doctor: [{ username: name }],
      seer: [{ username: name }],
      townsPeople: [{ username: name }],
    });

    return newRoom.save();
  },

  // returns a Promise that resolves with null if the username is already taken
  // or the town chat's namespace and the new towns persons id
  joinGame: (username, gameId) => (
    Room.findById(gameId)
      .then((gameRoom) => {
        gameRoom.townsPeople.push({ username });
        gameRoom.allPlayers.push({ username });

        return gameRoom.save()
          .then((updatedTown) => {
            const { townsPeople, moderator, allPlayers } = updatedTown;
            const modUsername = moderator.username;

            let townRoomId;
            let townsPersonId;
            let controlSocketId;
            for (let i = 0; i < townsPeople.length; i++) {
              if (townsPeople[i].username === username && townsPeople[i].socketId === undefined) {
                townsPersonId = townsPeople[i]._id;
              }
              if (townsPeople[i].username === modUsername) {
                townRoomId = townsPeople[i]._id;
              }
            }
            for (let i = 0; i < allPlayers.length; i++) {
              if (allPlayers[i].username === username && allPlayers[i].socketId === undefined) {
                controlSocketId = allPlayers[i]._id;
              }
            }
            if (townRoomId && townsPersonId && controlSocketId) {
              return { townRoomId, townsPersonId, controlSocketId };
            }
            return null;
          });
      })
  ),

  // rename to 'start game'
  startGame: (gameId) => (
    Room.findById(gameId)
      .then((results) => {
        const {
          wolves,
          doctor,
          seer,
          allPlayers,
        } = results;
        // console.log('first results', results);

        const allPlayersCopy = [...allPlayers];

        const numOfWolves = Math.floor(allPlayersCopy.length / 5);

        for (let i = 0; i <= numOfWolves + 3; i++) {
          const randomPlayerIndex = Math.floor(Math.random() * allPlayersCopy.length);

          if (wolves.length < numOfWolves + 1) {
            const { username } = allPlayersCopy.splice(randomPlayerIndex, 1)[0];
            wolves.push({ username });
          } else if (seer.length + 1 <= 2) {
            const { username } = allPlayersCopy.splice(randomPlayerIndex, 1)[0];
            seer.push({ username });
          } else if (doctor.length + 1 <= 2) {
            const { username } = allPlayersCopy.splice(randomPlayerIndex, 1)[0];
            doctor.push({ username });
          }
        }
        // save to db
        return Room.findByIdAndUpdate(gameId, {
          wolves,
          seer,
          doctor,
        },
        {
          new: true,
        });
      })
  ),

  getAllPlayers: (gameId) => (
    Room.findById(gameId)
      .then(({ allPlayers }) => allPlayers.map(({ username }) => username))
  ),

  // verifies that a player belongs in a specific room and has not connected
  // on the namespace before
  validatePlayer: (userId, gameId, chatRoom, socketId) => (
    Room.findById(gameId)
      .then((gameRoom) => {
        const room = gameRoom[chatRoom];
        for (let i = 0; i < room.length; i++) {
          // console.log(room[i]._id.toString() === userId, userId, room[i]._id.toString(), room[i].socketId === undefined);
          if (room[i]._id.toString() === userId && room[i].socketId === undefined) {
            // console.log(room, ' should be valid from controllers');
            room[i].socketId = socketId;
            return gameRoom.save();
          }
        }
        // console.log('is not valid in controllers?');
        return false;
      })
  ),

  // validateModerator: ((gameId, socketId) => (
  //   Room.findById(gameId)
  //     .then((gameRoom) => {
  //       const { moderator } = gameRoom;
  //       console.log( moderator, gameId);
  //       if (moderator._id === gameId && moderator.socketId === undefined) {
  //         moderator.socketId = socketId;
  //         return true;
  //       }
  //       return false;
  //     })
  // )),
};
