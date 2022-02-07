var express = require('express');
var router = express.Router();
const controller = require('../controller/leagues');

// CRUD operations: Create Read Update Delete

router.get('/', controller.getAllLeagues)
      .post('/', controller.getLeagueCreate)
      .delete('/:id', controller.getLeaguesDeleted)

module.exports = router;
