import AppStorage from "./AppStorage";
import Global from "./Global";

var statCount = 0;

function getInfo(callback) {
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
            tag: "archiveScore@queryCourseScore",
            branch: "latest",
            params: {},
            rowLimit: 15
        })
    })
        .then(response => response.json())
        .then(responseJson => {
            scoreJson = parseScoreData(responseJson.value);
            AppStorage._save("scoreJson", scoreJson);
            statCount = 0;
            for (var i in scoreJson) {
                storeStatData(scoreJson[i].asId, scoreJson, callback);
            }
        })
        .catch(error => {
            console.error(error);
            callback("error");
        });
}

function parseScoreData(scoreJson) {
    var returnJson = [];
    for (var i in scoreJson) {
        var item = {};
        //id
        item.asId = scoreJson[i].asId;
        //名称
        item.courName = scoreJson[i].course.courName;
        //学分
        item.credit = scoreJson[i].credit;
        //发布日期
        item.dateScore = scoreJson[i].dateScore;
        //绩点
        item.gpoint = scoreJson[i].gpoint;
        //是否通过
        item.isPass = scoreJson[i].isPass;
        //是否重修
        item.isReselect = scoreJson[i].isReselect;
        //分数
        item.score = scoreJson[i].score;
        //类型 4160必修课，4161选修课,4162限选课,4163校选修课,4164其他
        item.type = scoreJson[i].type5;
        //学期
        item.termName = scoreJson[i].teachingTerm.termName;
        returnJson.push(item);
    }
    return returnJson;
}

function storeStatData(asId, scoreJson, callback) {
    let loginURL = "http://10.60.65.8/ntms/score/course-score-stat.do";
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
        body: JSON.stringify({ asId: asId })
    })
        .then(response => response.json())
        .then(responseJson => {
            AppStorage._save("scoreStat" + asId, responseJson.items);
            statCount++;
            hasGetScore(scoreJson, callback);
        })
        .catch(error => {
            console.error(error);
            callback("error");
        });
}
function hasGetScore(scoreJson, callback) {
    if (statCount == scoreJson.length) {
        callback(scoreJson);
    }
}

export default getInfo;
