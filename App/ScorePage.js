/**
 * 成绩查询页
 */
import React, { Component } from "react";
import {
    View,
    Dimensions,
    ActivityIndicator,
    ToastAndroid,
    StyleSheet,
    StatusBar,
    Platform,
    SafeAreaView,
    Alert
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import ScoreView from "../src/Score/ScoreView";
import AppStorage from "../src/AppStorage";
import ScoreInterface from "../src/FetchInterface/ScoreInterface";
import Toast from "react-native-easy-toast";

const { width, height } = Dimensions.get("window");

export default class ScorePage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {
            getScore: false,
            statCount: 0,
            scoreList: []
        };
    }
    componentDidMount() {
        AppStorage._load("scoreJson", res => {
            if (res.message == "success") {
                this.setState({
                    scoreList: res.content,
                    getScore: true
                });
            } else if (
                res.message == "error" &&
                !Global.isOnline &&
                !Global.checkingOnline
            ) {
                this.props.navigation.navigate("Login");
            }
        });
        if (!this.state.getScore) {
            if (Global.isOnline)
                ScoreInterface(res => {
                    if (res.message == "success") {
                        this.setState({
                            scoreList: res.content,
                            getScore: true
                        });
                    } else {
                        Global.isOnline = false;
                        Global.cookie = "";
                    }
                });
            else {
                Platform.OS === "ios"
                    ? this.refs.toast.show("登录后才能刷新成绩哟~", 2000)
                    : ToastAndroid.show(
                          "登录后才能刷新成绩哟~",
                          ToastAndroid.LONG
                      );
            }
        }
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
                            text: "成绩查询",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                        rightComponent={
                            <Button
                                containerStyle={{
                                    borderWidth: 1,
                                    borderColor: "#ffffff",
                                    borderRadius: 3
                                }}
                                titleStyle={{
                                    fontSize: 12,
                                    paddingHorizontal: 5,
                                    paddingVertical: 4
                                }}
                                title="学分绩点查询"
                                clear
                                onPress={() => {
                                    if (Global.isOnline)
                                        this.props.navigation.navigate("Stat");
                                    else {
                                        Alert.alert(
                                            "提示",
                                            "登录后才能查询哟~",
                                            [{ text: "知道啦" }]
                                        );
                                    }
                                }}
                            />
                        }
                    />
                    {this.state.getScore ? (
                        <ScoreView scoreList={this.state.scoreList} />
                    ) : (
                        <View
                            style={{
                                paddingVertical: height / 2 - 150,
                                backgroundColor: "transparent"
                            }}
                        >
                            <ActivityIndicator
                                style={{}}
                                size="large"
                                color={Global.settings.theme.backgroundColor}
                            />
                        </View>
                    )}
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
