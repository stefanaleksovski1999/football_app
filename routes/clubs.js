var express = require('express');
var router = express.Router();
const controller = require('../controller/clubs');

// CRUD operations: Create Read Update Delete

router.get('/', controller.getAll)
      .get('/create', controller.create)
      .get('/:id', controller.getEdit)
      .get('/:id/print', controller.print)
      .get('/:id/view', controller.getView)
      .post('/', controller.postCreate)
      .post('/:id', controller.update)
      .delete('/:id', controller.destroy)
module.exports = router;
