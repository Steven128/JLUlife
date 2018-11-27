import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    WebView,
    StyleSheet,
    Linking,
    TouchableNativeFeedback,
    Platform,
    BackHandler
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Feather";
import Global from "../../src/Global";
const { width, height } = Dimensions.get("window");

var { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.nav = this.props.navigation; //导航
        // 添加返回键监听(对Android原生返回键的处理)
        this.addBackAndroidListener(this.nav);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            //给导航中增加监听事件
            goBackPage: this._goBackPage
        });
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }

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
            this.nav.goBack();
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
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
