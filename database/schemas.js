const mongoose = require('mongoose');
require('./index');

const room = new mongoose.Schema({
  moderator: {
    username: { type: String, required: true },
    socketId: { type: String, required: true },
  },

  wolves: [
    {
      username: { type: String, required: true },
      socketId: { type: String, required: true },
      alive: { type: Boolean, default: true },
    },
  ],

  doctor: {
    username: { type: String, required: true },
    socketId: { type: String, required: true },
    alive: { type: Boolean, default: true },
  },

  seer: {
    username: { type: String, required: true },
    socketId: { type: String, required: true },
    alive: { type: Boolean, default: true },
  },

  townsPeople: [
    {
      username: { type: String, required: true },
      socketId: { type: String, required: true },
      alive: { type: Boolean, default: true },
    },
  ],
});

exports.Room = mongoose.model('Room', room);
