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
import FIcon from "react-native-vector-icons/Feather";
import Global from "../src/Global";
const { width, height } = Dimensions.get("window");

var { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
export default class HomeScreen extends Component {
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
        Linking.openURL(href).catch(err =>
            console.error("An error occurred", err)
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {this.state.showTag ? (
                    <TouchableNativeFeedback onPress={this.closeTag.bind(this)}>
                        <View style={styles.tagContainer}>
                            <TouchableNativeFeedback
                                onPress={this.openBroser.bind(
                                    this,
                                    this.props.navigation.state.params.href
                                )}
                            >
                                <View style={styles.tag}>
                                    <Text style={{ color: "#555" }}>
                                        {"下载附件"}
                                    </Text>
                                    <Text style={{ color: "#555" }}>
                                        {"(在浏览器打开原网页)"}
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </TouchableNativeFeedback>
                ) : null}
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
                        text: "通知详情",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                    rightComponent={
                        <Button
                            title=""
                            icon={
                                <FIcon
                                    name="more-vertical"
                                    size={24}
                                    color="white"
                                />
                            }
                            clear
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
                <WebView
                    bounces={false}
                    scalesPageToFit={true}
                    source={{
                        uri: this.props.navigation.state.params.href
                    }}
                    automaticallyAdjustContentInsets={true}
                    injectedJavaScript={`document.querySelector('body').innerHTML=document.querySelector('.immmge').innerHTML;document.querySelector('body').style.background='#fff';document.querySelector('html').style.background='#fff';document.querySelector('body').style.padding='15px';window.scrollTo(0,0) `}
                    style={{
                        width: deviceWidth,
                        height: deviceHeight - 100
                    }}
                    startInLoadingState={true}
                />
            </View>
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
        paddingBottom: 10
    },
    subTitle: {
        fontSize: 14,
        color: "#888",
        paddingTop: 5
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
