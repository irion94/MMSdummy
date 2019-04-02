var express = require('express');
var router = express.Router();
const create = require('../controllers/marker.controller').create;
const get = require('../controllers/marker.controller').get;

/* GET home page. */
router.get('/marker', get);
router.post('/marker', create);

module.exports = router;
