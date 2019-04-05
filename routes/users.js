const express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.json([{
  	id: 1,
  	username: "Bing"
  }, {
  	id: 2,
  	username: "Bob"
  }]);
});

module.exports = router;