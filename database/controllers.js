const { Room } = require('./schemas');

exports.db = {
  createRoom: (name) => {
    console.log(name);
    const newRoom = new Room({
      mod: name,
    });

    return newRoom.save();
  },

  createGame: (namesArr, roomId) => {
    const wolves = [];
    let seer = '';
    let doctor = '';
    let name = '';
    const townsPeople = [];

    const names = namesArr.split(',');

    names.forEach((person) => {
      townsPeople.push({ name: person, alive: true });
    });

    const numOfWolves = Math.floor(names.length / 5);

    for (let i = 0; i <= numOfWolves + 2; i++) {
      const randomPlayerIndex = Math.floor(Math.random() * names.length);

      if (wolves.length < numOfWolves) {
        wolves.push({ name: names.splice(randomPlayerIndex, 1)[0], alive: true });
      } else if (!seer) {
        [name] = names.splice(randomPlayerIndex, 1);
        seer = { name, alive: true };
      } else {
        [name] = names.splice(randomPlayerIndex, 1);
        doctor = { name, alive: true };
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
