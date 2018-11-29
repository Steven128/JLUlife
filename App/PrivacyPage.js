import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    WebView,
    StyleSheet,
    Linking,
    TouchableNativeFeedback
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import AIcon from "react-native-vector-icons/AntDesign";
import Global from "../src/Global";
const { width, height } = Dimensions.get("window");

var { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
export default class PrivacyPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {
            getOa: false,
            oaDetail: {},
            showTag: false
        };
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
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
                            icon={
                                <EIcon
                                    name="chevron-left"
                                    size={28}
                                    color="white"
                                />
                            }
                            clear
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    centerComponent={{
                        text: "隐私政策",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                />
                <View style={styles.main}>
                    <Text style={[styles.title]}>
                        当您使用本APP，即表示您同意以下声明：
                    </Text>
                    <View style={{ padding: 15 }}>
                        <Text style={[styles.text]}>
                            <EIcon name="dot-single" color="#2089dc" />
                            使用课程表和查询成绩功能时，需要您的信息来访问教务系统，并在教务系统中留下登录痕迹
                        </Text>
                        <Text style={[styles.text]}>
                            <EIcon name="dot-single" color="#2089dc" />
                            登录用户名和密码将保存在应用缓存中，以后打开APP时用此信息自动登录
                        </Text>
                        <Text style={[styles.text]}>
                            <EIcon name="dot-single" color="#2089dc" />
                            查看校内通知和教务通知时将访问相应网址并留下痕迹
                        </Text>
                        <Text style={[styles.text]}>
                            <EIcon name="dot-single" color="#2089dc" />
                            本APP为纯客户端应用，保证不上传您的任何数据
                        </Text>
                        <Text style={[styles.text]}>
                            <EIcon name="dot-single" color="#2089dc" />
                            本条款更新于2018年11月23日，后续更新可能修改条款
                        </Text>
                    </View>
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
        paddingBottom: 5
    }
});
