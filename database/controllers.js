const { Room } = require('./schemas');

exports.db = {
  // rename to create game
  createRoom: (name) => {
    const newRoom = new Room({
      mod: name,
      wolves: [{ username: name }],
      doctor: [{ username: name }],
      seer: [{ username: name }],
    });

    return newRoom.save();
  },

  // joinGame: (name, socketId, roomId) => {

  // },

  // rename to 'start game'
  startGame: (roomId) => {
    const {
      wolves,
      doctor,
      seer,
      townsPeople,
    } = Room.findById(roomId);

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
    return Room.findByIdAndUpdate(roomId, {
      wolves,
      seer,
      doctor,
      townsPeople,
    },
    {
      new: true,
    });
  },
};
