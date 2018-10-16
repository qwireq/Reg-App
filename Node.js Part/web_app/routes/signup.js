var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http');
var requestify = require('requestify');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('signup', {disp: ""});
});

router.post('/', function(req, res, next) {
    var email = req.body.email.toLowerCase();
    var pw = req.body.pw;
    var confirmmpw = req.body.confirmpw;
    var fname = req.body.fname.toLowerCase();
    var lname = req.body.lname.toLowerCase();

    if(confirmmpw != pw)res.render('signup', {disp: "Passwords do not match!"});
    else {
        requestify.post('http://localhost:8080/regapp/signup', {
            email: email,
            password: pw,
            name: fname,
            surname: lname

        })
            .then(function (response) {

                // Get the response body (JSON parsed or jQuery object for XMLs)
                var losya = JSON.parse(response.getBody());
                //response.getBody();
                if(losya.toString() == "null")res.render('signup', {disp:'User with such email already exists!'});
                else res.redirect('signin');
            });
    }

});



module.exports = router;