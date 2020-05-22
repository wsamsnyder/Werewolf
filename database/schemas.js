const mongoose = require('mongoose');
require('./index');

const room = new mongoose.Schema({
  mod: String,

  wolves: [
    {
      name: String,
      alive: { type: Boolean, default: true },
    },
  ],

  doctor: {
    name: String,
    alive: { type: Boolean, default: true },
  },

  seer: {
    name: String,
    alive: { type: Boolean, default: true },
  },

  townsPeople: [
    {
      name: String,
      alive: { type: Boolean, default: true },
    },
  ],
});

exports.Room = mongoose.model('Room', room);
