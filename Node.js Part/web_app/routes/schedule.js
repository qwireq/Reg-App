var express = require('express');
var router = express.Router();
var user;
var scheduleName="sampleName";
/* GET home page. */
router.get('/', function(req, res, next) {
    var ses;
    ses = req.session;
    scheduleName = ses.currentSchedule;
    //console.log("getshmet: " + scheduleName);

    user = ses.email;
    if(user) {
        res.render('schedule', {sectionList:''});
    }
    else {
        redirect('signin');
    }

});
router.post('/', function(req, res, next) {
        var sectionTitle = req.body.sectionTitle;
        var mysql = require("mysql");
        console.log("SECTION ATY " + sectionTitle);
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "mydb"
        });
        var sectionList="";
        con.query('select* from section where title like ?', '%' + sectionTitle + '%', function (err, res1) {
            if (err) {
                throw err;
                res1.send(err);
            }
            //console.log('rows1 ', res1);
            if(res1.length <1 ){
                con.query('select* from section where course_abbr like ?', '%' + sectionTitle + '%', function (err, res2) {
                    if (err) {
                        throw err;
                        res2.send(err);
                    }

                   // console.log('rows2 ', res2);

                    if(res2.length <1 ){
                        res.render('schedule', {sectionList:''});
                    }
                    else  {
                        for (var key in res2) {
                            var rowTitle = res2[key]['title'];
                            var rowCode = res2[key]['course_abbr'];
                            var rowCredits = res2[key]['credits'];

                            var rowInstructor = res2[key]['instructor'];
                            var rowRoom = res2[key]['room'];
                            var rowDays = res2[key]['days'];
                            var rowTime = res2[key]['time'];
                            var rowId  = res2[key]['id'];

                            var rowEndTime = res2[key]['endtime'];

                            var rowInstance;
                            rowInstance = jasa(rowInstance, rowTitle, rowCode, rowCredits, rowInstructor, rowRoom, rowDays, rowTime, rowId, rowEndTime);

                          //  console.log('RowInstance ' + rowInstance + "\n");
                            sectionList+=rowInstance + '\n';
                        }
                        res.render('schedule', {sectionList:sectionList});
                    }
                });
            }
            else {
                for (var key in res1) {
                    var rowTitle = res1[key]['title'];
                    var rowCode = res1[key]['course_abbr'];
                    var rowCredits = res1[key]['credits'];

                    var rowInstructor = res1[key]['instructor'];
                    var rowRoom = res1[key]['room'];
                    var rowDays = res1[key]['days'];
                    var rowTime = res1[key]['time'];
                    var rowId  = res1[key]['id'];
                    var rowEndTime = res1[key]['endtime'];

                    var rowInstance;
                    rowInstance = jasa(rowInstance, rowTitle, rowCode, rowCredits, rowInstructor, rowRoom, rowDays, rowTime, rowId, rowEndTime);
                   // console.log('RowInstance ' + rowInstance + "\n");
                     sectionList+=rowInstance + '\n';
                }
                //console.log("My tuta ");
                //console.log(req);
                res.render('schedule', {sectionList:sectionList});

                con.destroy();
                //res.send("asdasdasdasd");
            }
        });
});

function jasa(rowInstance, rowTitle, rowCode, rowCredits, rowInstructor, rowRoom, rowDays, rowTime, rowId, rowEndTime){

    console.log("in jasa func: " + scheduleName);
    rowInstance = '<tr><td>' + rowCode + '</td><td>' + rowTitle + '</td> <td>' + rowCredits + '</td> <td><input class="add_b" type="button" name="'+rowTitle+'" id="' + rowId+'" value="Add" scheduleName="' + scheduleName +'">';
    rowInstance+='<input class="info_b" type="button" name="info" value="Info">';
    rowInstance+='<div class="hidden_info hidden">';
    rowInstance+=" <div class=\"info_header\">\n" +
        "                        <h3>Info</h3>\n" +
        "                      </div>" ;
    rowInstance+=' <div class="info_body">';
    rowInstance+=' <table class="table table-hover list_table" ><thead style="font-weight:400; "><tr style="height:60px;">'+
                 '<th>Instructor</th>'+'<th>Room</th>'+ '<th>Days</th>'+ '<th>Start Time</th>'+ '<th>End Time</th>'+ '</tr>'+ '</thead>'+ '<tbody>';
    rowInstance+="<tr>\n" +
        "                  <td>"+rowInstructor +"</td>\n" +
        "                  <td>"+rowRoom+"</td>\n" +
        "                  <td>"+rowDays+"</td>" +
        "                  <td>"+rowTime+"</td>" +
        "                  <td>"+rowEndTime+"</td>";
    rowInstance+='</tr> </tbody> </table>';
    rowInstance+="</div>";
    rowInstance+="</div>";

    rowInstance+='</td></tr>';

    return rowInstance;
}
module.exports = router;
