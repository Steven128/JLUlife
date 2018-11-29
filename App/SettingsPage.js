import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableNativeFeedback,
    Alert,
    Slider
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import SettingItem from "../src/Setting/SettingItem";
import LogoutInterface from "../src/FetchInterface/LogoutInterface";
import AppStorage from "../src/AppStorage";
const { width, height } = Dimensions.get("window");

export default class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.handleClassItemHeightChange = this.handleClassItemHeightChange.bind(
            this
        );
        this.handleClassFontSizeChange = this.handleClassFontSizeChange.bind(
            this
        );
        this.state = {
            isOnline: Global.isOnline,
            classItemHeight: 70,
            classFontSize: 14
        };
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }
    componentDidMount() {
        this.setState({
            classItemHeight: Global.settings.class.itemHeight,
            classFontSize: Global.settings.class.fontSize
        });
    }

    componentWillUnmount() {
        Global.settings.class.itemHeight = this.state.classItemHeight;
        Global.settings.class.fontSize = this.state.classFontSize;
        AppStorage._save("settings", {
            class: {
                itemHeight: this.state.classItemHeight,
                fontSize: this.state.classFontSize
            }
        });
    }
    component;

    handleClassItemHeightChange(height) {
        this.setState({
            classItemHeight: height
        });
    }
    handleClassFontSizeChange(fontSize) {
        this.setState({
            classFontSize: fontSize
        });
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
                        borderTopColor: "#eee"
                    }}
                />
                <View style={styles.sliderWrap}>
                    <Text style={styles.sliderText}>
                        课程格子高度：{" "}
                        <Text style={styles.sliderSubText}>
                            {this.state.classItemHeight}
                        </Text>
                    </Text>
                    <Slider
                        thumbTintColor="#2089dc"
                        minimumTrackTintColor="#2089dc"
                        minimumValue={20}
                        maximumValue={120}
                        value={this.state.classItemHeight}
                        onValueChange={this.handleClassItemHeightChange}
                        step={5}
                    />
                </View>
                <View style={styles.sliderWrap}>
                    <Text style={styles.sliderText}>
                        课程字体大小：{" "}
                        <Text style={styles.sliderSubText}>
                            {this.state.classFontSize}
                        </Text>
                    </Text>
                    <Slider
                        thumbTintColor="#2089dc"
                        minimumTrackTintColor="#2089dc"
                        minimumValue={9}
                        maximumValue={18}
                        value={this.state.classFontSize}
                        onValueChange={this.handleClassFontSizeChange}
                        step={1}
                    />
                </View>
                <View
                    style={{
                        paddingHorizontal: 30,
                        paddingVertical: 5,
                        backgroundColor: "#fff",
                        borderBottomColor: "#eee",
                        borderBottomWidth: 1
                    }}
                >
                    <Text style={{ color: "#888" }}>
                        提示： 部分设置在退出此页面后才会生效哦~
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 30,
                        borderTopWidth: 1,
                        borderTopColor: "#eee"
                    }}
                >
                    {this.state.isOnline ? (
                        <TouchableNativeFeedback
                            onPress={this.logoutTapped.bind(this)}
                        >
                            <View style={styles.item}>
                                <Text>退出登录</Text>
                            </View>
                        </TouchableNativeFeedback>
                    ) : null}
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
        backgroundColor: "#efefef"
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
    sliderWrap: {
        padding: 15,
        backgroundColor: "#fff",
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        alignItems: "stretch",
        justifyContent: "center"
    },
    sliderText: {
        paddingLeft: 15,
        paddingTop: 10,
        color: "#555"
    },
    sliderSubText: { color: "#888" }
});
