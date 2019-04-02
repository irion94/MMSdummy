var express = require('express');
var router = express.Router();
const create = require('../controllers/marker.controller').create;
const createAsk = require('../controllers/marker.controller').createAsk;
const get = require('../controllers/marker.controller').get;

/* GET home page. */
router.get('/marker', get);
router.post('/marker', create);
router.post('/askmarker', createAsk);

module.exports = router;
