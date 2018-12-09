import Global from "../Global";
import AppStorage from "../AppStorage";

function getClassTable(callback) {
    let loginURL = "http://10.60.65.8/ntms/service/res.do";
    fetch(loginURL, {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9",
            Connection: "keep-alive",
            "Content-Type": "application/json",
            Cookie:
                "loginPage=userLogin.jsp; pwdStrength=1; alu=" +
                Global.loginInfo.j_username +
                "; " +
                Global.cookie,
            Host: "10.60.65.8",
            Origin: "http://10.60.65.8",
            Referer: "http://10.60.65.8/ntms/index.do"
        },
        body: JSON.stringify({
            tag: "teachClassStud@schedule",
            branch: "default",
            params: {
                termId: Global.defRes.teachingTerm,
                studId: Global.defRes.personId
            }
        })
    })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson);
            var classJson = parseclassJson(responseJson.value);
            console.log(classJson);
            AppStorage._save("classJson", classJson);
            callback({ message: "success", content: classJson });
        })
        .catch(error => {
            console.log(error);
            if (__DEV__) {
                console.log("error");
                console.error(error);
                console.log(responseJson);
            }
            callback({ message: "error" });
        });
}

function parseclassJson(classJson) {
    var parsedData = [];
    for (var i in classJson) {
        //课程时间
        var lessonSchedules = classJson[i].teachClassMaster.lessonSchedules;
        for (var j in lessonSchedules) {
            var classroom = lessonSchedules[j].classroom.fullName;
            var timeBlock = lessonSchedules[j].timeBlock;
            var time = "[" + timeBlock.name.match(/第(.*?)节/)[1] + "]";
            time = JSON.parse(time);
            var endWeek = timeBlock.endWeek;
            var beginWeek = timeBlock.beginWeek;
            var dayOfWeek = timeBlock.dayOfWeek;
            var weekOddEven = timeBlock.weekOddEven;
            if (weekOddEven == undefined) weekOddEven = "";
            var singleLesson = {};
            singleLesson.classroom = classroom;
            singleLesson.beginWeek = beginWeek;
            singleLesson.endWeek = endWeek;
            singleLesson.dayOfWeek = dayOfWeek;
            singleLesson.time = time;
            singleLesson.weekOddEven = weekOddEven;
            var teachers = [];
            var lessonTeachers = classJson[i].teachClassMaster.lessonTeachers;
            for (var j in lessonTeachers) {
                var teacherName = lessonTeachers[j].teacher.name;
                teachers.push(teacherName);
            }
            //课程名称
            var lessonName =
                classJson[i].teachClassMaster.lessonSegment.fullName;
            var singleData = {};
            singleData.schedule = singleLesson;
            singleData.teachers = teachers;
            singleData.lessonName = lessonName;
            parsedData.push(singleData);
        }
        //教师
    }
    var classJson = parsedData;
    var classList = [];
    for (var week = 1; week <= Global.weekLength; week++) {
        classList.push(getClassTable(parsedData, week));
    }
    return classList;
}

function getClassTable(classJson, week) {
    var classList = [];
    for (var i in classJson) {
        var schedule = classJson[i].schedule;
        if (schedule.beginWeek <= week && schedule.endWeek >= week) {
            if (
                (schedule.weekOddEven == "O" && week % 2 == 1) ||
                (schedule.weekOddEven == "E" && week % 2 == 0) ||
                schedule.weekOddEven == ""
            )
                classList.push(classJson[i]);
        }
    }
    var classTable = [];
    for (var weekday = 1; weekday <= 7; weekday++) {
        var singleDay = [];
        var hasLessonList = [];
        for (var i in classList) {
            if (classList[i].schedule.dayOfWeek == weekday) {
                classList[i].hasLesson = true;
                classList[i].color = getColor();
                singleDay.push(classList[i]);
                for (var j in classList[i].schedule.time) {
                    hasLessonList.push(classList[i].schedule.time[j]);
                }
            }
        }
        for (var count = 1; count <= 11; count++) {
            var flag = true;
            for (var inner in hasLessonList) {
                if (count == hasLessonList[inner]) flag = false;
            }
            if (flag) {
                var blankLesson = {};
                blankLesson.hasLesson = false;
                blankLesson.schedule = {};
                blankLesson.schedule.time = [];
                blankLesson.schedule.time.push(count);
                singleDay.push(blankLesson);
            }
        }
        var asc = function(x, y) {
            return x["schedule"]["time"][0] > y["schedule"]["time"][0] ? 1 : -1;
        };
        singleDay = singleDay.sort(asc);
        classTable.push(singleDay);
    }
    return classTable;
}
function getColor() {
    var num = Math.floor(Math.random() * 10);
    return Global.defColor[num];
}

export default getClassTable;
