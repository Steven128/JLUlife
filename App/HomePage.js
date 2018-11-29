import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    ScrollView,
    ToastAndroid,
    ActivityIndicator
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import LoginInterface from "../src/FetchInterface/LoginInterface";
import AppStorage from "../src/AppStorage";
import Weather from "../src/Home/Weather";
import NextClass from "../src/Home/NextClass";
import GetMessage from "../src/Home/GetMessage";
import SplashScreen from "rn-splash-screen";

const { width, height } = Dimensions.get("window");
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {
            isOnline: Global.isOnline,
            checkingOnline: false,
            getTips: false,
            tipsCount: 0
        };
    }

    componentWillReceiveProps() {
        this.setState({
            isOnline: Global.isOnline
        });
    }

    ComponentWillUpdate() {
        this.setState({
            isOnline: Global.isOnline
        });
    }
    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
        //加载设置
        AppStorage._load("settings", res => {
            if (res.message == "success") {
                Global.settings = res.content;
            }
        });
        //加载各种信息
        if (Global.loginInfo.j_username == "") {
            AppStorage._load("currentStuName", res => {
                if (res.message == "success") {
                    Global.currentStuName = res.content;
                }
            });
            AppStorage._load("startDate", res => {
                if (res.message == "success") {
                    Global.startDate = res.content;
                }
            });
            AppStorage._load("termName", res => {
                if (res.message == "success") {
                    Global.termName = res.content;
                }
            });
            AppStorage._load("weekLength", res => {
                if (res.message == "success") {
                    Global.weekLength = res.content;
                }
            });
            AppStorage._load("defRes", res => {
                if (res.message == "success") {
                    Global.defRes = res.content;
                }
            });
            AppStorage._load("loginInfo", res => {
                if (res.message == "success") {
                    Global.loginInfo.j_username = res.content.jUsername;
                    Global.loginInfo.j_password = res.content.jPassword;
                    this.setState({
                        checkingOnline: true
                    });
                    //
                    if (!Global.isOnline) {
                        ToastAndroid.show(
                            "正在登录，请稍后",
                            ToastAndroid.SHORT
                        );
                        Global.checkingOnline = true;
                        LoginInterface(
                            Global.loginInfo.j_username,
                            Global.loginInfo.j_password,
                            res => {
                                this.setState({
                                    checkingOnline: false
                                });
                                if (res.message == "success") {
                                    ToastAndroid.show(
                                        "登录成功",
                                        ToastAndroid.LONG
                                    );
                                    Global.isOnline = true;
                                    Global.checkingOnline = false;
                                    this.setState({
                                        isOnline: true,
                                        checkingOnline: false
                                    });
                                } else {
                                    ToastAndroid.show(
                                        "网络开小差啦，看看是不是连上校园网了呢~",
                                        ToastAndroid.LONG
                                    );
                                    Global.checkingOnline = false;
                                    this.setState({
                                        checkingOnline: false
                                    });
                                }
                            }
                        );
                    }
                } else if (res.message == "error") {
                    this.props.navigation.navigate("Login");
                }
            });
        }
        if (JSON.stringify(Global.tips) == "{}") {
            //获取今日天气
            let url = "http://api.help.bj.cn/apis/weather?id=101060101";
            fetch(url, {
                method: "GET"
            })
                .then(response => response.text())
                .then(responseJson => {
                    responseJson = responseJson.replace(/\r/g, "");
                    responseJson = responseJson.replace(/\n/g, "");
                    responseJson = JSON.parse(responseJson);
                    Global.tips.weatherInfo = responseJson;
                    this.setState({ tipsCount: this.state.tipsCount + 1 });
                    this.addTips();
                });
            //获取明日天气
            url = "http://api.help.bj.cn/apis/weather2d?id=长春";
            fetch(url, {
                method: "GET"
            })
                .then(response => response.text())
                .then(responseJson => {
                    responseJson = responseJson.replace(/\r/g, "");
                    responseJson = responseJson.replace(/\n/g, "");
                    responseJson = JSON.parse(responseJson);
                    Global.tips.tomorrowWeather = responseJson.tomorrow;
                    this.setState({ tipsCount: this.state.tipsCount + 1 });
                    this.addTips();
                });
            //获取农历
            url =
                "http://api.help.bj.cn/apis/nongli/?id=101060101&now=" +
                encodeURIComponent(new Date().toJSON);
            fetch(url, {
                method: "GET"
            })
                .then(response => response.text())
                .then(responseJson => {
                    responseJson = responseJson.replace(/\r/g, "");
                    responseJson = responseJson.replace(/\n/g, "");
                    responseJson = JSON.parse(responseJson);
                    Global.tips.lunarCalendar =
                        responseJson.data[16].val + responseJson.data[21].val;
                    this.setState({ tipsCount: this.state.tipsCount + 1 });
                    this.addTips();
                });
            //获取空气质量
            url = "http://api.help.bj.cn/apis/aqi2?id=101060101";
            fetch(url, {
                method: "GET"
            })
                .then(response => response.text())
                .then(responseJson => {
                    responseJson = responseJson.replace(/\r/g, "");
                    responseJson = responseJson.replace(/\n/g, "");
                    responseJson = JSON.parse(responseJson);
                    Global.tips.aqi = responseJson;
                    this.setState({ tipsCount: this.state.tipsCount + 1 });
                    this.addTips();
                })
                .catch(error => {
                    console.log("aqi error");
                    console.error(error);
                });
        } else {
            this.setState({
                getTips: true
            });
        }
    }

    addTips() {
        if (this.state.tipsCount == 4) {
            this.setState({
                getTips: true
            });
        }
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }
    render() {
        const { navigate } = this.props.navigation;
        var item;
        if (
            (this.state.isOnline || Global.isOnline) &&
            (!this.state.checkingOnline || !Global.checkingOnline)
        ) {
            item = (
                <View>
                    <Text style={styles.greeting}>
                        {"你好，" + Global.currentStuName}
                    </Text>
                    <Text style={{ color: "#888" }}>
                        {"现在是 " +
                            Global.termName.substring(0, 9) +
                            " 学年度 " +
                            Global.termName.substring(
                                9,
                                Global.termName.length
                            )}{" "}
                        第{global.getCurrentWeek(Global.startDate)}周
                    </Text>
                </View>
            );
        } else if (
            (!this.state.isOnline || !Global.isOnline) &&
            (this.state.checkingOnline || Global.checkingOnline)
        ) {
            item = (
                <View>
                    <Text style={styles.greeting}>
                        {"你好，" + Global.currentStuName}
                    </Text>
                    <View style={{}} />
                    <Text style={{ color: "#888" }}>正在登录</Text>
                    <ActivityIndicator
                        style={{ width: 50 }}
                        size="small"
                        color="#2089dc"
                    />
                </View>
            );
        } else if (
            (!this.state.isOnline || !Global.isOnline) &&
            (!this.state.checkingOnline || !Global.checkingOnline) &&
            Global.currentStuName != ""
        ) {
            item = (
                <View>
                    <Text style={styles.greeting}>
                        {"你好，" + Global.currentStuName}
                    </Text>
                    <Button
                        buttonStyle={styles.loginBtn}
                        titleStyle={{
                            color: "#2089dc"
                        }}
                        title="登录"
                        onPress={() => {
                            this.props.navigation.navigate("Login");
                        }}
                    />
                </View>
            );
        } else {
            item = (
                <View>
                    <Text style={styles.greeting}>{"你好，游客"}</Text>
                    <Button
                        buttonStyle={styles.loginBtn}
                        titleStyle={{
                            color: "#2089dc"
                        }}
                        title="登录"
                        onPress={() => {
                            this.props.navigation.navigate("Login");
                        }}
                    />
                </View>
            );
        }
        return (
            <View style={{ backgroundColor: "#efefef", flex: 1 }}>
                <Header
                    placement="left"
                    leftComponent={
                        <Button
                            title=""
                            icon={<EIcon name="menu" size={28} color="white" />}
                            clear
                            onPress={this.openDrawer}
                        />
                    }
                    centerComponent={{
                        text: "首页",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                />
                <ScrollView style={{ height: height - 80 }}>
                    <View>
                        <View style={styles.greetingWrap}>
                            {item}
                            <View style={{ height: 15 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.greetingWrap}>
                            <Text style={styles.tipsTitle}>生活小贴士</Text>
                            <View>
                                {this.state.getTips ? (
                                    <Weather />
                                ) : (
                                    <Text style={{ color: "#888" }}>
                                        {"玩命加载中 >.<"}
                                    </Text>
                                )}
                            </View>
                            <View style={{ height: 15 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.greetingWrap}>
                            <NextClass />
                        </View>
                    </View>
                    <View>
                        <View style={styles.greetingWrap}>
                            {this.state.isOnline ? (
                                <GetMessage />
                            ) : Global.checkingOnline ? (
                                <View>
                                    <Text
                                        style={{
                                            color: "#555",
                                            fontSize: 18,
                                            paddingBottom: 15
                                        }}
                                    >
                                        消息通知
                                    </Text>
                                    <View>
                                        <Text style={styles.text}>
                                            消息加载中 (・｀ω´・)
                                        </Text>
                                    </View>
                                </View>
                            ) : (
                                <View>
                                    <Text
                                        style={{
                                            color: "#555",
                                            fontSize: 18,
                                            paddingBottom: 15
                                        }}
                                    >
                                        消息通知
                                    </Text>
                                    <View>
                                        <Text style={styles.text}>
                                            请先登录哟~
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                        <View
                            style={{ height: 15, backgroundColor: "#efefef" }}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    greetingWrap: {
        margin: 10,
        marginBottom: 0,
        padding: 15,
        backgroundColor: "#fff"
        // borderWidth: 1,
        // borderColor: "#2089dc"
    },
    greeting: {
        fontSize: 20,
        fontWeight: "normal",
        paddingTop: 15,
        paddingBottom: 15
    },
    loginBtn: {
        backgroundColor: "#fff",
        width: 90,
        borderWidth: 1,
        borderColor: "#2089dc"
    },
    tipsTitle: {
        color: "#555",
        fontSize: 18,
        paddingBottom: 15
    },
    text: {
        color: "#888",
        paddingVertical: 1,
        paddingHorizontal: 15
    }
});
