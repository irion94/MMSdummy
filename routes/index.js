var express = require('express');
var router = express.Router();
const create = require('../controllers/marker.controller').create;

/* GET home page. */
router.post('/marker', create);

module.exports = router;
