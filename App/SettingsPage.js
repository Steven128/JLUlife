import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableNativeFeedback,
    Alert
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import SettingItem from "../src/SettingItem";
import LogoutInterface from "../src/LogoutInterface";
const { width, height } = Dimensions.get("window");

export default class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = { language: "" };
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }
    componentDidMount() {}

    logoutTapped() {
        Alert.alert(
            "真的要退出登录吗？",
            "退出登录会清空你的一切信息",
            [
                {
                    text: "取消",
                    style: "cancel"
                },
                {
                    text: "确定",
                    onPress: () =>
                        LogoutInterface(res => {
                            if (res.message == "success") {
                                Alert.alert("已退出登录");
                            }
                        })
                }
            ]
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
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
                        text: "设置",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                />
                <View
                    style={{
                        marginTop: 30,
                        borderTopWidth: 1,
                        borderTopColor: "#ccc"
                    }}
                >
                    <TouchableNativeFeedback
                        onPress={this.logoutTapped.bind(this)}
                    >
                        <View style={styles.item}>
                            <Text>退出登录</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View
                    style={{
                        marginTop: 30,
                        borderTopWidth: 1,
                        borderTopColor: "#ccc"
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
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee"
    },
    item: {
        height: 60,
        textAlign: "left",
        justifyContent: "center",
        textAlignVertical: "center",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingHorizontal: 30
    }
});
