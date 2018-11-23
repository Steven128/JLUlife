import React, { Component } from "react";
import { Dimensions, ToastAndroid } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import AIcon from "react-native-vector-icons/AntDesign";
import md5, { hex_md5 } from "react-native-md5";
import AppStorage from "./src/AppStorage";
import Global from "./src/Global";

import HomePage from "./App/HomePage";
import TablePage from "./App/TablePage";
import NotificationPage from "./App/NotificationPage";
import NotificationDetailPage from "./App/NotificationDetailPage";
import EducationPage from "./App/EducationPage";
import EducationDetailPage from "./App/EducationDetailPage";
import ScorePage from "./App/ScorePage";
import CardPage from "./App/CardPage";
import CardLoginPage from "./App/CardLoginPage";
import SettingsPage from "./App/SettingsPage";
import AboutPage from "./App/AboutPage";
import LoginPage from "./App/LoginPage";
import Sidebar from "./App/Sidebar";

const { width, height } = Dimensions.get("window");

const HomeStack = createStackNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: LoginPage,
        navigationOptions: {
            header: null
        }
    }
});
const TableStack = createStackNavigator({
    Table: {
        screen: TablePage,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: LoginPage,
        navigationOptions: {
            header: null
        }
    }
});
const ScoreStack = createStackNavigator({
    Score: {
        screen: ScorePage,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: LoginPage,
        navigationOptions: {
            header: null
        }
    }
});

const NotificationStack = createStackNavigator({
    List: {
        screen: NotificationPage,
        navigationOptions: {
            header: null
        }
    },
    Item: {
        screen: NotificationDetailPage,
        navigationOptions: {
            header: null
        }
    }
});

const EducationStack = createStackNavigator({
    List: {
        screen: EducationPage,
        navigationOptions: {
            header: null
        }
    },
    Item: {
        screen: EducationDetailPage,
        navigationOptions: {
            header: null
        }
    }
});

const CardStack = createStackNavigator({
    Main: {
        screen: CardPage,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: CardLoginPage,
        navigationOptions: {
            header: null
        }
    }
});

const SettingsStack = createStackNavigator({
    Settings: {
        screen: SettingsPage,
        navigationOptions: {
            header: null
        }
    },
    About: {
        screen: AboutPage,
        navigationOptions: {
            header: null
        }
    }
});

const Drawer = createDrawerNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                drawerLabel: "首页",
                drawerIcon: () => (
                    <AIcon name={"home"} size={18} style={{ color: "#000" }} />
                )
            }
        },
        Table: {
            screen: TableStack,
            navigationOptions: {
                drawerLabel: "课程表",
                drawerIcon: () => (
                    <AIcon name={"table"} size={18} style={{ color: "#000" }} />
                )
            }
        },
        Notification: {
            screen: NotificationStack,
            navigationOptions: {
                drawerLabel: "校内通知",
                drawerIcon: () => (
                    <AIcon
                        name={"notification"}
                        size={18}
                        style={{ color: "#000" }}
                    />
                )
            }
        },
        Education: {
            screen: EducationStack,
            navigationOptions: {
                drawerLabel: "教务通知",
                drawerIcon: () => (
                    <AIcon
                        name={"profile"}
                        size={18}
                        style={{ color: "#000" }}
                    />
                )
            }
        },
        Score: {
            screen: ScoreStack,
            navigationOptions: {
                drawerLabel: "成绩查询",
                drawerIcon: () => (
                    <AIcon name={"tago"} size={18} style={{ color: "#000" }} />
                )
            }
        },
        Card: {
            screen: CardStack,
            navigationOptions: {
                drawerLabel: "一卡通",
                drawerIcon: () => (
                    <AIcon
                        name={"creditcard"}
                        size={18}
                        style={{ color: "#000" }}
                    />
                )
            }
        },
        Setting: {
            screen: SettingsStack,
            navigationOptions: {
                drawerLabel: "设置",
                drawerIcon: () => (
                    <AIcon
                        name={"setting"}
                        size={18}
                        style={{ color: "#000" }}
                    />
                )
            }
        }
    },
    {
        drawerWidth: width * 0.75, // 展示的宽度
        drawerPosition: "left", // 抽屉在左边还是右边
        contentComponent: props => {
            return <Sidebar items={props} />;
        },
        contentOptions: {
            items: [],
            itemsContainerStyle: {},
            itemStyle: { fontWeight: "normal", color: "#000" },
            labelStyle: { fontWeight: "normal", color: "#000" }
        }
    }
);

export default Drawer;
//定义storage
global.storage = AppStorage._getStorage();

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
