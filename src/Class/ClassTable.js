import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import Global from "../Global";
import { TopNav, LeftNav } from "./NavView";
import ClassItem from "./ClassItem";

const { width, height } = Dimensions.get("window");

export default class ClassTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getWeekDayList(targetDate, week) {
        week = week - 1;
        function formatDate(date) {
            var json = {};
            date = date.toJSON();
            json.month = parseInt(date.substring(5, 7));
            json.date = parseInt(date.substring(8, 10));
            return json;
        }
        function addDate(date, n) {
            date.setDate(date.getDate() + n);
            return date;
        }
        function setDate(date) {
            var week = date.getDay() - 1;
            date = addDate(date, week * -1);
            currentFirstDate = new Date(date);

            var week = { month: "", date: [] };
            week.month = formatDate(date).month;

            for (var i = 0; i < 7; i++) {
                week.date.push(
                    formatDate(i == 0 ? date : addDate(date, 1)).date
                );
            }
            return week;
        }
        return setDate(addDate(new Date(targetDate), 7 * week));
    }

    render() {
        var weekDayList = this.getWeekDayList(
            Global.startDate,
            this.props.week
        );
        //每周的课表
        var items = [];
        var classList = this.props.classList[this.props.week - 1];
        for (var i in classList) {
            var dayList = classList[i];
            var dayItem = [];
            for (var j in dayList) {
                var length = dayList[j].schedule.time.length;
                if (dayList[j].hasLesson) {
                    var weekOddEven = "";
                    if (dayList[j].schedule.weekOddEven == "O")
                        weekOddEven = "(单周)";
                    else if (dayList[j].schedule.weekOddEven == "E")
                        weekOddEven = "(双周)";
                    dayItem.push(
                        <ClassItem
                            color={dayList[j].color}
                            length={length}
                            itemHeight={this.props.settings.itemHeight}
                            fontSize={this.props.settings.fontSize}
                            innerText={
                                dayList[j].lessonName +
                                "@" +
                                dayList[j].schedule.classroom +
                                weekOddEven
                            }
                            lessonName={dayList[j].lessonName}
                            classroom={dayList[j].schedule.classroom}
                            beginWeek={dayList[j].schedule.beginWeek}
                            endWeek={dayList[j].schedule.endWeek}
                            dayOfWeek={dayList[j].schedule.dayOfWeek}
                            time={dayList[j].schedule.time}
                            teachers={dayList[j].teachers}
                            weekOddEven={dayList[j].schedule.weekOddEven}
                        />
                    );
                } else {
                    dayItem.push(
                        <ClassItem
                            blank
                            length={length}
                            itemHeight={this.props.settings.itemHeight}
                            fontSize={this.props.settings.fontSize}
                        />
                    );
                }
            }
            items.push(<View style={styles.column}>{dayItem}</View>);
        }
        //添加到组件中
        var singleWeekItem = (
            <View style={{ flex: 1 }}>
                <TopNav
                    weekDayList={weekDayList}
                    color={this.props.settings.navColor}
                    backgroundColor={this.props.settings.navBackgroundColor}
                    opacity={this.props.settings.navOpacity}
                />
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            height:
                                this.props.classLength *
                                this.props.settings.itemHeight,
                            backgroundColor: "#fff"
                        }}
                    >
                        <LeftNav
                            itemHeight={this.props.settings.itemHeight}
                            classLength={this.props.settings.classLength}
                            color={this.props.settings.navColor}
                            backgroundColor={
                                this.props.settings.navBackgroundColor
                            }
                            opacity={this.props.settings.navOpacity}
                        />
                        <View style={{ flex: 7, flexDirection: "row" }}>
                            {items}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );

        return <View style={{ flex: 1 }}>{singleWeekItem}</View>;
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: "#888"
    },
    topNav: {
        height: 50,
        backgroundColor: "#fff",
        flex: 1,
        borderRightColor: "#ccc",
        borderRightWidth: 1,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlignVertical: "center"
    },
    leftNav: {
        backgroundColor: "#fff",
        height: 80,
        borderRightColor: "#ccc",
        borderRightWidth: 1,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlignVertical: "center"
    },
    column: {
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#fff"
    },
    columnItem: {
        borderRightColor: "#ccc",
        borderRightWidth: 1
    }
});
