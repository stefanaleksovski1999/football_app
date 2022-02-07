var express = require('express');
var router = express.Router();
const controller = require('../controller/clubs');

// CRUD operations: Create Read Update Delete

router.get('/', controller.getAllClubs)
      .post('/', controller.getClubCreate)
      .patch('/:id', controller.getClubUpdate)
      .delete('/:id', controller.getClubsDeleted)

module.exports = router;
