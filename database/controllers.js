const { Room } = require('./schemas');

exports.db = {
  createRoom: () => {
    const newRoom = new Room({
      mod: 'sam',
    });

    newRoom.save()
      .then((val) => {
        console.log(val);
      });
  },
};
