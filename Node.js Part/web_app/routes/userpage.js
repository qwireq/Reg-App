var express = require('express');
var router = express.Router();
var user;
/* GET home page. */
router.get('/', function(req, res, next) {
    var ses;
    ses = req.session;
    user = ses.email;

    if(user) {
        //console.log(user);
        var k = {email: user};
        var mysql = require("mysql");
        var listOfSchedules = '';

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "mydb"
        });
        var z = {student_user_email1: user};
        con.query('select `Schedule Name` from schedule JOIN student_has_schedule on `Schedule ID` = `schedule_Schedule ID` where ?', z, function (err, rows) {
            if (err) {
                        throw err;
                        res.send(err);
                    }
            if (rows.length > 0) {
                listOfSchedules = "";
                for (var key in rows) {
                    var rowInstance = rows[key]["Schedule Name"];
                    console.log('RowInstance ' + rowInstance + "\n");
                    var obj = '<article class="shedule-item col-md-6"> <div class="shed" id="' + rowInstance + '"><h3 align = "center">' + rowInstance + '</h3><a href="/shedule2?shed_id=" class="button view_shed">View</a><a href="#" class="button view_shed del">Delete</a></div> </article>';
                    listOfSchedules += obj;
                }
                console.log('\n' + " listik \n" + listOfSchedules);
                res.render('userpage', {listOfSchedules: listOfSchedules, user: user, title: "Userpage"});
            }
            else res.render('userpage', {user: user, listOfSchedules: listOfSchedules, title: "Userpage"});
            con.destroy();
        });
    }
    else redirect('signin');
});

router.post('/', function(req, res, next) {
    var ses;
    ses = req.session;
    user = ses.email;

    if(user){

    }
    else redirect('signin');

});
module.exports = router;
