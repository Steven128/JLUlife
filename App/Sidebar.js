import React, { Component } from "react";
import { Text, View, ScrollView, StatusBar, StyleSheet } from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import Global from "../src/Global";
import AppStorage from "../src/AppStorage";
import HandleNewSettings from "../src/HandleNewSettings";

export class Sidebar extends Component {
    static navigationOptions = {
        title: "Welcome"
    };
    constructor(props) {
        super(props);
        this.state = { getSettings: false };
    }

    componentWillMount() {
        //加载设置
        console.log("sidebar will mount");
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
        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.getSettings ? (
                    <ScrollView>
                        <SafeAreaView>
                            <View
                                style={[
                                    styles.greetingWrap,
                                    {
                                        backgroundColor:
                                            Global.settings.theme
                                                .backgroundColor
                                    }
                                ]}
                            >
                                <Text style={styles.greeting}>
                                    {"你好，" +
                                        (Global.currentStuName == ""
                                            ? "游客"
                                            : Global.currentStuName)}
                                </Text>
                                <Text
                                    style={[styles.greeting, { fontSize: 14 }]}
                                >
                                    {Global.currentStuName == ""
                                        ? "请登录"
                                        : "现在是 第" +
                                          global.getCurrentWeek(
                                              Global.startDate
                                          ) +
                                          "周"}
                                </Text>
                                <Text />
                            </View>
                            <DrawerItems {...this.props.items} />
                            <View style={{ height: 50 }} />
                        </SafeAreaView>
                    </ScrollView>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    greetingWrap: {
        height: 250,
        paddingTop: 160,
        paddingLeft: 15
    },
    greeting: {
        fontSize: 20,
        color: "#fff",
        paddingBottom: 15
    },
    loginBtn: {
        backgroundColor: "#fff",
        padding: 0,
        height: 30,
        width: 90
    }
});

export default Sidebar;
