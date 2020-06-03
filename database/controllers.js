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
            const { townsPeople, moderator } = updatedTown;
            const modUsername = moderator.username;

            let townRoomId;
            let townsPersonId;
            for (let i = 0; i < townsPeople.length; i++) {
              if (townsPeople[i].username === username && townsPeople[i].socketId === undefined) {
                townsPersonId = townsPeople[i]._id;
              }
              if (townsPeople[i].username === modUsername) {
                townRoomId = townsPeople[i]._id;
              }
            }
            if (townRoomId && townsPersonId) return { townRoomId, townsPersonId };
            return null;
          });
      })
  ),

  // rename to 'start game'
  startGame: (gameId) => {
    const {
      wolves,
      doctor,
      seer,
      townsPeople,
    } = Room.findById(gameId);

    const townsPeopleCopy = [...townsPeople];

    const numOfWolves = Math.floor(townsPeopleCopy.length / 5);

    for (let i = 0; i <= numOfWolves + 2; i++) {
      const randomPlayerIndex = Math.floor(Math.random() * townsPeopleCopy.length);

      if (wolves.length < numOfWolves) {
        wolves.push(townsPeopleCopy.splice(randomPlayerIndex, 1)[0]);
      } else if (!seer) {
        seer.push(townsPeopleCopy.splice(randomPlayerIndex, 1)[0]);
      } else {
        doctor.push(townsPeopleCopy.splice(randomPlayerIndex, 1)[0]);
      }
    }

    // save to db
    return Room.findByIdAndUpdate(gameId, {
      wolves,
      seer,
      doctor,
      townsPeople,
    },
    {
      new: true,
    });
  },

  getAllPlayers: (gameId) => {
    Room.findById(gameId)
      .then(({ allPlayers }) => {
        return allPlayers.map(({ username }) => players.push(username));
      });
  },

  // verifies that a player belongs in a specific room and has not connected
  // on the namespace before
  validatePlayer: (userId, gameId, chatRoom, socketId) => (
    Room.findById(gameId)
      .then((gameRoom) => {
        const room = gameRoom[chatRoom];
        for (let i = 0; i < room.length; i++) {
          if (room[i]._id.toString() === userId && room[i].socketId === undefined) {
            room[i].socketId = socketId;
            return gameRoom.save()
              .then(() => true);
          }
        }
        return false;
      })
  ),

  validateModerator: ((gameId, socketId) => {
    Room.findById(gameId)
      .then((gameRoom) => {
        const { moderator } = gameRoom;
        if (moderator._id === gameId && moderator.socketId === undefined) {
          moderator.socketId = socketId;
          return true;
        }
        return false;
      });
  }),
};
