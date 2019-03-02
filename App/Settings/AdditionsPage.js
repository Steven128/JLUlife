/**
 * 设置 -> 关于页
 */
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    StatusBar,
    Platform,
    SafeAreaView,
    ScrollView
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../../src/Global";

const { width, height } = Dimensions.get("window");

var { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
export default class AdditionsPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = { location: Global.settings.weather.name };
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }

    componentWillReceiveProps() {
        this.setState({
            location: Global.settings.weather.name
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
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    centerComponent={{
                        text: "其他设置",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                />
                <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                    {Platform.OS == "ios" ? (
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() =>
                                this.props.navigation.navigate(
                                    "WeatherSettings",
                                    { from: "Additions" }
                                )
                            }
                        >
                            <View style={styles.item}>
                                <View style={{}}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: "#555",
                                            paddingBottom: 10,
                                            lineHeight: 20
                                        }}
                                    >
                                        天气城市设置
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#808080",
                                            lineHeight: 18
                                        }}
                                    >
                                        当前所在城市： {this.state.location}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableNativeFeedback
                            onPress={() =>
                                this.props.navigation.navigate(
                                    "WeatherSettings",
                                    { from: "Additions" }
                                )
                            }
                        >
                            <View style={styles.item}>
                                <View style={{}}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: "#555",
                                            paddingBottom: 10,
                                            lineHeight: 20
                                        }}
                                    >
                                        天气城市设置
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#808080",
                                            lineHeight: 18
                                        }}
                                    >
                                        当前所在城市：{" "}
                                        {Global.settings.weather.name}
                                    </Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    )}
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    item: {
        height: 80,
        textAlign: "left",
        justifyContent: "center",
        textAlignVertical: "center",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingHorizontal: 30
    }
});
