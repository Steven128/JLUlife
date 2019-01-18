import React, { Component } from "react";
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    PixelRatio,
    ToastAndroid,
    Vibration
} from "react-native";
import { Button } from "react-native-elements";
import Dialog, {
    ScaleAnimation,
    DialogTitle,
    DialogContent
} from "react-native-popup-dialog";
import Global from "../Global";
import AIcon from "react-native-vector-icons/AntDesign";
import EIcon from "react-native-vector-icons/Entypo";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AppStorage from "../AppStorage";

const { width, height } = Dimensions.get("window");

export default class ClassItemAndroid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            deleteTapCount: 0,
            showDeleteWarning: false
        };
    }

    static defaultProps = {
        blank: false
    };

    getHeight() {
        return this.props.length * this.props.itemHeight;
    }

    editClass() {
        this.setState({
            dialogVisible: false,
            deleteTapCount: 0,
            showDeleteWarning: false
        });
        this.props.navigation.navigate("EditClass", {
            lessonName: this.props.lessonName,
            classroom: this.props.classroom,
            beginWeek: this.props.beginWeek,
            endWeek: this.props.endWeek,
            dayOfWeek: this.props.dayOfWeek,
            time: this.props.time,
            teachers: this.props.teachers,
            weekOddEven: this.props.weekOddEven
        });
    }
    deleteClass() {
        var deleteTapCount = this.state.deleteTapCount;
        deleteTapCount++;
        this.setState({ deleteTapCount: this.state.deleteTapCount + 1 });
        setTimeout(() => {
            if (deleteTapCount == 1) {
                this.setState({ showDeleteWarning: false, deleteTapCount: 0 });
            }
        }, 3000);
        if (deleteTapCount == 1) {
            this.setState({ showDeleteWarning: true });
        } else {
            this.setState({ dialogVisible: false });
            Vibration.vibrate(20);
            setTimeout(() => {
                for (
                    var i = this.props.beginWeek;
                    i <= this.props.endWeek;
                    i++
                ) {
                    if (
                        (this.props.weekOddEven == "O" && i % 2 != 1) ||
                        (this.props.weekOddEven == "E" && i % 2 != 0)
                    ) {
                        continue;
                    }
                    this.handleSingleDelete(i);
                }
                AppStorage._save("classJson", Global.classJson);
                ToastAndroid.show("删除成功", ToastAndroid.SHORT);
                this.props.handleDeleteClass();
            }, 500);
        }
    }

    renderBlankClass(time) {
        var singleClass = {};
        singleClass.hasLesson = false;
        singleClass.schedule = {};
        singleClass.schedule.time = [time];
        return singleClass;
    }

    handleSingleDelete(week) {
        for (var i in Global.classJson[week - 1][this.props.dayOfWeek - 1]) {
            if (
                Global.classJson[week - 1][this.props.dayOfWeek - 1][i]
                    .hasLesson
            ) {
                if (
                    Global.classJson[week - 1][this.props.dayOfWeek - 1][i]
                        .lessonName == this.props.lessonName
                ) {
                    //删除这门课程
                    Global.classJson[week - 1][this.props.dayOfWeek - 1].splice(
                        i,
                        1
                    );
                    //添加相应的空课程格子
                    for (var j = 0; j < this.props.length; j++) {
                        Global.classJson[week - 1][
                            this.props.dayOfWeek - 1
                        ].push(this.renderBlankClass(this.props.time[j]));
                    }
                    //排序
                    var asc = function(x, y) {
                        return x["schedule"]["time"][0] >
                            y["schedule"]["time"][0]
                            ? 1
                            : -1;
                    };
                    Global.classJson[week - 1][
                        this.props.dayOfWeek - 1
                    ] = Global.classJson[week - 1][
                        this.props.dayOfWeek - 1
                    ].sort(asc);
                    break;
                }
            }
        }
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                    this.setState({ dialogVisible: true });
                }}
            >
                <View style={[styles.container, { height: this.getHeight() }]}>
                    {this.props.blank ? (
                        <View />
                    ) : (
                        <View style={{ flex: 1 }}>
                            <View
                                style={[
                                    styles.itemWrap,
                                    {
                                        backgroundColor: this.props.color,
                                        opacity: this.props.opacity
                                    }
                                ]}
                            />
                            <View style={[styles.innerItem]}>
                                <Text
                                    style={[
                                        styles.innerItemText,
                                        { fontSize: this.props.fontSize }
                                    ]}
                                >
                                    {this.props.innerText}
                                </Text>
                            </View>
                            <Dialog
                                visible={this.state.dialogVisible}
                                dialogAnimation={new ScaleAnimation()}
                                onTouchOutside={() => {
                                    this.setState({
                                        dialogVisible: false,
                                        deleteTapCount: 0,
                                        showDeleteWarning: false
                                    });
                                }}
                                // width={PixelRatio.get() * 0.25}
                                // height={
                                //     this.state.showDeleteWarning
                                //         ? PixelRatio.get() *
                                //           0.33 *
                                //           (width / height)
                                //         : PixelRatio.get() *
                                //           0.28 *
                                //           (width / height)
                                // }
                                width={280}
                                height={
                                    this.state.showDeleteWarning ? 350 : 300
                                }
                                containerStyle={styles.dialog}
                                dialogTitle={
                                    <DialogTitle
                                        title={this.props.lessonName}
                                        align="left"
                                        style={{
                                            backgroundColor: "#ffffff",
                                            borderBottomWidth: 0
                                        }}
                                        titleStyle={styles.dialogTitle}
                                    />
                                }
                                actions={[
                                    <TouchableOpacity
                                        style={[
                                            styles.dialogButton,
                                            {
                                                borderRightColor: "#eee",
                                                borderRightWidth: 1
                                            }
                                        ]}
                                        activeOpacity={0.75}
                                        onPress={this.editClass.bind(this)}
                                    >
                                        <AIcon
                                            name="edit"
                                            size={24}
                                            color="#2070dc"
                                        />
                                    </TouchableOpacity>,
                                    <TouchableOpacity
                                        style={styles.dialogButton}
                                        activeOpacity={0.75}
                                        onPress={this.deleteClass.bind(this)}
                                    >
                                        <AIcon
                                            name="delete"
                                            size={24}
                                            color="#ff0048"
                                        />
                                    </TouchableOpacity>
                                ]}
                            >
                                <DialogContent style={{ flex: 1, paddingBottom: 0 }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            paddingHorizontal: 5
                                        }}
                                        centerContent={true}
                                    >
                                        <View style={[styles.dialogInnerWrap]}>
                                            <View
                                                style={[
                                                    styles.text,
                                                    styles.textInDialog
                                                ]}
                                            >
                                                <EIcon
                                                    style={{ flex: 1 }}
                                                    name="calendar"
                                                    size={24}
                                                    color="lightgreen"
                                                />
                                                <Text style={styles.dialogText}>
                                                    第{this.props.beginWeek} -{" "}
                                                    {this.props.endWeek}周
                                                    {this.props.weekOddEven ==
                                                    "O"
                                                        ? "（单周）"
                                                        : this.props
                                                              .weekOddEven ==
                                                          "E"
                                                        ? "（双周）"
                                                        : ""}
                                                </Text>
                                            </View>
                                            <View
                                                style={[
                                                    styles.text,
                                                    styles.textInDialog
                                                ]}
                                            >
                                                <MIcon
                                                    style={{ flex: 1 }}
                                                    name="clock"
                                                    size={24}
                                                    color="orange"
                                                />
                                                <Text style={styles.dialogText}>
                                                    周
                                                    {this.numToChinese(
                                                        this.props.dayOfWeek
                                                    )}{" "}
                                                    第{this.props.time[0]} -{" "}
                                                    {
                                                        this.props.time[
                                                            this.props.time
                                                                .length - 1
                                                        ]
                                                    }
                                                    节
                                                </Text>
                                            </View>
                                            <View
                                                style={[
                                                    styles.text,
                                                    styles.textInDialog
                                                ]}
                                            >
                                                <EIcon
                                                    style={{ flex: 1 }}
                                                    name="user"
                                                    size={24}
                                                    color="lightblue"
                                                />
                                                <Text style={styles.dialogText}>
                                                    {this.printTeachers(
                                                        this.props.teachers
                                                    )}
                                                </Text>
                                            </View>
                                            <View
                                                style={[
                                                    styles.text,
                                                    styles.textInDialog,
                                                    {
                                                        borderBottomWidth: this
                                                            .state
                                                            .showDeleteWarning
                                                            ? 1
                                                            : 0
                                                    }
                                                ]}
                                            >
                                                <EIcon
                                                    style={{ flex: 1 }}
                                                    name="location-pin"
                                                    size={24}
                                                    color="red"
                                                />
                                                <Text style={styles.dialogText}>
                                                    {this.props.classroom}
                                                </Text>
                                            </View>
                                            {this.state.showDeleteWarning ? (
                                                <View style={{ marginTop: 10 }}>
                                                    <Text
                                                        style={{
                                                            color: "#ff0042",
                                                            fontSize: 12
                                                        }}
                                                    >
                                                        再按一次确定删除
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            color: "#ff0042",
                                                            fontSize: 12
                                                        }}
                                                    >
                                                        将删除所有周当天的这门课程哟~
                                                    </Text>
                                                </View>
                                            ) : null}
                                        </View>
                                    </View>
                                </DialogContent>
                            </Dialog>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    }
    numToChinese(num) {
        if (num == 1) return "一";
        else if (num == 2) return "二";
        else if (num == 3) return "三";
        else if (num == 4) return "四";
        else if (num == 5) return "五";
        else if (num == 6) return "六";
        else if (num == 7) return "日";
    }
    printTeachers(teachers) {
        var teacherStr = "";
        for (var i in teachers) {
            teacherStr = teachers[i] + " ";
        }
        return teacherStr;
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 1
    },
    itemWrap: {
        borderRadius: 5,
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    innerItem: {
        flex: 1,
        padding: 3,
        overflow: "hidden"
    },
    innerItemText: {
        color: "#fff"
    },
    dialog: {},
    dialogTitle: {
        fontSize: 18,
        color: "#6a6a6a",
        fontWeight: "normal"
    },
    dialogButton: {
        flex: 1,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        borderTopColor: "#eee",
        borderTopWidth: 1
    },
    dialogInnerWrap: {
        flex: 1,
        paddingTop: 5
    },
    textInDialog: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        flexDirection: "row"
    },
    dialogText: {
        flex: 5,
        paddingTop: 3,
        fontSize: 12,
        color: "#6a6a6a"
    }
});
