var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express ->'+process.env.NODE_ENV });
});

module.exports = app => {
  app.use('/', router);
}
