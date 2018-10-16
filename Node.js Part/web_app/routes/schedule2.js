var express = require('express');
var router = express.Router();
var user;
var sectionID;

/* GET home page. */

router.get('/', function(req, res, next) {
    var ses;
    ses = req.session;
    user = ses.email;
    if(user) {

        var sectionsIdList;

        sectionsIdList = ses.ids;

        console.log("Getik - shmetik");
        console.log(ses.ids);

        console.log("\nGetik - shmetikEnd");
        var valeriya_krasotka = "";

        if (sectionsIdList == null) {
            console.log("NULL section list");
            res.send();
        }
        else {
            var mysql = require("mysql");

            var con = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "root",
                database: "mydb"
            });
            con.query('select* from section ', function (err, res1) {
                if (err) {
                    throw err;
                    res1.send(err);
                }
                console.log("Length of query response is " + res1.length);
                for (var i = 0; i < sectionsIdList.length; i++) {

                    for (var key in res1) {
                        var rowTitle = res1[key]['title'];
                        var rowYear = res1[key]['year'];
                        var rowTerm = res1[key]['term'];
                        var rowCode = res1[key]['course_abbr'];
                        var rowCredits = res1[key]['credits'];

                        var rowInstructor = res1[key]['instructor'];
                        var rowRoom = res1[key]['room'];
                        var rowDays = res1[key]['days'];
                        var rowTime = res1[key]['time'];
                        var rowId = res1[key]['id'];
                        var rowEndTime = res1[key]['endtime'];

                        var rowInstance;
                        if (rowId == sectionsIdList[i]) {

                            valeriya_krasotka += '<li id="sec_' + sectionsIdList[i] + '" class="sectionsIdList"><div section_year="' + rowYear + '" section_term="' + rowTerm + '">'
                                + '<span class="remove_course glyphicon glyphicon-remove" aria-hidden="true"></span>'
                                + '<h4 class="c_title">' + rowTitle + '</h4>'
                                + '<p class="time" display="inline-block"><b>Time: </b><span class="start_time">' + rowTime + '</span> - <span class="end_time">' + rowEndTime + '</span></p>'
                                + '<p class="days" display="inline-block"><b>Days: </b><span class="daysWeek">' + rowDays + '</span></p>'
                                + '<input class="add_course_button" type="submit" value="Add" onclick="hello(' + sectionsIdList[i] + ')">'
                                + '</div></li>';

                        }
                    }
                }
                res.render('schedule2', {secs: valeriya_krasotka});

                con.destroy();
            });
        }
    }
    else {
    res.redirect('signin');
    }




});
router.post('/', function(req, res, next) {
    console.log("keldik postka ");
    var departureURL = req.body.departureURL;

    if(departureURL == "schedule") {
        console.log("keldik scheduldan ");
        sectionID = req.body.sectionID;
        var sectionName = req.body.sectionName;

        res.send('success by sending id of ' + sectionID);

        var ses;
        ses = req.session;
        var t = 0;
        if(ses.ids == null){
            ses.ids = [];
            ses.ids.push(sectionID);
        }
        else{
            for(var i=0; i<ses.ids.length;i++){
                if(ses.ids[i] == sectionID)t++;
            }
            if(t==0) ses.ids.push(sectionID);
        }
        console.log(ses.ids);
        req.session.save()
    }
    else{


    }

});

router.get('/save', function(req, res, next){
    res.redirect('userpage');
})
router.post('/save', function(req, res, next){
    var ses = req.session;
    var scheduleName = ses.currentSchedule;
    var k = req.body['sections[]'];
    var years = req.body['years[]'];
    var terms = req.body['terms[]'];
    var ids = req.body['sectionIDList[]'];

    console.log("Saving of sections\n");

    console.log(scheduleName);

    console.log(req.body);

    var mysql = require("mysql");


    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "mydb"
    });
    var sch = {'Schedule Name': scheduleName};
    var scheduleID = null;
    con.query('select `Schedule ID` from schedule where ?', sch, function (err, res1) {
        if (err) {
            throw err;
            res.send(err);
        }

        for (var key in res1) {
            scheduleID = res1[key]['Schedule ID'];
        }


        console.log("Schedule IDISHKA: " + scheduleID);
    }).on('end', function(){
        var sections_List='';
        for (var i = 0; i < k.length; i++) {
            var schedule_has_section_Instance = {'schedule_Schedule ID': scheduleID, section_id: ids[i], section_year: years[i], section_term: terms[i]};


             console.log(schedule_has_section_Instance);

            con.query('INSERT IGNORE INTO schedule_has_section SET ?', schedule_has_section_Instance, function (err, resichek) {
                if (err) {
                    throw err;
                    console.log(err);
                    res.send(err);
                }

                console.log('Last insert IDishka:', resichek.insertId);

            }).on('end', function(){
                console.log('Here asd zxc');
            });
        }
        console.log(sections_List);

    });



});

module.exports = router;
