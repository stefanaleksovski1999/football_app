var express = require('express');
var router = express.Router();
const controller = require('../../controller/api/players');

// CRUD operations: Create Read Update Delete

router.get('/', controller.getAll)
      .get('/:id', controller.getAllWithId)
      .get('/:id/club', controller.getClub)
      .post('/', controller.create)
      .patch('/:id', controller.update)
      .delete('/:id', controller.getDeleted)

module.exports = router;
