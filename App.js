import React, { Component } from "react";
import { Dimensions, Platform } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import AIcon from "react-native-vector-icons/AntDesign";
import md5, { hex_md5 } from "react-native-md5";
import AppStorage from "./src/AppStorage";
import Global from "./src/Global";

import HomePage from "./App/HomePage";
import SplashTipsPage from "./App/Home/SplashTipsPage";
import TablePage from "./App/TablePage";
import AddClassPage from "./App/Class/AddClassPage";
import EditClassPage from "./App/Class/EditClassPage";
import NotificationPage from "./App/NotificationPage";
import NotificationDetailPage from "./App/Notification/NotificationDetailPage";
import NotificationSearchPage from "./App/Notification/NotificationSearchPage";
import EducationPage from "./App/EducationPage";
import EducationDetailPage from "./App/Education/EducationDetailPage";
import ScorePage from "./App/ScorePage";
import ScoreStatPage from "./App/Score/ScoreStatPage";
import ScoreStatDetailPage from "./App/Score/ScoreStatDetailPage";
import QueryPage from "./App/QueryPage";
import EmptyRoomPage from "./App/Query/EmptyRoomPage";
import EvaluationPage from "./App/Query/EvaluationPage";
import LibraryPage from "./App/Query/LibraryPage";
import CardPage from "./App/CardPage";
import CardLoginPage from "./App/Card/CardLoginPage";
import SettingsPage from "./App/SettingsPage";
import ThemeSettingsPage from "./App/Settings/ThemeSettingsPage";
import ClassSettingsPage from "./App/Settings/ClassSettingsPage";
import AboutPage from "./App/Settings/AboutPage";
import PrivacyPage from "./App/Settings/PrivacyPage";
import DonatePage from "./App/Settings/DonatePage";
import AdditionsPage from "./App/Settings/AdditionsPage";
import WeatherSettingsPage from "./App/Settings/WeatherSettingsPage";
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
    },
    SplashTips: {
        screen: SplashTipsPage,
        navigationOptions: {
            header: null
        }
    },
    WeatherSettings: {
        screen: WeatherSettingsPage,
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
    },
    AddClass: {
        screen: AddClassPage,
        navigationOptions: {
            header: null
        }
    },
    EditClass: {
        screen: EditClassPage,
        navigationOptions: {
            header: null
        }
    },
    ClassSettings: {
        screen: ClassSettingsPage,
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
    },
    Stat: {
        screen: ScoreStatPage,
        navigationOptions: {
            header: null
        }
    },
    Detail: {
        screen: ScoreStatDetailPage,
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
    },
    Search: {
        screen: NotificationSearchPage,
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

const QueryStack = createStackNavigator({
    Main: {
        screen: QueryPage,
        navigationOptions: {
            header: null
        }
    },
    EmptyRoom: {
        screen: EmptyRoomPage,
        navigationOptions: {
            header: null
        }
    },
    Evaluation: {
        screen: EvaluationPage,
        navigationOptions: {
            header: null
        }
    },
    Library: {
        screen: LibraryPage,
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
    Theme: {
        screen: ThemeSettingsPage,
        navigationOptions: {
            header: null
        }
    },
    Class: {
        screen: ClassSettingsPage,
        navigationOptions: {
            header: null
        }
    },
    About: {
        screen: AboutPage,
        navigationOptions: {
            header: null
        }
    },
    Privacy: {
        screen: PrivacyPage,
        navigationOptions: {
            header: null
        }
    },
    Donate: {
        screen: DonatePage,
        navigationOptions: {
            header: null
        }
    },
    Additions: {
        screen: AdditionsPage,
        navigationOptions: {
            header: null
        }
    },
    WeatherSettings: {
        screen: WeatherSettingsPage,
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
        Query: {
            screen: QueryStack,
            navigationOptions: {
                drawerLabel: "信息查询",
                drawerIcon: () => (
                    <AIcon
                        name={"search1"}
                        size={18}
                        style={{ color: "#000" }}
                    />
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