/**
 * 设置 -> 反馈页
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
    TouchableOpacity,
    Platform,
    StatusBar,
    SafeAreaView
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Feather";
import Global from "../../src/Global";

const { width, height } = Dimensions.get("window");

var { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
export default class FeedBackPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {};
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }
    goToGithub() {
        Linking.openURL("https://github.com/Steven128/JLUlife");
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
                            text: "问题反馈&建议",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                    />
                    <View style={styles.main}>
                        <Text style={[styles.text]}>
                            问题反馈及建议，或合作意向，请发邮件至
                        </Text>
                        <Text style={[styles.text]}>Steven128@outlook.com</Text>
                        <Text style={{ height: 30 }} />
                        <Text style={[styles.text]}>
                            本项目开源，欢迎Star或Fork
                        </Text>
                        {Platform.OS === "ios" ? (
                            <TouchableOpacity
                                activeOpacity={0.75}
                                onPress={this.goToGithub.bind(this)}
                            >
                                <Text
                                    style={[
                                        styles.text,
                                        styles.link,
                                        {
                                            color:
                                                Global.settings.theme
                                                    .backgroundColor,
                                            textDecorationColor:
                                                Global.settings.theme
                                                    .backgroundColor
                                        }
                                    ]}
                                >
                                    https://github.com/Steven128/JLUlife
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableNativeFeedback
                                onPress={this.goToGithub.bind(this)}
                            >
                                <Text
                                    style={[
                                        styles.text,
                                        styles.link,
                                        {
                                            color:
                                                Global.settings.theme
                                                    .backgroundColor,
                                            textDecorationColor:
                                                Global.settings.theme
                                                    .backgroundColor
                                        }
                                    ]}
                                >
                                    https://github.com/Steven128/JLUlife
                                </Text>
                            </TouchableNativeFeedback>
                        )}
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
    },
    link: {
        textDecorationLine: "underline",
        textDecorationStyle: "solid"
    }
});
