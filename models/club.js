const mongoose = require('mongoose');

const clubSchema = mongoose.Schema({
    name: {
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
    players: [{
      type: mongoose.Types.ObjectId,
      ref: 'player'
    }]

   
  }, { timestamps: true });
  
  module.exports = mongoose.model('club', clubSchema);