/**
 * 设置 -> 主题设置页
 */
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableNativeFeedback,
    Alert,
    ScrollView,
    BackHandler,
    StatusBar,
    Platform
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../../src/Global";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import AppStorage from "../../src/AppStorage";
import isIphoneX from "../../src/isIphoneX";

const { width, height } = Dimensions.get("window");
var radio_props = [
    { label: "param1", value: 0 },
    { label: "param2", value: 1 }
];
const colorList = [
    "#2089dc",
    "#808080",
    "#db4437",
    "#fb7299",
    "#0f9d58",
    "#3f51b5",
    "#ff9800",
    "#673ab7",
    "#795548",
    "#009688",
    "#fcff00"
];
export default class ClassSettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOnline: Global.isOnline,
            selectedIndex: 0,
            backgroundColor: ""
        };
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackAndroid);
        this.setState({
            selectedIndex: Global.settings.theme.index,
            backgroundColor: Global.settings.theme.backgroundColor
        });
    }

    componentWillUnmount() {
        AppStorage._save("settings", Global.settings);
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.onBackAndroid
        );
    }

    onBackAndroid = () => {
        this.props.navigation.navigate("Settings", {
            backgroundColor: this.state.backgroundColor
        });
        return true;
    };

    onSelect(index, value) {
        this.setState({
            selectedIndex: index,
            backgroundColor: value
        });
        Global.settings.theme.index = index;
        Global.settings.theme.backgroundColor = value;
    }

    render() {
        const { navigate } = this.props.navigation;
        var headerStyle = {
            borderBottomColor: Global.settings.theme.backgroundColor
        };
        if (isIphoneX()) {
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
                        backgroundColor={this.state.backgroundColor}
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
                                    this.props.navigation.navigate("Settings", {
                                        backgroundColor: this.state
                                            .backgroundColor
                                    })
                                }
                            />
                        }
                        centerComponent={{
                            text: "主题皮肤",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                    />
                    <View
                        style={{
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            backgroundColor: "#fff",
                            borderBottomColor: "#eee",
                            borderBottomWidth: 1
                        }}
                    >
                        <Text style={{ color: "#888" }}>
                            提示： 主题在退出此页面后才会生效哦~
                        </Text>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        <RadioGroup
                            color="transparent"
                            selectedIndex={this.state.selectedIndex}
                            onSelect={(index, value) =>
                                this.onSelect(index, value)
                            }
                        >
                            <RadioButton
                                style={styles.radioButton}
                                color="#2089dc"
                                value="#2089dc"
                            >
                                <Text style={{ color: "#2089dc" }}>默认蓝</Text>
                            </RadioButton>
                            <RadioButton
                                style={styles.radioButton}
                                color="#f44336"
                                value="#f44336"
                            >
                                <Text style={{ color: "#f44336" }}>姨妈红</Text>
                            </RadioButton>
                            <RadioButton
                                style={styles.radioButton}
                                color="#ff96b4"
                                value="#ff96b4"
                            >
                                <Text style={{ color: "#ff96b4" }}>少女粉</Text>
                            </RadioButton>
                            <RadioButton
                                style={styles.radioButton}
                                color="#0f9d58"
                                value="#0f9d58"
                            >
                                <Text style={{ color: "#0f9d58" }}>原谅绿</Text>
                            </RadioButton>
                            <RadioButton
                                style={styles.radioButton}
                                color="#ffc107"
                                value="#ffc107"
                            >
                                <Text style={{ color: "#ffc107" }}>咸蛋黄</Text>
                            </RadioButton>
                            <RadioButton
                                style={styles.radioButton}
                                color="#3f51b5"
                                value="#3f51b5"
                            >
                                <Text style={{ color: "#3f51b5" }}>颐堤蓝</Text>
                            </RadioButton>
                            <RadioButton
                                style={styles.radioButton}
                                color="#ff9800"
                                value="#ff9800"
                            >
                                <Text style={{ color: "#ff9800" }}>果粒橙</Text>
                            </RadioButton>
                            <RadioButton
                                style={styles.radioButton}
                                color="#673ab7"
                                value="#673ab7"
                            >
                                <Text style={{ color: "#673ab7" }}>基佬紫</Text>
                            </RadioButton>
                            <RadioButton
                                style={styles.radioButton}
                                color="#795548"
                                value="#795548"
                            >
                                <Text style={{ color: "#795548" }}>古铜棕</Text>
                            </RadioButton>
                            <RadioButton
                                style={styles.radioButton}
                                color="#009688"
                                value="#009688"
                            >
                                <Text style={{ color: "#009688" }}>水鸭青</Text>
                            </RadioButton>
                            <RadioButton
                                style={styles.radioButton}
                                color="#607d8b"
                                value="#607d8b"
                            >
                                <Text style={{ color: "#607d8b" }}>低调灰</Text>
                            </RadioButton>
                            <RadioButton
                                style={styles.radioButton}
                                color="#212121"
                                value="#212121"
                            >
                                <Text style={{ color: "#212121" }}>高级黑</Text>
                            </RadioButton>
                        </RadioGroup>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    radioButton: {
        padding: 15,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        backgroundColor: "#ffffff"
    }
});
