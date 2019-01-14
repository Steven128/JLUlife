/**
 * 校内通知 -> 通知详情页
 */
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    StatusBar,
    SafeAreaView,
    ScrollView,
    TextInput,
    ToastAndroid
} from "react-native";
import { Header, Button, Input } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Global from "../../src/Global";
import Toast from "react-native-easy-toast";
import ClassPicker from "../../src/Class/ClassPicker";
import AddWeekPicker from "../../src/Class/AddWeekPicker";
import AppStorage from "../../src/AppStorage";

const { width, height } = Dimensions.get("window");

export default class AddClassPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonName: "",
            beginWeek: 1,
            endWeek: Global.weekLength,
            dayOfWeek: "周一",
            classroom: "",
            time: [1, 2],
            weekOddEven: "",
            teachers: []
        };
    }

    componentWillMount() {}

    handleLessonNameChange(value) {
        this.setState({ lessonName: value });
    }

    handleClassRoomChange(value) {
        this.setState({ classroom: value });
    }

    handleTeachersChange(value) {
        this.setState({ teachers: [value] });
    }
    getColor() {
        var num = Math.floor(Math.random() * 10);
        return Global.defColor[num];
    }

    onSave() {
        if (this.state.lessonName == "") {
            Platform.OS === "ios"
                ? this.refs.toast.show("课程名称不能为空~", 2000)
                : ToastAndroid.show("课程名称不能为空~", ToastAndroid.SHORT);
            return;
        }
        var dayOfWeek = "";
        switch (this.state.dayOfWeek) {
            case "周一":
                dayOfWeek = 1;
                break;
            case "周二":
                dayOfWeek = 2;
                break;
            case "周三":
                dayOfWeek = 3;
                break;
            case "周四":
                dayOfWeek = 4;
                break;
            case "周五":
                dayOfWeek = 5;
                break;
            case "周六":
                dayOfWeek = 6;
                break;
            case "周日":
                dayOfWeek = 7;
                break;
        }
        var singleClass = {};
        singleClass.lessonName = this.state.lessonName;
        singleClass.schedule = {};
        singleClass.schedule.classroom = this.state.classroom;
        singleClass.schedule.beginWeek = this.state.beginWeek;
        singleClass.schedule.endWeek = this.state.endWeek;
        singleClass.schedule.dayOfWeek = dayOfWeek;
        singleClass.schedule.time = this.state.time;
        singleClass.schedule.weekOddEven = this.state.weekOddEven;
        singleClass.teachers = this.state.teachers;
        singleClass.hasLesson = true;
        singleClass.color = this.getColor();
        var flag = false;
        for (
            var week = singleClass.schedule.beginWeek;
            week <= singleClass.schedule.endWeek;
            week++
        ) {
            if (
                (singleClass.schedule.weekOddEven == "O" && week % 2 != 1) ||
                (singleClass.schedule.weekOddEven == "E" && week % 2 != 0)
            ) {
                continue;
            }
            var day = singleClass.schedule.dayOfWeek;
            for (
                var item = singleClass.schedule.time[0];
                item <=
                singleClass.schedule.time[singleClass.schedule.time.length - 1];
                item++
            ) {
                for (var i in Global.classJson[week - 1][day - 1]) {
                    if (Global.classJson[week - 1][day - 1][i].hasLesson) {
                        for (var j in Global.classJson[week - 1][day - 1][i]
                            .schedule.time) {
                            if (
                                Global.classJson[week - 1][day - 1][i].schedule
                                    .time[j] == item
                            )
                                flag = true;
                        }
                    }
                }
            }
        }
        if (flag) {
            Platform.OS === "ios"
                ? this.refs.toast.show("课程与当前课表的时间段冲突啦~", 2000)
                : ToastAndroid.show(
                      "课程与当前课表的时间段冲突啦~",
                      ToastAndroid.SHORT
                  );
        } else {
            for (
                var week = singleClass.schedule.beginWeek;
                week <= singleClass.schedule.endWeek;
                week++
            ) {
                if (
                    (singleClass.schedule.weekOddEven == "O" &&
                        week % 2 != 1) ||
                    (singleClass.schedule.weekOddEven == "E" && week % 2 != 0)
                ) {
                    continue;
                }
                var day = singleClass.schedule.dayOfWeek;
                var point = 0;
                var length = 1;
                while (
                    Global.classJson[week - 1][day - 1][point].schedule
                        .time[0] != singleClass.schedule.time[0]
                ) {
                    point++;
                }
                for (
                    var temp = point;
                    Global.classJson[week - 1][day - 1][temp].schedule
                        .time[0] !=
                    singleClass.schedule.time[
                        singleClass.schedule.time.length - 1
                    ];
                    temp++
                ) {
                    length++;
                }
                Global.classJson[week - 1][day - 1].splice(
                    point,
                    length,
                    singleClass
                );
            }
            AppStorage._save("classJson", Global.classJson);
            ToastAndroid.show("添加成功", ToastAndroid.SHORT);
            this.props.navigation.navigate("Table", { message: "success" });
        }
    }

    renderButton(icon, text, callback) {
        return Platform.OS == "ios" ? (
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={callback.bind(this)}
            >
                <View style={styles.selectContainerStyle}>
                    <View style={{ marginLeft: 15 }}>{icon}</View>
                    <Text style={{ flex: 1, paddingLeft: 15 }}>{text}</Text>
                </View>
            </TouchableOpacity>
        ) : (
            <TouchableNativeFeedback onPress={callback.bind(this)}>
                <View style={styles.selectContainerStyle}>
                    <View style={{ marginLeft: 15 }}>{icon}</View>
                    <Text style={{ flex: 1, paddingLeft: 15 }}>{text}</Text>
                </View>
            </TouchableNativeFeedback>
        );
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
        var weekOption = "";
        if (this.state.weekOddEven == "O") weekOption = "（单周）";
        else if (this.state.weekOddEven == "E") weekOption = "（双周）";
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
                                onPress={() => this.props.navigation.goBack()}
                            />
                        }
                        centerComponent={{
                            text: "添加课程",
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
                    <ScrollView style={{ flex: 1 }}>
                        <View
                            style={{
                                flex: 1,
                                alignSelf: "center",
                                paddingVertical: 15
                            }}
                        >
                            <Input
                                containerStyle={styles.input}
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainerStyle}
                                leftIcon={
                                    <EIcon
                                        name="bookmark"
                                        size={24}
                                        color="green"
                                    />
                                }
                                value={this.state.lessonName}
                                onChangeText={this.handleLessonNameChange.bind(
                                    this
                                )}
                                placeholder="课程名称"
                            />
                            <Input
                                containerStyle={styles.input}
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainerStyle}
                                leftIcon={
                                    <EIcon
                                        name="location-pin"
                                        size={24}
                                        color="red"
                                    />
                                }
                                value={this.state.classroom}
                                onChangeText={this.handleClassRoomChange.bind(
                                    this
                                )}
                                placeholder="上课地点（可不填）"
                            />
                            <Input
                                containerStyle={styles.input}
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainerStyle}
                                leftIcon={
                                    <EIcon
                                        name="user"
                                        size={24}
                                        color="lightblue"
                                    />
                                }
                                value={this.state.teachers[0]}
                                onChangeText={this.handleTeachersChange.bind(
                                    this
                                )}
                                placeholder="授课老师（可不填）"
                            />
                            <View
                                style={{
                                    paddingTop: 30,
                                    paddongBottom: 15,
                                    paddingHorizontal: 5
                                }}
                            >
                                <Text
                                    style={{ color: "#808080", fontSize: 12 }}
                                >
                                    时间段
                                </Text>
                            </View>

                            {this.renderButton(
                                <EIcon
                                    name="calendar"
                                    size={24}
                                    color="lightgreen"
                                />,
                                "第 " +
                                    this.state.beginWeek +
                                    " - " +
                                    this.state.endWeek +
                                    " 周" +
                                    weekOption,
                                () => {
                                    this.WeekPicker.show();
                                }
                            )}
                            {this.renderButton(
                                <MIcon name="clock" size={24} color="orange" />,
                                this.state.dayOfWeek +
                                    "    第 " +
                                    this.state.time[0] +
                                    " - " +
                                    this.state.time[
                                        this.state.time.length - 1
                                    ] +
                                    " 节",
                                () => {
                                    this.ClassPicker.show();
                                }
                            )}
                        </View>
                    </ScrollView>
                    <AddWeekPicker
                        ref={ref => (this.WeekPicker = ref)}
                        itemTextColor="#808080"
                        itemSelectedColor={
                            Global.settings.theme.backgroundColor
                        }
                        onPickerCancel={() => {}}
                        onPickerConfirm={value => {
                            var weekOddEven = "";
                            if (value.option == "单周") weekOddEven = "O";
                            else if (value.option == "双周") weekOddEven = "E";
                            this.setState({
                                weekOddEven: weekOddEven,
                                beginWeek: value.begin,
                                endWeek: value.end
                            });
                        }}
                        itemHeight={50}
                    />
                    <ClassPicker
                        ref={ref => (this.ClassPicker = ref)}
                        itemTextColor="#808080"
                        itemSelectedColor={
                            Global.settings.theme.backgroundColor
                        }
                        onPickerCancel={() => {}}
                        onPickerConfirm={value => {
                            var time = [];
                            for (var i = value.begin; i <= value.end; i++) {
                                time.push(i);
                            }
                            this.setState({
                                dayOfWeek: value.weekDay,
                                time: time
                            });
                        }}
                        itemHeight={50}
                    />
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    input: {
        width: width * 0.95
    },
    inputStyle: {
        height: 45,
        overflow: "hidden",
        fontSize: 14,
        color: "#6a6a6a"
    },
    inputContainerStyle: {
        paddingVertical: 5,
        borderBottomColor: "#cecece"
    },
    selectContainerStyle: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#cecece",
        borderBottomWidth: 1,
        flexDirection: "row",
        height: 55
    }
});
