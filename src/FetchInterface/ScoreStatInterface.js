import Global from "../Global";

export function getAvgGpoint(callback) {
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
            type: "query",
            res: "stat-avg-gpoint",
            params: { studId: Global.defRes.personId }
        })
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.status == 0) {
                callback({
                    message: "success",
                    content: responseJson.value[0]
                });
            } else callback({ message: "error" });
        })
        .catch(error => {
            if (__DEV__) console.error(error);
            callback({ message: "error" });
        });
}

export function getCreditStat(callback) {
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
            type: "query",
            res: "stat-credit-stud",
            params: { studId: Global.defRes.personId }
        })
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.status == 0) {
                callback({
                    message: "success",
                    content: responseJson.value
                });
            } else callback({ message: "error" });
        })
        .catch(error => {
            if (__DEV__) console.error(error);
            callback({ message: "error" });
        });
}

export function getEachYear(callback) {
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
            type: "search",
            tag: "archiveScore@queryCourseScore",
            branch: "byYear",
            params: { studId: Global.defRes.personId },
            orderBy: "teachingTerm.termId, course.courName"
        })
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.status == 0) {
                callback({
                    message: "success",
                    content: responseJson.value
                });
            } else callback({ message: "error" });
        })
        .catch(error => {
            if (__DEV__) console.error(error);
            callback({ message: "error" });
        });
}

export function getEachLesson(callback) {
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
            tag: "scoreBook@queryScoreStore",
            branch: "self",
            params: {}
        })
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.status == 0) {
                callback({
                    message: "success",
                    content: responseJson.value
                });
            } else callback({ message: "error" });
        })
        .catch(error => {
            if (__DEV__) console.error(error);
            callback({ message: "error" });
        });
}

export function getNotPassed(callback) {
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
            tag: "scoreBook@queryScoreStore",
            branch: "self",
            params: { pass: "N" }
        })
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.status == 0) {
                callback({
                    message: "success",
                    content: responseJson.value
                });
            } else callback({ message: "error" });
        })
        .catch(error => {
            if (__DEV__) console.error(error);
            callback({ message: "error" });
        });
}
