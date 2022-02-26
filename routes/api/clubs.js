var express = require('express');
var router = express.Router();
const controller = require('../../controller/api/clubs');

// CRUD operations: Create Read Update Delete

router.get('/', controller.getAll)
      .post('/', controller.create)
      .patch('/:id', controller.update)
      .delete('/:id', controller.getDeleted)

module.exports = router;
