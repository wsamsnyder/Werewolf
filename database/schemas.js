const mongoose = require('mongoose');
require('./index');

const Room = new mongoose.Schema({
  mod: String,
  wolves: [{ name: String, alive: { type: Boolean, default: true } }],
  doctor: String,
  seer: String,
});

exports.Room = mongoose.model('Room', Room);
