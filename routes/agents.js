var express = require('express');
var router = express.Router();
const controller = require('../controller/agents');

// CRUD operations: Create Read Update Delete

router
      .get('/', controller.getAll)
      .get('/create', controller.getCreate)
      .get('/:id', controller.getEdit)
      // // .get('/:id/club', controller.getClub)
      .post('/', controller.create)
      .post('/:id', controller.update)
      
      .delete('/:id', controller.getDeleted)

module.exports = router;
