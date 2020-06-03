const mongoose = require('mongoose');
require('./index');

const room = new mongoose.Schema({
  moderator: {
    username: { type: String },
    socketId: { type: String },
  },

  wolves: [
    {
      username: { type: String },
      socketId: { type: String },
      alive: { type: Boolean, default: true },
    },
  ],

  doctor: [
    {
      username: { type: String },
      socketId: { type: String },
      alive: { type: Boolean, default: true },
    },
  ],

  seer: [
    {
      username: { type: String },
      socketId: { type: String },
      alive: { type: Boolean, default: true },
    },
  ],

  townsPeople: [
    {
      username: { type: String },
      socketId: { type: String },
      alive: { type: Boolean, default: true },
    },
  ],

  allPlayers: [
    {
      username: { type: String },
      socketId: { type: String },
    },
  ],
});

exports.Room = mongoose.model('Room', room);
