const mongoose = require('mongoose');

const clubSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    players: {
      ref: 'player',
      type: Array
    },
    town: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    year_made: {
      type: String,
      required: true
    },

   
  }, { timestamps: true });
  
  module.exports = mongoose.model('Club', clubSchema);