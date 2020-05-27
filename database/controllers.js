const { Room } = require('./schemas');

exports.db = {
  // rename to create game
  createRoom: (name) => {
    const newRoom = new Room({
      mod: name,
      wolves: [{ username: name }],
      doctor: [{ username: name }],
      seer: [{ username: name }],
      townsPeople: [{ username: name }],
    });

    return newRoom.save();
  },

  // joinGame: (name, socketId, gameId) => {

  // },

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

  validatePlayer: (userId, gameId, chatRoom, socketId) => (
    Room.findById(gameId)
      .then((gameRoom) => {
        const room = gameRoom[chatRoom];
        const socket = socketId.split('#')[1];

        for (let i = 0; i < room.length; i++) {
          if (room[i]._id.toString() === userId && room[i].socketId === undefined) {
            console.log('here');
            room[i].socketId = socket;
            gameRoom.save()
              .then(() => true);
          }
        }

        return false;
      })
  ),
};
