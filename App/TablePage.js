import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    ActivityIndicator,
    ToastAndroid,
    ScrollView,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    StyleSheet,
    StatusBar,
    SafeAreaView
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import ClassTable from "../src/Class/ClassTable";
import AppStorage from "../src/AppStorage";
import Toast from "react-native-easy-toast";
import ClassInterface from "../src/FetchInterface/ClassInterface";
import WeekPickerAndroid from "../src/Class/WeekPicker.android";
import WeekPickerIOS from "../src/Class/WeekPicker.ios";

const { width, height } = Dimensions.get("window");

export default class TablePage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.openPicker = this.openPicker.bind(this);
        this.changeWeek = this.changeWeek.bind(this);
        this.state = {
            getClassTable: false,
            classJson: [],
            currentWeek: " - ",
            pickerOpen: false,
            settings: {}
        };
    }

    componentDidMount() {
        if (Global.startDate != "") {
            this.setState({
                currentWeek: global.getCurrentWeek(Global.startDate)
            });
        }
        this.setState({
            settings: Global.settings.class
        });
        AppStorage._load("classJson", res => {
            if (res.message == "success") {
                classJson = res.content;
                this.setState({
                    getClassTable: true
                });
            } else if (
                res.message == "error" &&
                !Global.isOnline &&
                !Global.checkingOnline
            ) {
                this.props.navigation.navigate("Login");
            }
        });
        if (!this.state.getClassTable) {
            if (Global.isOnline) {
                ClassInterface(res => {
                    if (res.message == "success") {
                        this.setState({
                            classJson: res.content,
                            getClassTable: true
                        });
                    }
                });
            } else {
                Platform.OS === "ios"
                    ? this.refs.toast.show("登录后才能刷新课表哟~", 2000)
                    : ToastAndroid.show(
                          "登录后才能刷新课表哟~",
                          ToastAndroid.LONG
                      );
            }
        }
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
        this.setState({ pickerOpen: false });
        this.refs.weekPicker.closePicker();
    }

    openPicker() {
        this.refs.weekPicker.handlePickerOpen();
        this.setState({ pickerOpen: !this.state.pickerOpen });
    }
    /**
     * 更换当前显示的周数
     * @param {String} _week 周数
     */
    changeWeek(_week) {
        this.setState({
            currentWeek: _week,
            pickerOpen: false
        });
    }

    /**
     * 返回本周
     */
    goBack() {
        var currentWeek = global.getCurrentWeek(Global.startDate);
        if (this.state.currentWeek != currentWeek) {
            this.setState({
                currentWeek: currentWeek,
                pickerOpen: false
            });
        }
        this.refs.weekPicker.changeWeek(currentWeek);
    }

    handleWeekPicker() {
        this.setState({ pickerOpen: false });
        this.refs.weekPicker.closePicker();
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

        var weekNotice =
            "第" +
            this.state.currentWeek +
            "周" +
            (this.state.currentWeek != global.getCurrentWeek(Global.startDate)
                ? "(非本周)"
                : "");
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
                <Toast ref="toast" />
                <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
                    <Header
                        containerStyle={headerStyle}
                        backgroundColor={Global.settings.theme.backgroundColor}
                        placement="left"
                        leftComponent={
                            <Button
                                title=""
                                icon={
                                    <EIcon
                                        name="menu"
                                        size={28}
                                        color="white"
                                    />
                                }
                                clear
                                onPress={this.openDrawer}
                            />
                        }
                        centerComponent={
                            Platform.OS === "ios" ? (
                                <TouchableOpacity
                                    onPress={this.goBack.bind(this)}
                                >
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontSize: 16
                                        }}
                                    >
                                        课程表 {weekNotice}
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableNativeFeedback
                                    onPress={this.goBack.bind(this)}
                                >
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontSize: 16
                                        }}
                                    >
                                        课程表 {weekNotice}
                                    </Text>
                                </TouchableNativeFeedback>
                            )
                        }
                        rightComponent={
                            <Button
                                title=""
                                icon={
                                    <EIcon
                                        name={
                                            this.state.pickerOpen
                                                ? "chevron-up"
                                                : "chevron-down"
                                        }
                                        size={28}
                                        color="white"
                                    />
                                }
                                clear
                                onPress={this.openPicker}
                            />
                        }
                    />
                    {Platform.OS == "ios" ? (
                        <WeekPickerIOS
                            currentWeek={global.getCurrentWeek(
                                Global.startDate
                            )}
                            ref="weekPicker"
                            changeWeek={this.changeWeek.bind(this)}
                        />
                    ) : (
                        <WeekPickerAndroid
                            currentWeek={global.getCurrentWeek(
                                Global.startDate
                            )}
                            ref="weekPicker"
                            changeWeek={this.changeWeek.bind(this)}
                        />
                    )}
                    <View style={{ flex: 1 }}>
                        {this.state.getClassTable ? (
                            <ClassTable
                                classList={this.state.classJson}
                                week={this.state.currentWeek}
                                settings={this.state.settings}
                                onScroll={this.handleWeekPicker.bind(this)}
                            />
                        ) : (
                            <View
                                style={{
                                    flex: 1,
                                    paddingVertical: height / 2 - 150,
                                    backgroundColor: "transparent"
                                }}
                            >
                                <ActivityIndicator
                                    size="large"
                                    color={
                                        Global.settings.theme.backgroundColor
                                    }
                                />
                            </View>
                        )}
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
