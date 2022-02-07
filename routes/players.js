var express = require('express');
var router = express.Router();
const controller = require('../controller/players');

// CRUD operations: Create Read Update Delete

router.get('/', controller.getAllPlayers)
      .get('/:id', controller.getAllPlayersWithId)
      .post('/', controller.getPlayersCreate)
      .patch('/:id', controller.getPlayersUpdate)
      .delete('/:id', controller.getPlayersDeleted)

module.exports = router;
