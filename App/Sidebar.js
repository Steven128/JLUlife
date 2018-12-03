import React, { Component } from "react";
import { Text, View, ScrollView, StatusBar, StyleSheet } from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { Button } from "react-native-elements";
import Global from "../src/Global";

export class Sidebar extends Component {
    static navigationOptions = {
        title: "Welcome"
    };
    constructor(props) {
        super(props);
        this.navagateTo = this.navagateTo.bind(this);
        this.state = {};
    }
    navagateTo(target) {
        this.props.navigate(target, { user: "Lucy" });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="blue" barStyle="light-content" />
                <ScrollView>
                    <SafeAreaView>
                        <View style={styles.greetingWrap}>
                            <Text style={styles.gretting}>
                                {"你好，" +
                                    (Global.currentStuName == ""
                                        ? "游客"
                                        : Global.currentStuName)}
                            </Text>
                            <Text style={[styles.gretting, { fontSize: 14 }]}>
                                {Global.currentStuName == ""
                                    ? "请登录"
                                    : "现在是 第" +
                                      global.getCurrentWeek(Global.startDate) +
                                      "周"}
                            </Text>
                            <Text />
                        </View>
                        <DrawerItems {...this.props.items} />
                        <View style={{ height: 50 }} />
                    </SafeAreaView>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    greetingWrap: {
        height: 250,
        paddingTop: 160,
        paddingLeft: 15,
        backgroundColor: "#2089dc"
    },
    gretting: {
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
