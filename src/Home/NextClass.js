import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Global from "../Global";
import AppStorage from "../AppStorage";

export default class NextClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            getClass: false,
            classInfo: {}
        };
    }
    componentDidMount() {
        this.getNextClass(Global.classJson, this.getCurrentClass());
    }
    getNextClass(classJson, currentClass) {
        AppStorage._load("startDate", res => {
            if (res.message == "success") {
                var weekDay = new Date().getDay();
                if (weekDay == 0) weekDay = 7;
                var todayList =
                    classJson[global.getCurrentWeek(Global.startDate) - 1][
                        weekDay - 1
                    ];
                for (var i in todayList) {
                    if (
                        todayList[i].hasLesson == true &&
                        parseInt(todayList[i].schedule.time[0]) >
                            parseInt(currentClass) &&
                        parseInt(currentClass) != null
                    ) {
                        var classInfo = todayList[i];
                        this.setState({
                            classInfo: classInfo,
                            getClass: true
                        });
                        break;
                    }
                }
            }
        });
    }
    getCurrentClass() {
        var time = new Date().toTimeString().substring(0, 8);
        var timeToInt = parseInt(time.replace(/:/g, ""));
        if (timeToInt < 80000) {
            return 0;
        } else if (timeToInt >= 80000 && timeToInt < 85500) {
            return 1;
        } else if (timeToInt >= 85500 && timeToInt < 100000) {
            return 2;
        } else if (timeToInt >= 100000 && timeToInt < 105500) {
            return 3;
        } else if (timeToInt >= 105500 && timeToInt < 133000) {
            return 4;
        } else if (timeToInt >= 133000 && timeToInt < 142500) {
            return 5;
        } else if (timeToInt >= 142500 && timeToInt < 153000) {
            return 6;
        } else if (timeToInt >= 153000 && timeToInt < 162500) {
            return 7;
        } else if (timeToInt >= 162500 && timeToInt < 183000) {
            return 8;
        } else if (timeToInt >= 183000 && timeToInt < 192500) {
            return 9;
        } else if (timeToInt >= 192500 && timeToInt < 202000) {
            return 10;
        } else if (timeToInt >= 202000 && timeToInt < 210500) {
            return 11;
        } else {
            return null;
        }
    }
    render() {
        if (!this.props.getClass) {
            if (!Global.isOnline) {
                return (
                    <View>
                        <Text
                            style={{
                                color: "#555",
                                fontSize: 18,
                                paddingBottom: 15
                            }}
                        >
                            接下来
                        </Text>
                        <View>
                            <Text style={styles.text}>请先登录哟~</Text>
                        </View>
                    </View>
                );
            } else if (!Global.settings.outOfSchool) {
                return (
                    <View>
                        <Text
                            style={{
                                color: "#555",
                                fontSize: 18,
                                paddingBottom: 15
                            }}
                        >
                            接下来
                        </Text>
                        <View>
                            <Text style={styles.text}>{"玩命加载中 >.<"}</Text>
                        </View>
                    </View>
                );
            } else
                return (
                    <View>
                        <Text
                            style={{
                                color: "#555",
                                fontSize: 18,
                                paddingBottom: 15
                            }}
                        >
                            接下来
                        </Text>
                        <View>
                            <Text style={styles.text}>
                                关闭外网功能才可以加载课表~
                            </Text>
                        </View>
                    </View>
                );
        } else {
            return this.state.getClass ? (
                <View>
                    <Text
                        style={{
                            color: "#555",
                            fontSize: 18,
                            paddingBottom: 15
                        }}
                    >
                        接下来
                    </Text>
                    <View>
                        <Text style={styles.text}>
                            {this.state.classInfo.lessonName}
                        </Text>
                        <Text style={styles.text}>
                            {this.state.classInfo.schedule.classroom}
                        </Text>
                        <Text style={styles.text}>
                            {this.state.classInfo.teachers[0]}
                        </Text>
                        <Text style={styles.text}>
                            第{this.state.classInfo.schedule.time[0]} -{" "}
                            {
                                this.state.classInfo.schedule.time[
                                    this.state.classInfo.schedule.time.length -
                                        1
                                ]
                            }
                            节
                        </Text>
                    </View>
                </View>
            ) : (
                <View>
                    <Text
                        style={{
                            color: "#555",
                            fontSize: 18,
                            paddingBottom: 15
                        }}
                    >
                        接下来
                    </Text>
                    <View>
                        <Text style={styles.text}>
                            今天没有课啦，休息一下吧~
                        </Text>
                    </View>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    subTitle: {
        color: "#555",
        paddingVertical: 5,
        fontSize: 16
    },
    text: {
        color: "#808080",
        paddingVertical: 1,
        paddingHorizontal: 15
    }
});
