import Global from "../Global";
export function getBlankList(callback) {
    let loginURL = "http://10.60.65.8/ntms/service/res.do";
    fetch(loginURL, {
        method: "POST",
        headers: {
            Accept: "*/*",
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
            tag: "student@evalItem",
            branch: "self",
            params: { blank: "Y" }
        })
    })
        .then(response => response.json())
        .then(responseJson => {
            callback({ message: "success", content: responseJson.value });
        })
        .catch(error => {
            console.log(error);
            if (__DEV__) {
                console.log("error");
                console.error(error);
                console.log(responseJson);
            }
            callback({ message: "error" });
            Global.isOnline = false;
            Global.cookie = "";
        });
}

export function getDoneList(callback) {
    let loginURL = "http://10.60.65.8/ntms/service/res.do";
    fetch(loginURL, {
        method: "POST",
        headers: {
            Accept: "*/*",
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
            tag: "student@evalItem",
            branch: "self",
            params: { done: "Y" }
        })
    })
        .then(response => response.json())
        .then(responseJson => {
            callback({ message: "success", content: responseJson.value });
        })
        .catch(error => {
            console.log(error);
            if (__DEV__) {
                console.log("error");
                console.error(error);
                console.log(responseJson);
            }
            callback({ message: "error" });
            Global.isOnline = false;
            Global.cookie = "";
        });
}

export function evalWithAnswer(body, evalItemId, callback) {
    let loginURL = "http://10.60.65.8/ntms/action/eval/eval-with-answer.do";
    fetch(loginURL, {
        method: "POST",
        headers: {
            Accept: "*/*",
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
            Referer:
                "http://10.60.65.8/ntms/page/eval/eval_detail_120.html?eitem=" +
                evalItemId
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(responseJson => {
            callback({ message: "success", content: responseJson });
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
