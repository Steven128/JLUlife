var Global = {
    isOnline: false,
    checkingOnline: false,
    parseClassTable: false,
    cookie: "",
    loginInfo: {
        j_username: "",
        j_password: ""
    },
    outerCookie: "",
    currentStuName: "",
    startDate: "",
    termName: "",
    weekLength: "",
    defRes: {
        adcId: "",
        campus: "",
        department: "",
        personId: "",
        school: "",
        schType: "",
        teachingTerm: "",
        term_a: "",
        term_l: "",
        term_s: "",
        university: "",
        year: "",
        examDate: "",
        startDate: "",
        vacationDate: ""
    },
    defColor: [
        "#fdad8b",
        "#90daa3",
        "#93adea",
        "#6cc2e6",
        "#a0d462",
        "#ea98b5",
        "#7fc2ad",
        "#b6a4db",
        "#f6a1a1",
        "#93c6ea"
    ],
    tips: {},
    classJson: [],
    card: {
        isOnline: false,
        cookie: "",
        username: "",
        password: ""
    },
    showTips: true,
    settings: {
        outOfSchool: false,
        theme: {
            index: 0,
            color: "#ffffff",
            backgroundColor: "#2089dc",
            nightMode: false
        },
        class: {
            classLength: 11,
            navColor: "#808080",
            backgroundOpacity: 0,
            itemOpacity: 1,
            itemHeight: 70,
            fontSize: 14,
            backgroundImage: "",
            currentTermId: ""
        },
        options: {
            firstUseEval: true
        },
        weather: { city: "CN101060101", name: "长春" }
    },
    terms: [],
    homepageTips: {
        termStart: "新学期开始啦，每一天都要元气满满呀~",
        beginTerm: "本学期余额充足，但不要太贪玩哟~",
        middleTerm: "本学期已经过半，忙碌中不要忘记及时休息~",
        examTips: "本学期余额不足，该开始复习了呢",
        examWeeks: "努力，努力，再努力",
        vacationWeeks: "放假啦，疯狂玩耍叭"
    }
};

export default Global;

//计算当前为本学期第几周
function getCurrentWeek(startDate) {
    var today = new Date().toJSON().substring(0, 10);
    var startDateStr = startDate.split("-"); //将日期字符串分隔为数组,数组元素分别为年.月.日
    //根据年 . 月 . 日的值创建Date对象
    var startDateObj = new Date(
        startDateStr[0],
        startDateStr[1] - 1,
        startDateStr[2]
    );
    var todayStr = today.split("-");
    var todayObj = new Date(
        todayStr[0],
        todayStr[1] - 1,
        parseInt(todayStr[2]) + 1
    );
    var t1 = startDateObj.getTime();
    var t2 = todayObj.getTime();
    var dateTime = 1000 * 60 * 60 * 24; //每一天的毫秒数
    var minusDays = Math.floor((t2 - t1) / dateTime); //计算出两个日期的天数差
    var days = Math.abs(minusDays); //取绝对值
    return Math.ceil(days / 7); //返回周数
}
global.getCurrentWeek = getCurrentWeek;

function handleTopTips() {
    var currentWeek = global.getCurrentWeek(Global.startDate);
    if (currentWeek == 1) {
        //第一周
        return Global.homepageTips.termStart;
    } else {
        var examDate = "";
        var vacationDate = "";
        for (var i in Global.terms) {
            if (Global.terms[i].termId == Global.defRes.teachingTerm) {
                examDate = Global.terms[i].examDate;
                vacationDate = Global.terms[i].vacationDate;
                break;
            }
        }
        if (new Date(vacationDate).getTime() - new Date().getTime() <= 0) {
            //假期
            return Global.homepageTips.vacationWeeks;
        } else if (
            //考试周
            new Date(examDate).getTime() - new Date().getTime() <=
            0
        ) {
            var currentExamWeek = Math.ceil(
                ((new Date().getTime() - new Date(examDate).getTime()) /
                    1000 /
                    3600 /
                    24 +
                    1) /
                    7
            );
            return (
                "考试周第 " +
                currentExamWeek +
                " 周" +
                Global.homepageTips.examWeeks
            );
        } else {
            var weeksBeforeExam = Math.ceil(
                ((new Date(examDate).getTime() - new Date().getTime()) /
                    1000 /
                    3600 /
                    24 +
                    1) /
                    7
            );
            if (weeksBeforeExam <= 4) {
                return (
                    "距离考试周还有 " +
                    weeksBeforeExam +
                    " 周，" +
                    Global.homepageTips.examTips
                );
            } else if (weeksBeforeExam < Global.weekLength / 2) {
                return Global.homepageTips.middleTerm;
            } else {
                return Global.homepageTips.beginTerm;
            }
        }
    }
}

global.handleTopTips = handleTopTips;
