import md5, { hex_md5 } from "react-native-md5";
import Global from "../Global";
import AppStorage from "../AppStorage";
import cheerio from "cheerio";

var setCookieURL = "http://10.60.65.8/ntms/userLogin.jsp";
var loginURL = "http://10.60.65.8/ntms/j_spring_security_check";
var getStuInfoURL = "http://10.60.65.8/ntms/action/getCurrentUserInfo.do";
var getResURL = "http://10.60.65.8/ntms/service/res.do";
/**
 * 用户登录
 * @param {String} j_username 用户名（教学号）
 * @param {String} j_password 密码
 * @param {Function} callback 回调
 */
function login(j_username, j_password, callback) {
    var cookie = "";
    /**
     * 获取cookie
     */
    fetch(setCookieURL, {
        method: "GET",
        headers: {
            Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            Connection: "keep-alive",
            Host: "10.60.65.8",
            Pragma: "no-cache",
            Referer: "http://10.60.65.8/"
        }
    })
        .then(response => response)
        .then(responseJson => {
            let setCookie = "";
            if ((setCookie = responseJson.headers.get("set-cookie"))) {
                cookie = setCookie;
                Global.cookie = cookie;
                /**
                 * 登录
                 */
                loginMain(j_username, j_password, cookie, callback);
            } else {
                callback({ message: "error" });
            }
        })
        .catch(error => {
            if (__DEV__) console.error(error);
            callback({ message: "error" });
        });
}

/**
 *
 * @param {String} j_username 用户名（教学号）
 * @param {String} j_password 密码
 * @param {String} cookie Cookie
 * @param {Function} callback 回调
 */
function loginMain(j_username, j_password, cookie, callback) {
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
                "loginPage=userLogin.jsp; pwdStrength=1; alu=" +
                j_username +
                "; " +
                cookie,
            Host: "10.60.65.8",
            Origin: "http://10.60.65.8",
            Referer: "http://10.60.65.8/ntms/userLogin.jsp?reason=nologin"
        },
        body:
            "j_username=" +
            j_username +
            "&j_password=" +
            hex_md5("UIMS" + j_username + j_password) +
            "&mousePath=RHQABTAQAnTAgAwTCQBBTFABQTIABhTLQBzTPACDTSgCVTVQCkTXwC0TagDFTdwDWTgADmTigD5TkwEJTngEZTqgEpTtQE6TvQFKTxgFbTzQFsT0wF%2BT1QGNT1wGeT3QGvT5AHBT6wHRCwgGz"
    })
        .then(response => response)
        .then(response => {
            if (response.url.indexOf("ntms/index.do") > -1) {
                Global.loginInfo.j_username = j_username;
                Global.j_password = j_password;
                //存入缓存
                AppStorage._save("loginInfo", {
                    jUsername: j_username,
                    jPassword: j_password
                });
                getStuInfo(j_username, cookie, callback);
            } else {
                response = response._bodyInit;

                const $ = cheerio.load(response);
                var reason = $("#error_message").html();
                reason = unescape(
                    reason.replace(/&#x/g, "%u").replace(/;/g, "")
                );
                if (reason.indexOf("用户名或者密码错误") > -1) {
                    callback({ message: "error", reason: "wrong_password" });
                } else if (reason.indexOf("超时") > -1) {
                    callback({ message: "error", reason: "overtime" });
                } else {
                    callback({ message: "error", reason: "no_reason" });
                }
            }
        })
        .catch(error => {
            if (__DEV__) console.error(error);
            callback({ message: "error" });
        });
}

/**
 * 登录成功后获取个人信息
 * @param {String} j_username 教学号
 * @param {String} cookie Cookie
 * @param {Function} callback 回调
 */
function getStuInfo(j_username, cookie, callback) {
    fetch(getStuInfoURL, {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9",
            Connection: "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie:
                "loginPage=userLogin.jsp; pwdStrength=1; alu=" +
                j_username +
                "; " +
                cookie,
            Host: "10.60.65.8",
            Origin: "http://10.60.65.8",
            Referer: "http://10.60.65.8/ntms/index.do"
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
            Global.defRes.university = responseJson.defRes.university;
            Global.defRes.year = responseJson.defRes.year;
            Global.currentStuName = responseJson.nickName;
            //存入缓存
            AppStorage._save("defRes", Global.defRes);
            AppStorage._save("currentStuName", Global.currentStuName);
            getTermInfo(
                j_username,
                cookie,
                responseJson.defRes.teachingTerm,
                callback
            );
        })
        .catch(error => {
            if (__DEV__) {
                console.log("getCurrentStuInfo error");
                console.error(error);
            }
            callback({ message: "error" });
        });
}
/**
 * 获取学期信息
 * @param {String} j_username 教学号
 * @param {String} cookie Cookie
 * @param {String} teachingTerm 学期
 * @param {Function} callback 回调
 */
function getTermInfo(j_username, cookie, teachingTerm, callback) {
    fetch(getResURL, {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9",
            Connection: "keep-alive",
            "Content-Type": "application/json",
            Cookie:
                "loginPage=userLogin.jsp; pwdStrength=1; alu=" +
                j_username +
                "; " +
                cookie,
            Host: "10.60.65.8",
            Origin: "http://10.60.65.8",
            Referer: "http://10.60.65.8/ntms/index.do"
        },
        body: JSON.stringify({
            tag: "search@teachingTerm",
            branch: "byId",
            params: { termId: teachingTerm }
        })
    })
        .then(response => response.json())
        .then(responseJson => {
            Global.termName = responseJson.value[0].termName;
            var startDate = responseJson.value[0].startDate;
            startDate = startDate.substring(0, 10);
            Global.startDate = startDate;
            Global.weekLength = responseJson.value[0].weeks;
            //存入缓存
            AppStorage._save("termName", Global.termName);
            AppStorage._save("startDate", Global.startDate);
            AppStorage._save("weekLength", Global.weekLength);
            Global.isOnline = true;
            callback({ message: "success" });
        })
        .catch(error => {
            if (__DEV__) {
                console.log("getTermInfo error");
                console.error(error);
            }
            callback({ message: "error" });
        });
}

//保存为全局函数

export default login;
