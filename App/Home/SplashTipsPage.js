import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    StyleSheet,
    StatusBar,
    Image
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";
import Global from "../../src/Global";
import AppStorage from "../../src/AppStorage";
import isIphoneX from "../../src/isIphoneX";

const { width, height } = Dimensions.get("window");

export default class SplashTips extends Component {
    constructor(props) {
        super(props);

        this.state = { currentPage: 0 };
    }

    componentDidMount() {
        this.refs.scrollView.scrollResponderScrollTo({
            x: 0,
            y: 0,
            animated: true
        });
    }

    _onAnimationEnd(e) {
        //求出偏移量
        let offsetX = e.nativeEvent.contentOffset.x;
        //求出当前页数
        let pageIndex = Math.ceil(offsetX / width);
        //更改状态机
        this.setState({ currentPage: pageIndex });
    }

    renderPoints(number) {
        var pointContainer = [];
        for (var i = 0; i < number; i++) {
            var backGroundColor = "#ccc";
            if (i == this.state.currentPage)
                backGroundColor = Global.settings.theme.backgroundColor;
            var item = (
                <View
                    style={[styles.point, { backgroundColor: backGroundColor }]}
                />
            );
            pointContainer.push(item);
        }
        return pointContainer;
    }

    renderNext(number) {
        var isLast = false;
        if (number - 1 == this.state.currentPage) isLast = true;
        var item = null;
        if (Platform.OS === "ios")
            item = (
                <TouchableOpacity
                    onPress={this.scrollToNextPage.bind(this, isLast)}
                >
                    <Icon
                        name={isLast ? "check" : "doubleright"}
                        size={40}
                        color={Global.settings.theme.backgroundColor}
                    />
                </TouchableOpacity>
            );
        else
            item = (
                <TouchableNativeFeedback
                    onPress={this.scrollToNextPage.bind(this, isLast)}
                >
                    <Icon
                        name={isLast ? "check" : "doubleright"}
                        size={28}
                        color={Global.settings.theme.backgroundColor}
                    />
                </TouchableNativeFeedback>
            );
        return item;
    }

    scrollToNextPage(isLast) {
        if (isLast) {
            AppStorage._save("showTips", { splashV210: true });
            this.props.navigation.navigate("Home", { from: "SplashTips" });
        } else {
            var currentPage = this.state.currentPage + 1;
            this.setState({
                currentPage: currentPage
            });
            this.refs.scrollView.scrollResponderScrollTo({
                x: currentPage * width,
                y: 0,
                animated: true
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f9fd" }}>
                <ScrollView
                    ref="scrollView"
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={e => {
                        this._onAnimationEnd(e);
                    }}
                    style={{ flex: 1 }}
                >
                    <View style={{ flex: 1, width: width }}>
                        <View style={styles.container}>
                            <View>
                                {Platform.OS === "ios" ? (
                                    <Image
                                        style={[
                                            styles.image,
                                            { height: width * 1.3 }
                                        ]}
                                        source={require("../assets/Screenshots/ios/ios-1.png")}
                                    />
                                ) : (
                                    <Image
                                        style={styles.image}
                                        source={require("../assets/Screenshots/android/android-1.png")}
                                    />
                                )}
                            </View>
                            <View style={styles.textWrap}>
                                <Text style={styles.text}>
                                    点击右上角箭头可以切换到其他周~
                                </Text>
                                <Text style={styles.text}>
                                    点击标题栏可以返回本周~
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, width: width }}>
                        <View style={styles.container}>
                            <View>
                                {Platform.OS === "ios" ? (
                                    <Image
                                        style={[
                                            styles.image,
                                            { height: width * 1.3 }
                                        ]}
                                        source={require("../assets/Screenshots/ios/ios-2.png")}
                                    />
                                ) : (
                                    <Image
                                        style={styles.image}
                                        source={require("../assets/Screenshots/android/android-2.png")}
                                    />
                                )}
                            </View>
                            <View style={styles.textWrap}>
                                <Text style={styles.text}>
                                    设置中有多种自定义选项
                                </Text>
                                <Text style={styles.text}>
                                    快来打造自己的个性化课程表吧~
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    {this.renderPoints(2)}
                    <View style={styles.nextButton}>{this.renderNext(2)}</View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlignVertical: "center"
    },
    image: {
        width: width * 0.6,
        height: width * 1.2
    },
    textWrap: {
        paddingTop: 50,
        alignItems: "center"
    },
    text: {
        paddingBottom: 10,
        color: "#808080"
    },
    bottomContainer: {
        paddingBottom: 30,
        flexDirection: "row",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlignVertical: "center",
        height: 50
    },
    point: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5
    },
    nextButton: {
        position: "absolute",
        right: 30,
        bottom: 5,
        height: 50
    }
});
