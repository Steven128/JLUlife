/**
 * 校内通知 -> 通知详情页
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
    SafeAreaView,
    ActivityIndicator
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Feather";
import Global from "../../src/Global";

const { width, height } = Dimensions.get("window");

var { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
export default class NotificationDetailPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {
            showTag: false,
            showWebView: false
        };
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }

    showTag() {
        this.setState({
            showTag: true
        });
    }

    closeTag() {
        this.setState({
            showTag: false
        });
    }

    openBroser(href) {
        Linking.openURL(href).catch(err => {
            if (__DEV__) console.error("An error occurred", err);
        });
    }

    showWebView() {
        this.setState({ showWebView: true });
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
                                onPress={() => this.props.navigation.goBack()}
                            />
                        }
                        centerComponent={{
                            text: "通知详情",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                        rightComponent={
                            <FIcon
                                name="more-vertical"
                                size={24}
                                color="#ffffff"
                                onPress={this.showTag.bind(this)}
                            />
                        }
                    />
                    <View style={styles.titleWrap}>
                        <Text style={styles.title}>
                            {this.props.navigation.state.params.title}
                        </Text>
                        <Text style={styles.subTitle}>
                            {this.props.navigation.state.params.comeFrom}
                        </Text>
                        <Text style={styles.subTitle}>
                            {this.props.navigation.state.params.time}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <WebView
                            onLoad={this.showWebView.bind(this)}
                            scalesPageToFit={true}
                            source={{
                                uri: this.props.navigation.state.params.href
                            }}
                            automaticallyAdjustContentInsets={true}
                            injectedJavaScript={`var oMeta=document.createElement('meta');oMeta.name='viewport';oMeta.content='width=device-width,initial-scale=1';document.getElementsByTagName('head')[0].appendChild(oMeta);document.querySelector('body').innerHTML=document.querySelector('.immmge').innerHTML;document.querySelector('body').style.background='#fff';document.querySelector('html').style.background='#fff';document.querySelector('body').style.padding='15px';window.scrollTo(0,0)`}
                            style={{ flex: 1 }}
                        />
                        {this.state.showWebView ? null : (
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: "#ffffff",
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0
                                }}
                            >
                                <ActivityIndicator
                                    style={{ flex: 1 }}
                                    size="large"
                                    color={
                                        Global.settings.theme.backgroundColor
                                    }
                                />
                            </View>
                        )}
                    </View>
                </View>
                {this.state.showTag ? (
                    Platform.OS === "ios" ? (
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={this.closeTag.bind(this)}
                        >
                            <View style={styles.tagContainer}>
                                <TouchableOpacity
                                    activeOpacity={0.75}
                                    onPress={this.openBroser.bind(
                                        this,
                                        this.props.navigation.state.params.href
                                    )}
                                >
                                    <View style={styles.tag}>
                                        <Text
                                            style={{
                                                color: "#555",
                                                lineHeight: 18
                                            }}
                                        >
                                            {"下载附件"}
                                        </Text>
                                        <Text
                                            style={{
                                                color: "#555",
                                                lineHeight: 18
                                            }}
                                        >
                                            {"(在浏览器打开原网页)"}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableNativeFeedback
                            onPress={this.closeTag.bind(this)}
                        >
                            <View style={styles.tagContainer}>
                                <TouchableNativeFeedback
                                    onPress={this.openBroser.bind(
                                        this,
                                        this.props.navigation.state.params.href
                                    )}
                                >
                                    <View style={styles.tag}>
                                        <Text
                                            style={{
                                                color: "#555",
                                                lineHeight: 18
                                            }}
                                        >
                                            {"下载附件"}
                                        </Text>
                                        <Text
                                            style={{
                                                color: "#555",
                                                lineHeight: 18
                                            }}
                                        >
                                            {"(在浏览器打开原网页)"}
                                        </Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </TouchableNativeFeedback>
                    )
                ) : null}
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleWrap: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    title: {
        fontSize: 20,
        paddingBottom: 10,
        lineHeight: 24
    },
    subTitle: {
        fontSize: 14,
        color: "#808080",
        paddingTop: 5,
        lineHeight: 18
    },
    tagContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100
    },
    tag: {
        width: 170,
        height: 70,
        position: "absolute",
        top: 30,
        right: 15,
        backgroundColor: "#fff",
        zIndex: 101,
        borderWidth: 1,
        borderColor: "#ccc",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlignVertical: "center"
    }
});
