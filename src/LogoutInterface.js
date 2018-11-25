/**
 * 退出登录
 */
import Global from "./Global";
import AppStorage from "./AppStorage";

function logout(callback) {
    //首先清除全局变量
    console.log("logging out............");
    Global.isOnline = false;
    Global.cookie = "";
    Global.loginInfo.j_username = "";
    Global.loginInfo.j_password = "";
    Global.currentStuName = "";
    Global.startDate = "";
    Global.termName = "";
    Global.weekLength = "";
    Global.defRes.adcId = "";
    Global.defRes.campus = "";
    Global.defRes.department = "";
    Global.defRes.personId = "";
    Global.defRes.school = "";
    Global.defRes.schType = "";
    Global.defRes.teachingTerm = "";
    Global.defRes.term_a = "";
    Global.defRes.term_l = "";
    Global.defRes.term_s = "";
    Global.defRes.university = "";
    Global.defRes.year = "";
    Global.card.isOnline = false;
    Global.card.username = "";
    Global.card.password = "";
    //清除缓存的数据
    AppStorage._remove("loginInfo");
    AppStorage._remove("defRes");
    AppStorage._remove("currentStuName");
    AppStorage._remove("termName");
    AppStorage._remove("startDate");
    AppStorage._remove("weekLength");
    AppStorage._remove("classJson");
    AppStorage._load("scoreJson", res => {
        if (res.message == "success") {
            for (var i in res.content) {
                AppStorage._remove("scoreStat" + res.content[i].asId);
            }
            AppStorage._remove("scoreJson");
        }
    });
    callback({ message: "success" });
}

export default logout;
