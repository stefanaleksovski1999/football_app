const mongoose = require('mongoose');

const agentSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  players: [{
    ref: 'player',
    type: mongoose.Types.ObjectId
  }]
  
}, { timestamps: true });

module.exports = mongoose.model('agent', agentSchema);
