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

export default class EditClassPage extends Component {
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

    componentWillMount() {
        var params = this.props.navigation.state.params;
        this.setState({
            lessonName: params.lessonName,
            classroom: params.classroom,
            beginWeek: params.beginWeek,
            endWeek: params.endWeek,
            dayOfWeek: this.dayOfWeekToStr(params.dayOfWeek),
            time: params.time,
            teachers: params.teachers,
            weekOddEven: params.weekOddEven
        });
    }

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

    dayOfWeekToNum(str) {
        var dayOfWeek = "";
        switch (str) {
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
        return dayOfWeek;
    }

    dayOfWeekToStr(num) {
        var dayOfWeek = "";
        switch (num) {
            case 1:
                dayOfWeek = "周一";
                break;
            case 2:
                dayOfWeek = "周二";
                break;
            case 3:
                dayOfWeek = "周三";
                break;
            case 4:
                dayOfWeek = "周四";
                break;
            case 5:
                dayOfWeek = "周五";
                break;
            case 6:
                dayOfWeek = "周六";
                break;
            case 7:
                dayOfWeek = "周日";
                break;
        }
        return dayOfWeek;
    }

    renderBlankClass(time) {
        var singleClass = {};
        singleClass.hasLesson = false;
        singleClass.schedule = {};
        singleClass.schedule.time = [time];
        return singleClass;
    }

    renderBlankClass(time) {
        var singleClass = {};
        singleClass.hasLesson = false;
        singleClass.schedule = {};
        singleClass.schedule.time = [time];
        return singleClass;
    }

    onSave() {
        var params = this.props.navigation.state.params;
        if (this.state.lessonName == "") {
            if (Platform.OS === "ios") {
                if (this.refs.toast != undefined)
                    this.refs.toast.show("课程名称不能为空~", 2000);
            } else {
                ToastAndroid.show("课程名称不能为空~", ToastAndroid.SHORT);
            }
            return;
        }
        var singleClass = {};
        singleClass.lessonName = this.state.lessonName;
        singleClass.schedule = {};
        singleClass.schedule.classroom = this.state.classroom;
        singleClass.schedule.beginWeek = this.state.beginWeek;
        singleClass.schedule.endWeek = this.state.endWeek;
        singleClass.schedule.dayOfWeek = this.dayOfWeekToNum(
            this.state.dayOfWeek
        );
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
            if (day == params.dayOfWeek) {
                //修改后与原来同一天
                for (var item in Global.classJson[week - 1][day - 1]) {
                    if (Global.classJson[week - 1][day - 1][item].hasLesson) {
                        if (
                            Global.classJson[week - 1][day - 1][item]
                                .lessonName != singleClass.lessonName
                        ) {
                            //不是同一门课
                            for (var temp1 in Global.classJson[week - 1][
                                day - 1
                            ][item].schedule.time) {
                                for (var temp2 in singleClass.schedule.time) {
                                    if (
                                        Global.classJson[week - 1][day - 1][
                                            item
                                        ].schedule.time[temp1] ==
                                        singleClass.schedule.time[temp2]
                                    ) {
                                        flag = true;
                                    }
                                }
                            }
                        } else {
                        }
                    }
                }
            } else {
                //修改后与原来不是同一天
                for (var item in Global.classJson[week - 1][day - 1]) {
                    if (Global.classJson[week - 1][day - 1][item].hasLesson) {
                        //不是同一门课
                        for (var temp1 in Global.classJson[week - 1][day - 1][
                            item
                        ].schedule.time) {
                            for (var temp2 in singleClass.schedule.time) {
                                if (
                                    Global.classJson[week - 1][day - 1][item]
                                        .schedule.time[temp1] ==
                                    singleClass.schedule.time[temp2]
                                ) {
                                    flag = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (flag) {
            if (Platform.OS === "ios") {
                if (this.refs.toast != undefined)
                    this.refs.toast.show("课程与当前课表的时间段冲突啦~", 2000);
            } else {
                ToastAndroid.show(
                    "课程与当前课表的时间段冲突啦~",
                    ToastAndroid.SHORT
                );
            }
        } else {
            for (var week = params.beginWeek; week <= params.endWeek; week++) {
                if (
                    (params.weekOddEven == "O" && week % 2 != 1) ||
                    (params.weekOddEven == "E" && week % 2 != 0)
                ) {
                    continue;
                }
                var day = params.dayOfWeek;
                for (var item in Global.classJson[week - 1][day - 1]) {
                    if (Global.classJson[week - 1][day - 1][item].hasLesson) {
                        if (
                            Global.classJson[week - 1][day - 1][item].schedule
                                .time == params.time
                        ) {
                            //删除这门课程
                            Global.classJson[week - 1][day - 1].splice(item, 1);
                            //添加相应的空课程格子
                            for (var j = 0; j < params.time.length; j++) {
                                Global.classJson[week - 1][day - 1].push(
                                    this.renderBlankClass(params.time[j])
                                );
                            }
                            //排序
                            var asc = function(x, y) {
                                return x["schedule"]["time"][0] >
                                    y["schedule"]["time"][0]
                                    ? 1
                                    : -1;
                            };
                            Global.classJson[week - 1][
                                day - 1
                            ] = Global.classJson[week - 1][day - 1].sort(asc);
                            break;
                        }
                    }
                }
            }
            //添加
            for (
                var week = singleClass.schedule.beginWeek;
                week <= singleClass.schedule.endWeek;
                week++
            ) {
                // console.log(Global.classJson[week - 1][day - 1]);
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
            ToastAndroid.show("修改成功", ToastAndroid.SHORT);
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
                    <Text
                        style={{
                            flex: 1,
                            paddingLeft: 15,
                            color: "#6a6a6a",
                            lineHeight: 18
                        }}
                    >
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        ) : (
            <TouchableNativeFeedback onPress={callback.bind(this)}>
                <View style={styles.selectContainerStyle}>
                    <View style={{ marginLeft: 15 }}>{icon}</View>
                    <Text
                        style={{
                            flex: 1,
                            paddingLeft: 15,
                            color: "#6a6a6a",
                            lineHeight: 18
                        }}
                    >
                        {text}
                    </Text>
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
                            <EIcon
                                name="chevron-left"
                                size={28}
                                color="#ffffff"
                                onPress={() => this.props.navigation.goBack()}
                            />
                        }
                        centerComponent={{
                            text: "修改课程",
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
                                    paddingVertical: 4,
                                    color: "#fff"
                                }}
                                title="保存"
                                type="outline"
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
                                    style={{
                                        color: "#808080",
                                        fontSize: 12,
                                        lineHeight: 18
                                    }}
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
                </View>
                <AddWeekPicker
                    ref={ref => (this.WeekPicker = ref)}
                    itemTextColor="#808080"
                    itemSelectedColor={Global.settings.theme.backgroundColor}
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
                    option={
                        this.state.weekOddEven == "O"
                            ? "单周"
                            : this.state.weekOddEven == "E"
                            ? "双周"
                            : ""
                    }
                    optionIndex={
                        this.state.weekOddEven == "O"
                            ? 1
                            : this.state.weekOddEven == "E"
                            ? 2
                            : 0
                    }
                    weekBegin={this.state.beginWeek}
                    weekEnd={this.state.endWeek}
                />
                <ClassPicker
                    ref={ref => (this.ClassPicker = ref)}
                    itemTextColor="#808080"
                    itemSelectedColor={Global.settings.theme.backgroundColor}
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
                    weekDay={this.state.dayOfWeek}
                    weekDayIndex={this.dayOfWeekToNum(this.state.dayOfWeek) - 1}
                    classBegin={this.state.time[0]}
                    classEnd={this.state.time[this.state.time.length - 1]}
                />
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
