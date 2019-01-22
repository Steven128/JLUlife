/**
 * 首页
 */
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    ScrollView,
    ToastAndroid,
    ActivityIndicator,
    StatusBar,
    Platform,
    SafeAreaView,
    BackHandler
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import LoginHandler from "../src/FetchInterface/LoginHandler";
import AppStorage from "../src/AppStorage";
import Weather from "../src/Home/Weather";
import NextClass from "../src/Home/NextClass";
import GetMessage from "../src/Home/GetMessage";
import SplashScreen from "rn-splash-screen";
import Toast from "react-native-easy-toast";
import ClassInterface from "../src/FetchInterface/ClassInterface";

const { width, height } = Dimensions.get("window");
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {
            showSplashTips: false,
            isOnline: Global.isOnline,
            checkingOnline: Global.checkingOnline,
            backgroundColor: Global.settings.theme.backgroundColor,
            getClass: false,
            outOfSchool: Global.settings.outOfSchool
        };
    }

    componentWillReceiveProps() {
        this.setState({
            isOnline: Global.isOnline,
            outOfSchool: Global.settings.outOfSchool
        });
    }
    componentDidUpdate() {
        var params = this.props.navigation.state.params;
        if (params != undefined) {
            if (params.from == "SplashTips") {
                if (!this.state.isOnline && !this.state.checkingOnline) {
                    if (Global.loginInfo.j_username == "") {
                        this.props.navigation.navigate("Login", {
                            from: "Home"
                        });
                    }
                }
            } else if (params.from == "Login") {
                if (
                    Global.classJson.length == 0 &&
                    !Global.settings.outOfSchool
                ) {
                    AppStorage._load("classJson", res => {
                        if (res.message == "success") {
                            Global.classJson = res.content;
                            this.setState({
                                getClass: true
                            });
                        } else {
                            ClassInterface(res => {
                                if (res.message == "success") {
                                    Global.classJson = res.content;
                                    this.setState({
                                        getClass: true
                                    });
                                }
                            });
                        }
                    });
                }
            } else if (params.from == "WeatherSettings") {
                if (Global.tips.weatherData != undefined) {
                    if (Global.tips.weatherData.location != params.name) {
                        this.refs.weather.refreshTips();
                    }
                }
            }
        }
    }

    ComponentWillUpdate() {
        this.setState({
            isOnline: Global.isOnline,
            outOfSchool: Global.settings.outOfSchool
        });
    }

    handleShowTips() {
        if (!Global.showTips) return false;
        var flag = false;
        AppStorage._load("showTips", res => {
            if (res.message == "success") {
                if (
                    res.content.splashV210 != undefined &&
                    res.content.splashV220 != undefined &&
                    res.content.splashV240 != undefined
                ) {
                    if (
                        res.content.splashV210 ||
                        res.content.splashV220 ||
                        res.content.splashV240
                    ) {
                        flag = true;
                        Global.showTips = false;
                    }
                }
            }
            if (!flag) {
                this.setState({
                    showSplashTips: true
                });
                Global.showTips = false;
                this.props.navigation.navigate("SplashTips", {
                    tips: res.content
                });
            }
        });
    }

    componentWillMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackAndroid);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.onBackAndroid
        );
    }

    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            BackHandler.exitApp();
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show("再按一次退出 JLU Life", ToastAndroid.SHORT);
        return true;
    };

    componentDidMount() {
        //延时1秒关闭启动页
        setTimeout(() => {
            SplashScreen.hide();
        }, 1500);
        setTimeout(() => {
            this.setState({
                backgroundColor: Global.settings.theme.backgroundColor,
                outOfSchool: Global.settings.outOfSchool
            });
        }, 1000);
        this.handleShowTips();
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
                        if (Platform.OS === "ios") {
                            if (this.refs.toast != undefined)
                                this.refs.toast.show("正在登录，请稍后", 2000);
                        } else {
                            ToastAndroid.show(
                                "正在登录，请稍后",
                                ToastAndroid.SHORT
                            );
                        }

                        Global.checkingOnline = true;
                        /**
                         * 拿到用户名和密码后自动登录
                         */
                        LoginHandler(
                            Global.loginInfo.j_username,
                            Global.loginInfo.j_password,
                            res => {
                                this.setState({
                                    checkingOnline: false
                                });
                                if (res.message == "success") {
                                    if (Platform.OS === "ios") {
                                        if (this.refs.toast != undefined)
                                            this.refs.toast.show(
                                                "登录成功",
                                                5000
                                            );
                                    } else {
                                        ToastAndroid.show(
                                            "登录成功",
                                            ToastAndroid.LONG
                                        );
                                    }

                                    Global.isOnline = true;
                                    Global.checkingOnline = false;
                                    this.setState({
                                        isOnline: true,
                                        checkingOnline: false
                                    });
                                    if (Global.classJson.length == 0) {
                                        AppStorage._load("classJson", res => {
                                            if (res.message == "success") {
                                                Global.classJson = res.content;
                                                this.setState({
                                                    getClass: true
                                                });
                                            } else {
                                                if (
                                                    !Global.settings.outOfSchool
                                                )
                                                    ClassInterface(res => {
                                                        if (
                                                            res.message ==
                                                            "success"
                                                        ) {
                                                            Global.classJson =
                                                                res.content;
                                                            this.setState({
                                                                getClass: true
                                                            });
                                                        }
                                                    });
                                            }
                                        });
                                    }
                                    if (res.termChanged) {
                                        ClassInterface(res => {
                                            if (res.message == "success") {
                                                Global.classJson = res.content;
                                                this.setState({
                                                    getClass: true
                                                });
                                            }
                                        });
                                    }
                                } else {
                                    if (Platform.OS === "ios") {
                                        if (this.refs.toast != undefined) {
                                            if (Global.settings.outOfSchool)
                                                this.refs.toast.show(
                                                    "网络开小差啦，外网功能一般只有寒暑假可用哟~",
                                                    5000
                                                );
                                            else
                                                this.refs.toast.show(
                                                    "网络开小差啦，看看是不是连上校园网了呢~",
                                                    5000
                                                );
                                        }
                                    } else {
                                        if (Global.settings.outOfSchool)
                                            ToastAndroid.show(
                                                "网络开小差啦，外网功能一般只有寒暑假可用哟~",
                                                ToastAndroid.LONG
                                            );
                                        else
                                            ToastAndroid.show(
                                                "网络开小差啦，看看是不是连上校园网了呢~",
                                                ToastAndroid.LONG
                                            );
                                    }

                                    Global.checkingOnline = false;
                                    this.setState({
                                        checkingOnline: false
                                    });
                                }
                            }
                        );
                    }
                } else if (res.message == "error") {
                    if (!this.state.showSplashTips) {
                        this.props.navigation.navigate("Login", {
                            from: "Home"
                        });
                    }
                }
            });
            if (Global.classJson.length == 0) {
                AppStorage._load("classJson", res => {
                    if (res.message == "success") {
                        Global.classJson = res.content;
                        this.setState({
                            getClass: true
                        });
                    }
                });
            }
        }
    }

    handleOffline() {
        if (Platform.OS === "ios") {
            if (this.refs.toast != undefined)
                this.refs.toast.show("退出登录", 2000);
        } else {
            ToastAndroid.show("退出登录", ToastAndroid.SHORT);
        }

        this.setState({ isOnline: false });
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }
    render() {
        const { navigate } = this.props.navigation;
        var headerStyle = {
            borderBottomColor: Global.settings.theme.backgroundColor
        };
        if (Platform.OS == "ios") {
            headerStyle.paddingTop = 0;
            headerStyle.height = 44;
        }
        var item;
        if (
            (this.state.isOnline || Global.isOnline) &&
            (!this.state.checkingOnline || !Global.checkingOnline)
        ) {
            item = (
                <View>
                    <Text style={styles.greeting}>
                        {"你好，" + Global.currentStuName}
                        <Text style={{ color: "#808080", fontSize: 16 }}>
                            {this.state.outOfSchool ? " （外网模式）" : null}
                        </Text>
                    </Text>
                    <Text style={{ color: "#808080" }}>
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
                        <Text style={{ color: "#808080", fontSize: 16 }}>
                            {this.state.outOfSchool ? " （外网模式）" : null}
                        </Text>
                    </Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <ActivityIndicator
                            style={{ marginLeft: 5, marginRight: 10 }}
                            size="small"
                            color={Global.settings.theme.backgroundColor}
                        />
                        <View>
                            <Text style={{ color: "#808080" }}>正在登录</Text>
                        </View>
                    </View>
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
                        <Text style={{ color: "#808080", fontSize: 16 }}>
                            {this.state.outOfSchool ? " （外网模式）" : null}
                        </Text>
                    </Text>
                    <Button
                        buttonStyle={[
                            styles.loginBtn,
                            {
                                borderColor:
                                    Global.settings.theme.backgroundColor
                            }
                        ]}
                        titleStyle={{
                            color: Global.settings.theme.backgroundColor
                        }}
                        title="登录"
                        onPress={() => {
                            this.props.navigation.navigate("Login", {
                                from: "Home"
                            });
                        }}
                    />
                </View>
            );
        } else {
            item = (
                <View>
                    <Text style={styles.greeting}>
                        {"你好，游客"}
                        <Text style={{ color: "#808080", fontSize: 16 }}>
                            {this.state.outOfSchool ? " （外网模式）" : null}
                        </Text>
                    </Text>
                    <Button
                        buttonStyle={[
                            styles.loginBtn,
                            {
                                borderColor:
                                    Global.settings.theme.backgroundColor
                            }
                        ]}
                        titleStyle={{
                            color: Global.settings.theme.backgroundColor
                        }}
                        title="登录"
                        onPress={() => {
                            this.props.navigation.navigate("Login", {
                                from: "Home"
                            });
                        }}
                    />
                </View>
            );
        }
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: Global.settings.theme.backgroundColor
                }}
            >
                <StatusBar
                    backgroundColor={Global.settings.theme.backgroundColor}
                    barStyle="light-content"
                    translucent={false}
                />
                <Toast ref="toast" />
                <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                    <Header
                        containerStyle={headerStyle}
                        backgroundColor={Global.settings.theme.backgroundColor}
                        placement="left"
                        leftComponent={
                            <Button
                                title=""
                                icon={
                                    <EIcon
                                        name="menu"
                                        size={28}
                                        color="white"
                                    />
                                }
                                clear
                                onPress={this.openDrawer}
                            />
                        }
                        centerComponent={{
                            text: "首页",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                    />
                    <ScrollView style={{ flex: 1 }}>
                        <View>
                            <View style={styles.greetingWrap}>
                                {item}
                                <View style={{ height: 5 }} />
                            </View>
                        </View>
                        <View>
                            <View style={styles.greetingWrap}>
                                {this.state.getClass ||
                                Global.classJson.length != 0 ? (
                                    <NextClass getClass={true} />
                                ) : (
                                    <NextClass getClass={false} />
                                )}
                            </View>
                        </View>
                        {Global.settings.outOfSchool ? null : (
                            <View>
                                <View style={styles.greetingWrap}>
                                    {this.state.isOnline ? (
                                        <GetMessage
                                            handleOffline={this.handleOffline.bind(
                                                this
                                            )}
                                        />
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
                            </View>
                        )}
                        <View style={{ marginBottom: 15 }}>
                            <View style={styles.greetingWrap}>
                                <Text style={styles.tipsTitle}>生活小贴士</Text>
                                <View>
                                    <Weather
                                        navigation={this.props.navigation}
                                        ref="weather"
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greetingWrap: {
        margin: 10,
        marginBottom: 0,
        padding: 15,
        backgroundColor: "#fff"
    },
    greeting: {
        color: "#555",
        fontSize: 20,
        fontWeight: "300",
        paddingTop: 10,
        paddingBottom: 10
    },
    loginBtn: {
        backgroundColor: "#fff",
        width: 90,
        borderWidth: 1
    },
    tipsTitle: {
        color: "#555",
        fontSize: 18,
        paddingBottom: 15
    },
    text: {
        color: "#808080",
        paddingVertical: 1,
        paddingHorizontal: 15
    }
});
