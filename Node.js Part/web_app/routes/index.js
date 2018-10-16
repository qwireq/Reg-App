var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var ses;
  ses = req.session;
 // console.log(ses);
  //res.sendFile('userpage.html');
  global.currentUser = null;
  res.render('index', { title: 'Hello, Dias!' });
});

module.exports = router;
