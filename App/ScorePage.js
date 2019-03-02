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
    Text,
    Alert
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import ScoreView from "../src/Score/ScoreView";
import AppStorage from "../src/AppStorage";
import ScoreHandler from "../src/FetchInterface/ScoreHandler";
import Toast from "react-native-easy-toast";
import Dialog, {
    DialogTitle,
    DialogButton,
    DialogContent
} from "react-native-popup-dialog";

const { width, height } = Dimensions.get("window");

export default class ScorePage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {
            alertVisible: false,
            alertText: "",
            getScore: false,
            statCount: 0,
            scoreList: []
        };
    }
    componentDidMount() {
        if (!Global.settings.outOfSchool) {
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
                    this.props.navigation.navigate("Login", { from: "Score" });
                }
            });
        }

        if (!this.state.getScore) {
            if (Global.isOnline) {
                ScoreHandler(res => {
                    if (res.message == "success") {
                        this.setState({
                            getScore: false
                        });
                        if (Platform.OS === "ios") {
                            if (this.refs.toast != undefined)
                                this.refs.toast.show("成绩已刷新", 2000);
                        } else {
                            ToastAndroid.show("成绩已刷新", ToastAndroid.SHORT);
                        }
                        this.setState({
                            scoreList: res.content,
                            getScore: true
                        });
                    } else {
                        if (Platform.OS === "ios") {
                            if (this.refs.toast != undefined)
                                this.refs.toast.show("网络开小差啦~", 2000);
                        } else {
                            ToastAndroid.show(
                                "网络开小差啦~",
                                ToastAndroid.SHORT
                            );
                        }
                    }
                });
            } else {
                if (Platform.OS === "ios") {
                    if (this.refs.toast != undefined)
                        this.refs.toast.show("登录后才能刷新成绩哟~", 2000);
                } else {
                    ToastAndroid.show(
                        "登录后才能刷新成绩哟~",
                        ToastAndroid.SHORT
                    );
                }
                if (Global.loginInfo.j_username == "")
                    this.props.navigation.navigate("Login", { from: "Score" });
            }
        }
    }

    componentWillReceiveProps() {
        var params = this.props.navigation.state.params;
        if (params.from == "Login") {
            ScoreHandler(res => {
                if (res.message == "success") {
                    this.setState({
                        scoreList: res.content,
                        getScore: true
                    });
                }
            });
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
                            <EIcon
                                name="menu"
                                size={28}
                                color="#ffffff"
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
                                    paddingVertical: 4,
                                    color: "#ffffff"
                                }}
                                title="学分绩点查询"
                                type="outline"
                                onPress={() => {
                                    if (
                                        Global.isOnline &&
                                        !Global.settings.outOfSchool
                                    )
                                        this.props.navigation.navigate("Stat");
                                    else if (!Global.settings.outOfSchool) {
                                        this.setState({
                                            alertText: "登录后才能查询哟~",
                                            alertVisible: true
                                        });
                                    } else {
                                        this.setState({
                                            alertText:
                                                "使用外网不能查询学分绩点哟~",
                                            alertVisible: true
                                        });
                                    }
                                }}
                            />
                        }
                    />
                    {this.state.getScore ? (
                        <ScoreView scoreList={this.state.scoreList} />
                    ) : (
                        <View
                            style={{ flex: 1, backgroundColor: "transparent" }}
                        >
                            {Global.isOnline ? (
                                <ActivityIndicator
                                    style={{ flex: 1 }}
                                    size="large"
                                    color={
                                        Global.settings.theme.backgroundColor
                                    }
                                />
                            ) : null}
                        </View>
                    )}
                    <Dialog
                        visible={this.state.alertVisible}
                        dialogTitle={
                            <DialogTitle
                                title="提示"
                                style={{
                                    backgroundColor: "#ffffff"
                                }}
                                titleStyle={{
                                    color: "#6a6a6a",
                                    fontWeight: 500
                                }}
                            />
                        }
                        actions={[
                            <DialogButton
                                text="知道啦"
                                textStyle={{
                                    color:
                                        Global.settings.theme.backgroundColor,
                                    fontSize: 14,
                                    fontWeight: "normal"
                                }}
                                onPress={() => {
                                    this.setState({ alertVisible: false });
                                }}
                            />
                        ]}
                        width={0.75}
                        height={0.45 * (width / height)}
                        containerStyle={styles.dialog}
                    >
                        <DialogContent style={{ flex: 1, paddingBottom: 0 }}>
                            <View style={{ flex: 1 }}>
                                <View
                                    style={{
                                        paddingVertical: 10,
                                        alignItems: "center",
                                        flex: 1
                                    }}
                                >
                                    <Text
                                        style={{
                                            flex: 1,
                                            color: "#6a6a6a",
                                            lineHeight: 18
                                        }}
                                    >
                                        {this.state.alertText}
                                    </Text>
                                </View>
                            </View>
                        </DialogContent>
                    </Dialog>
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
