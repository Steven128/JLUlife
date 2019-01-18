/**
 * 设置 -> 关于页
 */
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Linking,
    TouchableOpacity,
    TouchableNativeFeedback,
    Image,
    StatusBar,
    Platform,
    SafeAreaView,
    ScrollView,
    ToastAndroid
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Feather";
import Global from "../../src/Global";
import Toast from "react-native-easy-toast";

const { width, height } = Dimensions.get("window");

var { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
export default class FeedbackPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {};
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }

    goToQQ() {
        Linking.openURL("mqqwpa://im/chat?chat_type=wpa&uin=2678061071").catch(
            err => {
                if (this.refs.toast != undefined)
                    this.refs.toast.show("手机上没有安装QQ惹 T^T", 5000);
            }
        );
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
                <Toast ref="toast" />
                <StatusBar
                    backgroundColor={Global.settings.theme.backgroundColor}
                    barStyle="light-content"
                    translucent={false}
                />

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
                <ScrollView
                    style={{
                        flex: 1,
                        backgroundColor: "#f5f5f5",
                        paddingTop: 15
                    }}
                >
                    <View style={styles.main}>
                        <View
                            style={[
                                styles.tag,
                                {
                                    backgroundColor:
                                        Global.settings.theme.backgroundColor,
                                    width: 100,
                                    alignItems: "center"
                                }
                            ]}
                        >
                            <Text style={{ color: "#fff" }}>反馈问题</Text>
                        </View>
                        <View style={styles.box}>
                            <TouchableOpacity
                                activeOpacity={0.75}
                                onPress={this.goToQQ.bind(this)}
                            >
                                <View
                                    style={{
                                        alignItems: "center",
                                        padding: 10
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.text,
                                            { width: width * 0.9 }
                                        ]}
                                    >
                                        遇到了问题或者是对JLU Life有什么建议吗？
                                    </Text>
                                    <Text
                                        style={[
                                            styles.text,
                                            {
                                                width: width * 0.9,
                                                color:
                                                    Global.settings.theme
                                                        .backgroundColor
                                            }
                                        ]}
                                    >
                                        点我向开发者反馈~
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ padding: 15 }}>
                        <Text style={[styles.text, { width: width * 0.8 }]} />
                    </View>
                </ScrollView>
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
        paddingTop: 20
    },
    box: {
        paddingVertical: 20
    },
    tag: {
        paddingHorizontal: 15,
        paddingVertical: 1
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
