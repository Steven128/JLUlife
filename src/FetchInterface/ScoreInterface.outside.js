import md5, { hex_md5 } from "react-native-md5";
import AppStorage from "../AppStorage";
import Global from "../Global";

function getInfo(callback) {
    var j_password = hex_md5(
        "UIMS" + Global.loginInfo.j_username + Global.loginInfo.j_password
    );
    let loginURL = "http://cjcx.jlu.edu.cn/score/action/service_res.php";
    fetch(loginURL, {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            Connection: "keep-alive",
            "Content-Type": "application/json",
            Cookie:
                "loginPage=userLogin.jsp; alu=" +
                Global.loginInfo.j_username +
                "; alp=" +
                j_password +
                "; ESSIONID=; " +
                "PHPSESSID=" +
                Global.cookie,
            Host: "cjcx.jlu.edu.cn",
            Origin: "http://cjcx.jlu.edu.cn",
            Referer: "http://cjcx.jlu.edu.cn/score/index.php"
        },
        body: JSON.stringify({
            tag: "lessonSelectResult@oldStudScore",
            params: { xh: Global.loginInfo.j_username }
        })
    })
        .then(response => response.json())
        .then(responseJson => {
            if (__DEV__) console.log(responseJson);
            if (responseJson.errno != 0) {
                callback({ message: "error" });
            } else {
                var scoreJson = parseScoreData(responseJson.items);
                callback({ message: "success", content: scoreJson });
            }
        })
        .catch(error => {
            if (__DEV__) console.error(error);
            callback({ message: "error" });
            Global.isOnline = false;
            Global.cookie = "";
        });
}

function parseScoreData(scoreJson) {
    var returnJson = [];
    for (var i = scoreJson.length - 1; i >= 0; i--) {
        var item = {};
        //id
        item.asId = scoreJson[i].lsrId;
        //名称
        item.courName = scoreJson[i].kcmc;
        //名称
        item.courName = scoreJson[i].kcmc;
        //学分
        item.credit = scoreJson[i].credit;
        //绩点
        item.gpoint = scoreJson[i].gpoint;
        //是否重修
        item.isReselect = scoreJson[i].isReselect;
        //分数
        item.score = scoreJson[i].cj;
        //学期
        item.termName = termIdToName(scoreJson[i].termId);
        returnJson.push(item);
    }
    return returnJson;
}

function termIdToName(termId) {
    for (var i in Global.terms) {
        if (termId == Global.terms[i].termId) {
            return Global.terms[i].termName;
        }
    }
}

export default getInfo;
