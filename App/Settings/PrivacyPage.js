/**
 * 设置 -> 隐私政策页
 */
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    WebView,
    StyleSheet,
    Linking,
    TouchableNativeFeedback,
    StatusBar,
    Platform,
    ScrollView,
    SafeAreaView
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import AIcon from "react-native-vector-icons/AntDesign";
import Global from "../../src/Global";

const { width, height } = Dimensions.get("window");

var { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
export default class PrivacyPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {};
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
                <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                    <Header
                        containerStyle={headerStyle}
                        backgroundColor={Global.settings.theme.backgroundColor}
                        placement="left"
                        leftComponent={
                            <EIcon
                                name="chevron-left"
                                size={28}
                                color="#ffffff"
                                onPress={() =>
                                    this.props.navigation.navigate("Settings")
                                }
                            />
                        }
                        centerComponent={{
                            text: "隐私政策",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                    />
                    <ScrollView
                        style={styles.main}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={[styles.title]}>
                            当您使用本APP，即表示您同意以下声明：
                        </Text>
                        <View style={{ padding: 15 }}>
                            <Text style={[styles.text]}>
                                <EIcon
                                    name="dot-single"
                                    color={
                                        Global.settings.theme.backgroundColor
                                    }
                                />
                                此APP并非官方应用，为个人开发，所有功能的实现均使用学校官方开放接口。查询结果如与事实有所出入，恕不承担责任。
                            </Text>
                            <Text style={[styles.text]}>
                                <EIcon
                                    name="dot-single"
                                    color={
                                        Global.settings.theme.backgroundColor
                                    }
                                />
                                使用课程表和查询成绩功能时，需要您的信息来访问教务系统，并在教务系统中留下登录痕迹。
                            </Text>
                            <Text style={[styles.text]}>
                                <EIcon
                                    name="dot-single"
                                    color={
                                        Global.settings.theme.backgroundColor
                                    }
                                />
                                登录用户名和密码将保存在应用缓存中，以后使用此信息自动登录。
                            </Text>
                            <Text style={[styles.text]}>
                                <EIcon
                                    name="dot-single"
                                    color={
                                        Global.settings.theme.backgroundColor
                                    }
                                />
                                查看校内通知和教务通知时将访问相应网址并留下痕迹。
                            </Text>
                            <Text style={[styles.text]}>
                                <EIcon
                                    name="dot-single"
                                    color={
                                        Global.settings.theme.backgroundColor
                                    }
                                />
                                校园一卡通功能涉及金融，将不会缓存重要信息，并保证不上传任何数据。
                            </Text>
                            <Text style={[styles.text]}>
                                <EIcon
                                    name="dot-single"
                                    color={
                                        Global.settings.theme.backgroundColor
                                    }
                                />
                                本APP为纯客户端应用，保证不上传您的任何个人数据，请放心使用。
                            </Text>
                            <Text style={[styles.text]}>
                                <EIcon
                                    name="dot-single"
                                    color={
                                        Global.settings.theme.backgroundColor
                                    }
                                />
                                应用崩溃，或发生内部错误时，可能会将相关日志文件上传，以便开发者及时定位错误，请悉知。
                            </Text>
                            <Text style={[styles.text]}>
                                <EIcon
                                    name="dot-single"
                                    color={
                                        Global.settings.theme.backgroundColor
                                    }
                                />
                                本条款更新于2018年12月12日，后续更新可能修改条款。
                            </Text>
                            <Text style={[styles.text]}>
                                <EIcon
                                    name="dot-single"
                                    color={
                                        Global.settings.theme.backgroundColor
                                    }
                                />
                                &copy; 2019 by GitHub@Steven128，保留所有权利。
                            </Text>
                        </View>
                        <View style={{ height: 50 }} />
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
    main: {
        flex: 1,
        textAlign: "left",
        paddingTop: 50,
        padding: 15
    },
    text: {
        color: "#777",
        lineHeight: 24,
        fontWeight: "100",
        paddingBottom: 5
    },
    title: {
        fontSize: 18,
        paddingBottom: 5,
        lineHeight: 22
    }
});
