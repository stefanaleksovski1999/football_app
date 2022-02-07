const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  date_birth: {
    type: String,
    required: true
  },
  club: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);
