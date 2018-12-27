/**
 * 设置 -> 关于页
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
    Image,
    StatusBar,
    Platform,
    SafeAreaView
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Feather";
import Global from "../../src/Global";

const { width, height } = Dimensions.get("window");

var { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
export default class AboutPage extends Component {
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
                                onPress={() =>
                                    this.props.navigation.navigate("Settings")
                                }
                            />
                        }
                        centerComponent={{
                            text: "关于 JLU Life",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                    />
                    <View style={styles.main}>
                        <Image
                            style={{ width: 100, height: 100, borderRadius: 10 }}
                            source={require("../assets/ic_logo.png")}
                        />
                        <View style={{ paddingTop: 40, paddingBottom: 30 }}>
                            <Text
                                style={[
                                    styles.text,
                                    styles.title,
                                    { textAlign: "center" }
                                ]}
                            >
                                JLU Life
                            </Text>
                            <Text
                                style={[styles.text, { textAlign: "center" }]}
                            >
                                版本号 2.2.0
                            </Text>
                        </View>
                        <Text style={[styles.text, { width: width * 0.8 }]}>
                            &nbsp;&nbsp;&nbsp;&nbsp;JLU Life
                            是一款面向吉林大学学生的服务型APP。此应用并非官方应用，为个人开发，使用的接口均为学校官方开放接口，旨在帮助到同学们，为同学们的学习、生活提供便利。
                        </Text>
                    </View>
                    <View style={{ padding: 15 }}>
                        <Text style={[styles.text, { width: width * 0.8 }]} />
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
    main: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50
    },
    text: {
        color: "#777",
        lineHeight: 24,
        fontWeight: "100"
    },
    title: {
        fontSize: 18,
        paddingBottom: 5
    }
});
