var express = require('express');
var router = express.Router();
var email = 'sk';
var fs = require('fs');
var http = require('http');
var requestify = require('requestify');

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('signin', {disp: ''});
});

router.post('/', function(req, res, next) {

    email = req.body.email;
    var password = req.body.pw;
    email = email.toLowerCase();


    requestify.post('http://localhost:8080/regapp/signin', {
        email: email,
        password: password
    })
        .then(function(response) {
            // Get the response body (JSON parsed or jQuery object for XMLs)
            var losya = JSON.parse(response.getBody());

            global.currentUser = email;
            if(losya.toString() == "null")res.render('signin', {disp:'Email/password is incorrect!'});
            else {
                var ses;
                ses = req.session;
                ses.email = email;
                ses.ids = [];

                res.redirect('signin2');
            }
        });

});

module.exports = router;