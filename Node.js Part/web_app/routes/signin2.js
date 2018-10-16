var express = require('express');
var router = express.Router();
var lUser;
/* GET home page. */
router.get('/', function(req, res, next) {
    var ses;
    ses = req.session;
    lUser = ses.email;

    if(lUser) {
        var curUs = 'Welcome, ' + lUser;
        console.log(curUs);

        var k = {user_email1: lUser};
        var mysql = require("mysql");

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "mydb"
        });
        con.query('select * from student where ?', k, function (err, rows) {
            if (err) {
                throw err;
                res.send(err);
            }
            // module.exports.user = lUser;
            console.log('Data received from Db:\n');
            console.log(rows);
            if (rows.length > 0)res.redirect('userpage');
            else res.render('signin2', {disp: ''});
            con.destroy();
        });
    }
    else {
        res.redirect('signin');
    }


});
router.post('/', function(req, res, next) {
    var year = req.body.year;
    var major = req.body.major;
    var minor = req.body.minor;
    var department = req.body.dep;

    console.log(year + " " + major + " " + minor + " " + department);
    var ses;
    ses = req.session;
    lUser = ses.email;
    if(lUser) {

        console.log('LUser: ', lUser);
        var mysql = require("mysql");

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "mydb"
        });

        var student = [{
            year: year,
            major: major,
            minor: minor,
            department_abbreviation: department,
            user_email1: lUser
        }, {year: year, major: major, minor: minor, department_abbreviation: department, user_email1: lUser}];

        con.query('INSERT INTO student SET ? ON DUPLICATE KEY UPDATE ?', student, function (err, res1) {
            if (err) {
                throw err;
                res.send(err);
            }

            console.log('Last insert ID:', res1.insertId);


            res.redirect('userpage');
            con.destroy();
        });
    }
    else {
        console.log('redirect: ', lUser);
        redirect('signin');
    }

});
module.exports = router;
