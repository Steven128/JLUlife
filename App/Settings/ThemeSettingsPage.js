/**
 * 设置 -> 主题设置页
 */
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
    BackHandler,
    StatusBar,
    Platform,
    SafeAreaView
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../../src/Global";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import AppStorage from "../../src/AppStorage";
import SlidersColorPicker from "../../src/Setting/SlidersColorPicker";
import tinycolor from "tinycolor2";

const { width, height } = Dimensions.get("window");
export default class ClassSettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOnline: Global.isOnline,
            selectedIndex: Global.settings.theme.index,
            backgroundColor: Global.settings.theme.backgroundColor,
            modalVisible: false
        };
    }

    componentDidMount() {
        this.setState({
            selectedIndex: Global.settings.theme.index,
            backgroundColor: Global.settings.theme.backgroundColor
        });
    }

    onSave() {
        Global.settings.theme.index = this.state.selectedIndex;
        Global.settings.theme.color = "#ffffff";
        Global.settings.theme.backgroundColor = this.state.backgroundColor;
        AppStorage._save("settings", Global.settings);
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.onBackAndroid
        );
        this.props.navigation.navigate("Settings", {
            backgroundColor: this.state.backgroundColor
        });
    }

    onSelect(index, value) {
        this.setState({
            selectedIndex: index,
            backgroundColor: value
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        var headerStyle = {
            borderBottomColor: this.state.backgroundColor
        };
        if (Platform.OS == "ios") {
            headerStyle.paddingTop = 0;
            headerStyle.height = 44;
        }
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: this.state.backgroundColor
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
                                onPress={() => this.props.navigation.goBack()}
                            />
                        }
                        centerComponent={{
                            text: "主题皮肤",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                        rightComponent={
                            <Button
                                containerStyle={{
                                    borderWidth: 1,
                                    borderColor: "#ffffff",
                                    borderRadius: 3
                                }}
                                titleStyle={{
                                    fontSize: 12,
                                    paddingHorizontal: 5,
                                    paddingVertical: 4
                                }}
                                title="保存"
                                clear
                                onPress={this.onSave.bind(this)}
                            />
                        }
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
                        <Text style={{ color: "#808080" }}>
                            提示： 点击右上角保存后生效哦~
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
                        <View
                            style={{
                                backgroundColor:
                                    this.state.selectedIndex == 12
                                        ? "transparent"
                                        : "#ffffff"
                            }}
                        >
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.setState({ modalVisible: true });
                                }}
                            >
                                <View style={[styles.radioContainer]}>
                                    <View style={[styles.radio]}>
                                        <View
                                            style={[
                                                styles.radioDot,
                                                {
                                                    backgroundColor:
                                                        this.state
                                                            .selectedIndex == 12
                                                            ? this.state
                                                                  .backgroundColor
                                                            : "transparent"
                                                }
                                            ]}
                                        />
                                    </View>
                                    <View style={styles.item}>
                                        <Text
                                            style={{
                                                color: this.state
                                                    .backgroundColor
                                            }}
                                        >
                                            自定义
                                        </Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <SlidersColorPicker
                            visible={this.state.modalVisible}
                            color={this.state.backgroundColor}
                            returnMode={"hex"}
                            onCancel={() =>
                                this.setState({ modalVisible: false })
                            }
                            onOk={colorHex => {
                                this.setState({
                                    modalVisible: false,
                                    backgroundColor: colorHex,
                                    selectedIndex: 12
                                });
                                Global.settings.theme.index = 12;
                                Global.settings.theme.backgroundColor = colorHex;
                            }}
                            value={Global.settings.theme.backgroundColor}
                            okLabel="确定"
                            cancelLabel="取消"
                        />
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
    },
    radioContainer: {
        flexGrow: 1,
        flexDirection: "row",
        padding: 15,
        paddingHorizontal: 20
    },
    radio: {
        alignItems: "center",
        justifyContent: "center"
    },
    radioDot: {
        height: 10,
        width: 10,
        borderRadius: 5
    },
    item: {
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center"
    }
});
