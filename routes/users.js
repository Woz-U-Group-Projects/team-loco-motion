const express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {

	models.users.findAll().then(users => res.json(users));
});

module.exports = router;