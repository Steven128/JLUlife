/**
 * 信息查询 -> 图书馆查询页
 */
import React, { Component } from "react";
import {
    View,
    Dimensions,
    WebView,
    StyleSheet,
    Platform,
    BackHandler,
    StatusBar,
    SafeAreaView
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../../src/Global";

const { width, height } = Dimensions.get("window");

var { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
export default class LibraryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.nav = this.props.navigation;
        this.addBackAndroidListener(this.nav);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            goBackPage: this._goBackPage
        });
    }

    openDrawer() {
        this.props.navigation.openDrawer();
    }

    /**
     * 下面是处理安卓上的返回按键，当webview中有多层时，先在webview中后退
     */
    onNavigationStateChange = navState => {
        this.setState({
            backButtonEnabled: navState.canGoBack
        });
    };

    //自定义返回事件
    _goBackPage = () => {
        //  官网中描述:backButtonEnabled: false,表示webView中没有返回事件，为true则表示该webView有回退事件
        if (this.state.backButtonEnabled) {
            this.refs["webView"].goBack();
        } else {
            //否则返回到上一个页面
            this.nav.navigate("Main");
        }
    };

    // 监听原生返回键事件
    addBackAndroidListener(navigator) {
        if (Platform.OS === "android") {
            BackHandler.addEventListener(
                "hardwareBackPress",
                this.onBackAndroid
            );
        }
    }

    onBackAndroid = () => {
        if (this.state.backButtonEnabled) {
            this.refs["webView"].goBack();
            return true;
        } else {
            return false;
        }
    };

    /**
     * 下面处理左上角返回键，原理同上
     */
    backButtonTapped() {
        if (this.state.backButtonEnabled) {
            this.refs["webView"].goBack();
        } else {
            //否则返回到上一个页面
            this.nav.navigate("Main");
        }
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
                                onPress={this.backButtonTapped.bind(this)}
                            />
                        }
                        centerComponent={{
                            text: "图书馆",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                    />
                    <WebView
                        bounces={false}
                        scalesPageToFit={true}
                        source={{
                            uri:
                                "http://libpda.jlu.edu.cn:8080/sms/opac/search/showiphoneSearch.action"
                        }}
                        automaticallyAdjustContentInsets={true}
                        style={{
                            width: deviceWidth,
                            height: deviceHeight - 100
                        }}
                        startInLoadingState={true}
                        ref="webView"
                        onNavigationStateChange={this.onNavigationStateChange}
                    />
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
