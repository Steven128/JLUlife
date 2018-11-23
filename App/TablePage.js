import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    ActivityIndicator,
    ToastAndroid,
    ScrollView,
    TouchableOpacity,
    TouchableNativeFeedback,
    StyleSheet
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import ClassTable from "../src/ClassTable";
import AppStorage from "../src/AppStorage";
const { width, height } = Dimensions.get("window");

var classJson = [];
var weekContainer = [];
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.openPicker = this.openPicker.bind(this);
        this.changeWeek = this.changeWeek.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.parseclassJson = this.parseclassJson.bind(this);
        this.state = {
            getClassTable: false,
            currentWeek: "  ",
            pickerOpen: false
        };

        for (var i = 1; i <= Global.weekLength; i++) {
            var weekItem = (
                <TouchableNativeFeedback
                    onPress={this.changeWeek.bind(this, i)}
                    key={i}
                >
                    <View style={styles.weekWrap}>
                        <Text style={styles.weekText}>第{i}周</Text>
                    </View>
                </TouchableNativeFeedback>
            );
            weekContainer.push(weekItem);
        }
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }

    openPicker() {
        this.setState({
            pickerOpen: !this.state.pickerOpen
        });
    }

    changeWeek(_week) {
        this.setState({
            currentWeek: _week
        });
        this.setState({ pickerOpen: !this.state.pickerOpen });
    }

    componentDidMount() {
        if (Global.startDate != "") {
            this.setState({
                currentWeek: global.getCurrentWeek(Global.startDate)
            });
        }
        AppStorage._load("classJson", res => {
            classJson = res;
            this.setState({
                getClassTable: true
            });
        });
        if (!this.state.getClassTable) {
            if (Global.isOnline) this.getInfo();
            else ToastAndroid.show("登录后才能刷新课表哟~", ToastAndroid.LONG);
        }
    }

    goBack() {
        var currentWeek = global.getCurrentWeek(Global.startDate);
        if (this.state.currentWeek != currentWeek) {
            this.setState({ currentWeek: currentWeek });
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        var pickerHeight = this.state.pickerOpen ? 60 : 0;

        var weekNotice =
            "第" +
            this.state.currentWeek +
            "周" +
            (this.state.currentWeek != global.getCurrentWeek(Global.startDate)
                ? "(非本周)"
                : "");
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <Header
                    placement="left"
                    leftComponent={
                        <Button
                            title=""
                            icon={<EIcon name="menu" size={28} color="white" />}
                            clear
                            onPress={this.openDrawer}
                        />
                    }
                    centerComponent={
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <Text style={{ color: "#fff", fontSize: 16 }}>
                                课程表 {weekNotice}
                            </Text>
                        </TouchableOpacity>
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
                <View>
                    <ScrollView
                        style={{ height: pickerHeight }}
                        horizontal
                        indicatorStyle="white"
                        ref={scrollView => {
                            if (scrollView !== null) {
                                console.log("scrollview ref");
                                scrollView.scrollTo({
                                    x: 78 * this.state.currentWeek - width / 2,
                                    y: 0,
                                    animated: true
                                });
                            }
                        }}
                    >
                        {weekContainer}
                    </ScrollView>
                </View>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    {this.state.getClassTable ? (
                        <ClassTable
                            classList={classJson}
                            week={this.state.currentWeek}
                        />
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                paddingVertical: height / 2 - 150
                            }}
                        >
                            <ActivityIndicator
                                style={{}}
                                size="large"
                                color="#2089dc"
                            />
                        </View>
                    )}
                </View>
            </View>
        );
    }

    getInfo() {
        let loginURL = "http://10.60.65.8/ntms/service/res.do";
        fetch(loginURL, {
            method: "POST",
            headers: {
                Accept: "*/*",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "zh-CN,zh;q=0.9",
                Connection: "keep-alive",
                "Content-Type": "application/json",
                Cookie:
                    "loginPage=userLogin.jsp; pwdStrength=1; alu=" +
                    Global.loginInfo.j_username +
                    "; " +
                    Global.cookie,
                Host: "10.60.65.8",
                Origin: "http://10.60.65.8",
                Referer: "http://10.60.65.8/ntms/index.do"
            },
            body: JSON.stringify({
                tag: "teachClassStud@schedule",
                branch: "default",
                params: { termId: Global.defRes.teachingTerm, studId: 266661 }
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                classJson = this.parseclassJson(responseJson.value);
                AppStorage._save("classJson", classJson);
                this.setState({
                    getClassTable: true
                });
            })
            .catch(error => {
                console.log("error");
                console.error(error);
                console.log(responseJson);
            });
    }

    parseclassJson(classJson) {
        var parsedData = [];
        for (var i in classJson) {
            //课程时间
            var lessonSchedules = classJson[i].teachClassMaster.lessonSchedules;
            for (var j in lessonSchedules) {
                var classroom = lessonSchedules[j].classroom.fullName;
                var timeBlock = lessonSchedules[j].timeBlock;
                var time = "[" + timeBlock.name.match(/第(.*?)节/)[1] + "]";
                var endWeek = timeBlock.endWeek;
                var beginWeek = timeBlock.beginWeek;
                var dayOfWeek = timeBlock.dayOfWeek;
                var singleLesson =
                    '{"classroom": "' +
                    classroom +
                    '", "beginWeek": ' +
                    beginWeek +
                    ', "endWeek": ' +
                    endWeek +
                    ', "dayOfWeek": ' +
                    dayOfWeek +
                    ', "time": ' +
                    time +
                    "}";
                singleLesson = JSON.parse(singleLesson);
                var teachers = [];
                var lessonTeachers =
                    classJson[i].teachClassMaster.lessonTeachers;
                for (var j in lessonTeachers) {
                    var teacherName = lessonTeachers[j].teacher.name;
                    teachers.push(teacherName);
                }
                //课程名称
                var lessonName =
                    classJson[i].teachClassMaster.lessonSegment.fullName;
                var singleData =
                    '{"schedule": ' +
                    JSON.stringify(singleLesson) +
                    ', "teachers": ' +
                    JSON.stringify(teachers) +
                    ', "lessonName": ' +
                    JSON.stringify(lessonName) +
                    "}";
                singleData = JSON.parse(singleData);
                parsedData.push(singleData);
            }
            //教师
        }
        var classJson = parsedData;
        var classList = [];
        for (var week = 1; week <= Global.weekLength; week++) {
            classList.push(this.getClassTable(parsedData, week));
        }
        return classList;
    }

    getClassTable(classJson, week) {
        //拿到提取出的课表JSON
        // var classJson = this.parseclassJson(classJson);
        var classList = [];
        for (var i in classJson) {
            var schedule = classJson[i].schedule;
            if (schedule.beginWeek <= week && schedule.endWeek >= week) {
                classList.push(classJson[i]);
            }
        }
        var classTable = [];
        for (var weekday = 1; weekday <= 7; weekday++) {
            var singleDay = [];
            var hasLessonList = [];
            for (var i in classList) {
                if (classList[i].schedule.dayOfWeek == weekday) {
                    classList[i].hasLesson = true;
                    classList[i].color = this.getColor();
                    singleDay.push(classList[i]);
                    for (var j in classList[i].schedule.time) {
                        hasLessonList.push(classList[i].schedule.time[j]);
                    }
                }
            }
            for (var count = 1; count <= 11; count++) {
                var flag = true;
                for (var inner in hasLessonList) {
                    if (count == hasLessonList[inner]) flag = false;
                }
                if (flag) {
                    var blankLesson = {};
                    blankLesson.hasLesson = false;
                    blankLesson.schedule = {};
                    blankLesson.schedule.time = [];
                    blankLesson.schedule.time.push(count);
                    singleDay.push(blankLesson);
                }
            }
            var asc = function(x, y) {
                return x["schedule"]["time"][0] > y["schedule"]["time"][0]
                    ? 1
                    : -1;
            };
            singleDay = singleDay.sort(asc);
            classTable.push(singleDay);
        }
        return classTable;
    }
    getColor() {
        var num = Math.floor(Math.random() * 10);
        return Global.defColor[num];
    }
}

const styles = StyleSheet.create({
    weekWrap: {
        height: 60,
        paddingHorizontal: 20,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlignVertical: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    weekText: {
        fontSize: 16,
        color: "#2089dc"
    }
});
