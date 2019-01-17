/**
 * 设置页
 */
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableOpacity,
    Alert,
    Switch,
    StatusBar,
    Platform,
    SafeAreaView,
    ScrollView,
    NativeModules
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import SettingItem from "../src/Setting/SettingItem";
import LogoutInterface from "../src/FetchInterface/LogoutInterface";
import AppStorage from "../src/AppStorage";
import RNBugly from "react-native-bugly";
import Dialog, {
    DialogTitle,
    DialogButton,
    DialogContent
} from "react-native-popup-dialog";

const { width, height } = Dimensions.get("window");

export default class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.handleOutOfSchoolChange = this.handleOutOfSchoolChange.bind(this);
        this.state = {
            confirmVisible: false,
            alertVisible: false,
            isOnline: Global.isOnline,
            backgroundColor: "",
            outOfSchool: Global.settings.outOfSchool
        };
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }

    componentDidMount() {
        this.setState({
            outOfSchool: Global.settings.outOfSchool
        });
        if (Platform.OS == "android") {
            NativeModules.FeedbackModule.init(
                Global.loginInfo.j_username + " " + Global.currentStuName
            );
        }
    }

    componentWillReceiveProps() {
        this.setState({
            backgroundColor: Global.settings.theme.backgroundColor
        });
    }

    componentWillUnmount() {
        Global.settings.outOfSchool = this.state.outOfSchool;
        AppStorage._save("settings", Global.settings);
    }

    handleOutOfSchoolChange(value) {
        Global.settings.outOfSchool = value;
        this.setState({
            outOfSchool: value
        });
        AppStorage._save("settings", Global.settings);
    }

    checkUpgrade() {
        RNBugly.checkUpgrade();
    }

    logoutTapped() {
        this.setState({
            confirmVisible: true
        });
    }

    logoutMain() {
        LogoutInterface(res => {
            if (res.message == "success") {
                this.setState({
                    alertVisible: true
                });
                this.setState({ isOnline: false });
            }
        });
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
                            text: "设置",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                    />
                    <ScrollView style={{ flex: 1 }}>
                        <View
                            style={{
                                marginTop: 20,
                                borderTopWidth: 1,
                                borderTopColor: "#eee"
                            }}
                        />
                        {/* <View
                            style={[
                                styles.settingWrap,
                                {
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlignVertical: "center"
                                }
                            ]}
                        >
                            <Text style={{ paddingLeft: 15, flex: 4 }}>
                                我在校外
                            </Text>
                            <Switch
                                style={{ flex: 1 }}
                                trackColor={
                                    Global.settings.theme.backgroundColor
                                }
                                thumbColor={
                                    Global.settings.theme.backgroundColor
                                }
                                value={this.state.outOfSchool}
                                onValueChange={this.handleOutOfSchoolChange}
                            />
                        </View> */}
                        <SettingItem
                            navigation={this.props.navigation}
                            title="主题皮肤"
                            nextPage="Theme"
                        />
                        <SettingItem
                            navigation={this.props.navigation}
                            title="其他设置"
                            nextPage="Additions"
                        />
                        <View
                            style={{
                                marginTop: 20,
                                borderTopWidth: 1,
                                borderTopColor: "#eee"
                            }}
                        >
                            <SettingItem
                                navigation={this.props.navigation}
                                title="关于 JLU Life"
                                nextPage="About"
                            />
                            <SettingItem
                                navigation={this.props.navigation}
                                title="隐私政策"
                                nextPage="Privacy"
                            />
                            {Platform.OS === "ios" ? (
                                <TouchableOpacity
                                    activeOpacity={0.75}
                                    onPress={() => {
                                        NativeModules.FeedbackModule.openFeedbackActivity(
                                            {
                                                platform: "ios"
                                            }
                                        );
                                        // this.props.navigation.navigate(
                                        //     "FeedBack"
                                        // );
                                    }}
                                >
                                    <View style={styles.item}>
                                        <Text>问题反馈&amp;建议</Text>
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <TouchableNativeFeedback
                                    onPress={() => {
                                        NativeModules.FeedbackModule.openFeedbackActivity(
                                            {
                                                platform: "android"
                                            }
                                        );
                                    }}
                                >
                                    <View style={styles.item}>
                                        <Text>问题反馈&amp;建议</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            )}
                            <SettingItem
                                navigation={this.props.navigation}
                                title="评分&amp;捐赠开发者"
                                nextPage="Donate"
                            />
                            {Platform.OS === "ios" ? null : (
                                <TouchableNativeFeedback
                                    onPress={this.checkUpgrade.bind(this)}
                                >
                                    <View style={styles.item}>
                                        <Text>检查更新</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            )}
                        </View>
                        {this.state.isOnline ? (
                            <View
                                style={{
                                    marginVertical: 20,
                                    borderTopWidth: 1,
                                    borderTopColor: "#eee"
                                }}
                            >
                                {Platform.OS === "ios" ? (
                                    <TouchableOpacity
                                        activeOpacity={0.75}
                                        onPress={this.logoutTapped.bind(this)}
                                    >
                                        <View style={styles.item}>
                                            <Text>退出登录</Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableNativeFeedback
                                        onPress={this.logoutTapped.bind(this)}
                                    >
                                        <View style={styles.item}>
                                            <Text>退出登录</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                )}
                            </View>
                        ) : null}
                    </ScrollView>
                </View>
                <Dialog
                    visible={this.state.confirmVisible}
                    dialogTitle={
                        <DialogTitle
                            title="真的要退出登录吗？"
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
                            text="我再想想"
                            textStyle={{
                                color: "#6a6a6a",
                                fontSize: 14,
                                fontWeight: "normal"
                            }}
                            onPress={() => {
                                this.setState({ confirmVisible: false });
                            }}
                        />,
                        <DialogButton
                            text="确定"
                            textStyle={{
                                color: Global.settings.theme.backgroundColor,
                                fontSize: 14,
                                fontWeight: "normal"
                            }}
                            onPress={() => {
                                this.setState({ confirmVisible: false });
                                this.logoutMain();
                            }}
                        />
                    ]}
                    width={0.75}
                    height={0.45 * (width / height)}
                    containerStyle={styles.dialog}
                >
                    <DialogContent style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    paddingVertical: 10,
                                    alignItems: "center",
                                    flex: 1
                                }}
                            >
                                <Text style={{ flex: 1, color: "#6a6a6a" }}>
                                    退出登录会清空你的一切信息
                                </Text>
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>
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
                                color: Global.settings.theme.backgroundColor,
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
                    <DialogContent style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    paddingVertical: 10,
                                    alignItems: "center",
                                    flex: 1
                                }}
                            >
                                <Text style={{ flex: 1, color: "#6a6a6a" }}>
                                    你已退出登录啦，换个账号吧~
                                </Text>
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        height: 60,
        textAlign: "left",
        justifyContent: "center",
        textAlignVertical: "center",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingHorizontal: 30
    },
    settingWrap: {
        padding: 15,
        backgroundColor: "#fff",
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        alignItems: "stretch",
        justifyContent: "center"
    },
    settingText: {
        paddingLeft: 15,
        paddingTop: 10,
        color: "#555"
    }
});
