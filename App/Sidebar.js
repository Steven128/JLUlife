/**
 * 侧边栏
 */
import React, { Component } from "react";
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    StatusBar,
    Platform,
    Dimensions,
    SafeAreaView,
    ToastAndroid
} from "react-native";
import { DrawerItems } from "react-navigation";
import Global from "../src/Global";
import AppStorage from "../src/AppStorage";
import HandleNewSettings from "../src/HandleNewSettings";
import {
    isFirstTime,
    checkUpdate,
    downloadUpdate,
    switchVersionLater,
    markSuccess
} from "react-native-update";
import _updateConfig from "../update.json";
const { appKey } = _updateConfig[Platform.OS];

const { width, height } = Dimensions.get("window");

export default class Sidebar extends Component {
    static navigationOptions = {
        title: "Welcome"
    };
    constructor(props) {
        super(props);
        this.state = { getSettings: false };
    }

    componentWillMount() {
        //加载设置
        AppStorage._load("settings", res => {
            if (res.message == "success") {
                Global.settings = res.content;
            } else {
                Global.settings = { theme: {}, class: {} };
            }
            HandleNewSettings();
            this.setState({
                getSettings: true
            });
            this.checkUpdate();
            if (isFirstTime) {
                markSuccess();
            }
        });
    }
    doUpdate = info => {
        downloadUpdate(info)
            .then(hash => {
                switchVersionLater(hash);
            })
            .catch(err => {
                if (__DEV__) console.log(err);
            });
    };
    checkUpdate = () => {
        checkUpdate(appKey)
            .then(info => {
                if (info.update) {
                    this.doUpdate(info);
                }
            })
            .catch(err => {
                if (__DEV__) console.log(err);
            });
    };
    render() {
        return this.state.getSettings ? (
            <View
                style={[
                    styles.container,
                    { backgroundColor: Global.settings.theme.backgroundColor }
                ]}
            >
                <StatusBar
                    backgroundColor={Global.settings.theme.backgroundColor}
                    barStyle="light-content"
                    translucent={false}
                />
                <SafeAreaView
                    style={{
                        flex: 1,
                        backgroundColor: Global.settings.theme.backgroundColor
                    }}
                >
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <View
                            style={[
                                styles.greetingWrap,
                                {
                                    backgroundColor:
                                        Global.settings.theme.backgroundColor,
                                    height: height * 0.3,
                                    paddingTop: height * 0.3 - 70
                                }
                            ]}
                        >
                            <Text style={styles.greeting}>
                                {"你好，" +
                                    (Global.currentStuName == ""
                                        ? "游客"
                                        : Global.currentStuName)}
                            </Text>
                            <Text style={[styles.greeting, { fontSize: 14 }]}>
                                {Global.currentStuName == ""
                                    ? "请登录"
                                    : "现在是 第" +
                                      global.getCurrentWeek(Global.startDate) +
                                      "周"}
                            </Text>
                        </View>
                        <ScrollView style={{ flex: 1 }}>
                            <DrawerItems {...this.props.items} />
                            <View style={{ height: 30 }} />
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </View>
        ) : (
            <View />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greetingWrap: {
        paddingLeft: 15
    },
    greeting: {
        fontSize: 20,
        color: "#fff",
        paddingBottom: 10
    },
    loginBtn: {
        backgroundColor: "#fff",
        padding: 0,
        height: 30,
        width: 90
    }
});
