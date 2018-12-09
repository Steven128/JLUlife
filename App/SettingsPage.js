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
    TouchableHighlight,
    Alert,
    Slider,
    StatusBar,
    Platform
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import SettingItem from "../src/Setting/SettingItem";
import LogoutInterface from "../src/FetchInterface/LogoutInterface";
import AppStorage from "../src/AppStorage";
import isIphoneX from "../src/isIphoneX";
import RNBugly from "react-native-bugly";

const { width, height } = Dimensions.get("window");

export default class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {
            isOnline: Global.isOnline,
            backgroundColor: ""
        };
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }

    componentWillReceiveProps() {
        this.setState({
            backgroundColor: Global.settings.theme.backgroundColor
        });
    }

    checkUpgrade() {
        console.log(RNBugly.checkUpgrade());
    }

    logoutTapped() {
        Alert.alert("真的要退出登录吗？", "退出登录会清空你的一切信息", [
            {
                text: "我再想想",
                style: "cancel"
            },
            {
                text: "下定决心了",
                onPress: () =>
                    LogoutInterface(res => {
                        if (res.message == "success") {
                            Alert.alert(
                                "提示",
                                "你已退出登录啦，换个账号吧~",
                                [{ text: "知道啦" }],
                                { cancelable: false }
                            );
                        }
                        this.setState({ isOnline: false });
                    })
            }
        ]);
    }

    render() {
        const { navigate } = this.props.navigation;
        var headerStyle = {
            borderBottomColor: Global.settings.theme.backgroundColor
        };
        if (isIphoneX()) {
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
                    <View
                        style={{
                            marginTop: 20,
                            borderTopWidth: 1,
                            borderTopColor: "#eee"
                        }}
                    />
                    <SettingItem
                        navigation={this.props.navigation}
                        title="主题皮肤"
                        nextPage="Theme"
                    />
                    <SettingItem
                        navigation={this.props.navigation}
                        title="课程表设置"
                        nextPage="Class"
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
                        <SettingItem
                            navigation={this.props.navigation}
                            title="问题反馈&amp;建议"
                            nextPage="FeedBack"
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
                    <View
                        style={{
                            marginTop: 20,
                            borderTopWidth: 1,
                            borderTopColor: "#eee"
                        }}
                    >
                        {this.state.isOnline ? (
                            Platform.OS === "ios" ? (
                                <TouchableHighlight
                                    onPress={this.logoutTapped.bind(this)}
                                >
                                    <View style={styles.item}>
                                        <Text>退出登录</Text>
                                    </View>
                                </TouchableHighlight>
                            ) : (
                                <TouchableNativeFeedback
                                    onPress={this.logoutTapped.bind(this)}
                                >
                                    <View style={styles.item}>
                                        <Text>退出登录</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            )
                        ) : null}
                    </View>
                </View>
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
    }
});
