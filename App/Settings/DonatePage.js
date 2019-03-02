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
export default class DonatePage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {};
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }

    goToStoreAndroid() {
        ToastAndroid.show("十分感谢 *\\(๑• ₃ •๑)", ToastAndroid.LONG);
        Linking.openURL("https://www.coolapk.com/apk/210060");
    }

    goToStoreIOS() {
        if (this.refs.toast != undefined)
            this.refs.toast.show("十分感谢 *\\(๑• ₃ •๑)", 5000);
        Linking.openURL(
            "https://itunes.apple.com/cn/app/jlu-life/id1449566000"
        );
    }

    goToAlipay() {
        if (Platform.OS === "ios") {
            if (this.refs.toast != undefined)
                this.refs.toast.show("十分感谢 *\\(๑• ₃ •๑)", 5000);
        } else {
            ToastAndroid.show("十分感谢 *\\(๑• ₃ •๑)", ToastAndroid.LONG);
        }
        Linking.openURL(
            "alipayqr://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https://qr.alipay.com/fkx07341eimsdrzuwma1t1e?_s=web-other"
        ).catch(err => {
            if (Platform.OS === "ios") {
                if (this.refs.toast != undefined)
                    this.refs.toast.show("手机上没有安装支付宝惹 T^T", 2000);
            } else {
                ToastAndroid.show(
                    "手机上没有安装支付宝惹 T^T",
                    ToastAndroid.SHORT
                );
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
                        text: "评分&捐赠开发者",
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
                                    width: 60,
                                    alignItems: "center"
                                }
                            ]}
                        >
                            <Text style={{ color: "#fff", lineHeight: 18 }}>
                                评分
                            </Text>
                        </View>
                        <View style={styles.box}>
                            {Platform.OS == "ios" ? (
                                <TouchableOpacity
                                    activeOpacity={0.75}
                                    onPress={this.goToStoreIOS.bind(this)}
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
                                            如果你认为 JLU Life
                                            还不错，欢迎到应用商店5星好评
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
                                            点此处到商店评价 :)
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <TouchableNativeFeedback
                                    onPress={this.goToStoreAndroid.bind(this)}
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
                                            如果你觉得 JLU Life
                                            还不错，欢迎到应用商店5星好评
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
                                            点此处到商店评价 :)
                                        </Text>
                                    </View>
                                </TouchableNativeFeedback>
                            )}
                        </View>
                    </View>
                    <View style={styles.main}>
                        <View
                            style={[
                                styles.tag,
                                {
                                    backgroundColor:
                                        Global.settings.theme.backgroundColor,
                                    width: 110,
                                    alignItems: "center"
                                }
                            ]}
                        >
                            <Text style={{ color: "#fff", lineHeight: 18 }}>
                                捐赠开发者
                            </Text>
                        </View>
                        <View style={styles.box}>
                            {Platform.OS == "ios" ? (
                                <TouchableOpacity
                                    activeOpacity={0.75}
                                    onPress={this.goToAlipay.bind(this)}
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
                                            支持开发者，为我买一杯可乐或咖啡
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
                                            点此处进行付款 :)
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <TouchableNativeFeedback
                                    onPress={this.goToAlipay.bind(this)}
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
                                            支持开发者，为我买一杯可乐或咖啡
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
                                            点此处进行付款 :)
                                        </Text>
                                    </View>
                                </TouchableNativeFeedback>
                            )}
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
    }
});
