import md5, { hex_md5 } from "react-native-md5";
import Global from "../Global";
import AppStorage from "../AppStorage";
import cheerio from "cheerio";

var loginURL = "http://cjcx.jlu.edu.cn/score/action/security_check.php";
var getStuInfoURL =
    "http://cjcx.jlu.edu.cn/score/action/getCurrentUserInfo.php";
var getTermInfoURL = "http://cjcx.jlu.edu.cn/score/action/service_res.php";

/**
 *
 * @param {String} j_username 用户名（教学号）
 * @param {String} j_password 密码
 * @param {Function} callback 回调
 */
function login(j_username, j_password, callback) {
    var j_password_origin = j_password;
    j_password = hex_md5("UIMS" + j_username + j_password);
    var cookie = hex_md5(
        j_username + j_password + new Date().getTime()
    ).substring(0, 26);
    fetch(loginURL, {
        method: "POST",
        headers: {
            Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "max-age=0",
            Connection: "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie:
                "loginPage=userLogin.jsp; alu=" +
                j_username +
                "; alp=" +
                j_password +
                "; ESSIONID=; " +
                "PHPSESSID=" +
                cookie,
            Host: "cjcx.jlu.edu.cn",
            Origin: "http://cjcx.jlu.edu.cn",
            Referer: "http://cjcx.jlu.edu.cn/score/userLogin.php"
        },
        body: "j_username=" + j_username + "&j_password=" + j_password
    })
        .then(response => response)
        .then(response => {
            if (response.url.indexOf("index.php") > -1) {
                Global.loginInfo.j_username = j_username;
                Global.loginInfo.j_password = j_password_origin;
                //存入缓存
                AppStorage._save("loginInfo", {
                    jUsername: j_username,
                    jPassword: j_password_origin
                });
                getStuInfo(j_username, j_password, cookie, callback);
            } else {
                response = response._bodyInit;

                const $ = cheerio.load(response);
                var reason = $("#error_message").html();
                reason = unescape(
                    reason.replace(/&#x/g, "%u").replace(/;/g, "")
                );
                callback({ message: "error", reason: "wrong_password" });
            }
        })
        .catch(error => {
            if (__DEV__) console.error(error);
            callback({ message: "error", reason: "wrong" });
        });
}

/**
 * 登录成功后获取个人信息
 * @param {String} j_username 教学号
 * @param {Function} callback 回调
 */
function getStuInfo(j_username, j_password, cookie, callback) {
    fetch(getStuInfoURL, {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            Connection: "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie:
                "loginPage=userLogin.jsp; alu=" +
                j_username +
                "; alp=" +
                j_password +
                "; ESSIONID=; " +
                "PHPSESSID=" +
                cookie,
            Host: "cjcx.jlu.edu.cn",
            Origin: "http://cjcx.jlu.edu.cn",
            Referer: "http://cjcx.jlu.edu.cn/score/index.php"
        },
        body: ""
    })
        .then(response => response.json())
        .then(responseJson => {
            Global.defRes.adcId = responseJson.defRes.adcId;
            Global.defRes.campus = responseJson.defRes.campus;
            Global.defRes.department = responseJson.defRes.department;
            Global.defRes.personId = responseJson.defRes.personId;
            Global.defRes.school = responseJson.defRes.school;
            Global.defRes.schType = responseJson.defRes.schType;
            Global.defRes.teachingTerm = responseJson.defRes.teachingTerm;
            Global.defRes.term_a = responseJson.defRes.term_a;
            Global.defRes.term_l = responseJson.defRes.term_l;
            Global.defRes.term_s = responseJson.defRes.term_s;
            Global.defRes.year = responseJson.defRes.year;
            Global.currentStuName = responseJson.nickName;
            if (Global.defRes.teachingTerm == undefined)
                Global.defRes.teachingTerm = Global.defRes.term_s;
            //存入缓存
            AppStorage._save("defRes", Global.defRes);
            AppStorage._save("currentStuName", Global.currentStuName);
            getTermInfo(j_username, j_password, cookie, callback);
        })
        .catch(error => {
            if (__DEV__) {
                console.log("getCurrentStuInfo error");
                console.error(error);
            }
            callback({ message: "error", reason: "wrong" });
        });
}

/**
 * 获取学期信息
 * @param {String} j_username 教学号
 * @param {Function} callback 回调
 */
function getTermInfo(j_username, j_password, cookie, callback) {
    fetch(getTermInfoURL, {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            Connection: "keep-alive",
            "Content-Type": "application/json",
            Cookie:
                "loginPage=userLogin.jsp; alu=" +
                j_username +
                "; alp=" +
                j_password +
                "; ESSIONID=; " +
                "PHPSESSID=" +
                cookie,
            Host: "cjcx.jlu.edu.cn",
            Origin: "http://cjcx.jlu.edu.cn",
            Referer: "http://cjcx.jlu.edu.cn/score/index.php"
        },
        body: JSON.stringify({
            type: "search",
            res: "teachingTerm",
            orderBy: "termId desc",
            tag: "teachingTerm"
        })
    })
        .then(response => response.json())
        .then(responseJson => {
            responseJson = responseJson.items;
            var termJson = [];
            for (var i in responseJson) {
                var item = {};
                item.termId = responseJson[i].termId;
                item.termName = responseJson[i].termName;
                item.weeks = responseJson[i].weeks;
                item.startDate =
                    responseJson[i].startDate == undefined
                        ? undefined
                        : responseJson[i].startDate.substring(0, 10);
                termJson.push(item);
            }
            Global.termJson = termJson;
            for (var i in termJson) {
                if (termJson[i].termId == Global.defRes.teachingTerm) {
                    Global.termName = termJson[i].termName;
                    Global.startDate = termJson[i].startDate;
                    console.log(Global);
                }
            }
            Global.cookie = cookie;
            Global.isOnline = true;
            callback({ message: "success", termChanged: false });
        })
        .catch(error => {
            if (__DEV__) {
                console.log("getTermInfo error");
                console.error(error);
            }
            callback({ message: "error", reason: "wrong" });
        });
}

export default login;
