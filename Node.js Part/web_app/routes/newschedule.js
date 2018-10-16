var express = require('express');
var router = express.Router();
var user;
/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('newschedule', {disp: ''});

});
router.post('/', function(req, res, next) {

    var schedulename = req.body.schedulename;
    var ses;
    ses = req.session;
    user = ses.email;

    if(user) {
        console.log('LUser: ', user);
        var mysql = require("mysql");

// First you need to create a connection to the db
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "mydb"
        });


        var schedule = {'Schedule ID': null, 'Schedule Name': schedulename};
        con.query('INSERT INTO schedule SET ? ', schedule, function (err, resichek) {
            if (err) {
                throw err;
                res.send(err);
            }
            var pp = resichek.insertId;
            console.log('Last insert IDishkaPP:', pp);


            //var sch = {'Schedule ID': pp, 'Schedule Name': schedulename};
            var q = [user, pp];
            con.query('INSERT INTO student_has_schedule values(?, ?)', q, function (err, resik) {
                if (err) {
                    throw err;
                    res.send(err);
                }

                console.log('Last insert ID:', resik.insertId);
                var ses;
                ses = req.session;
                ses.currentSchedule = schedulename;
                res.redirect('schedule');
                con.destroy();
            });
        });
    }
    else redirect('signin');

});
module.exports = router;
