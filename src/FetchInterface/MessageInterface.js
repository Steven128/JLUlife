import Global from "../Global";

export function getMessage(callback) {
    let url = "http:/10.60.65.8/ntms/siteMessages/get-message-in-box.do";
    fetch(url, {
        method: "POST",
        headers: {
            Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "max-age=0",
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
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(responseJson => {
            var items = [];
            for (var i in responseJson.items) {
                if (responseJson.items[i].hasReaded == "N") {
                    items.push(responseJson.items[i]);
                }
            }
            callback({ message: "success", content: items });
        })
        .catch(err => {
            callback({ message: "error", reason: err });
            if (__DEV__) console.log(err);
        });
}

export function readMessage(messageId, callback) {
    console.log(JSON.stringify({ read: "Y", idList: [messageId] }));
    let url = "http://10.60.65.8/ntms/siteMessages/read-message.do";
    fetch(url, {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "max-age=0",
            Connection: "keep-alive",
            "Content-Type": "application/json",
            Cookie:
                "loginPage=userLogin.jsp; alu=" +
                Global.loginInfo.j_username +
                "; " +
                Global.cookie,
            Host: "10.60.65.8",
            Origin: "http://10.60.65.8",
            Referer: "http://10.60.65.8/ntms/index.do"
        },
        body: JSON.stringify({ read: "Y", idList: [messageId] })
    })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson);
            if (responseJson.errno == 0) {
                callback({ message: "success" });
            } else {
                callback({ message: "error", reason: responseJson });
            }
        })
        .catch(err => {
            callback({ message: "error", reason: err });
            if (__DEV__) console.log(err);
        });
}
