import React, { Component } from "react";
import {
    TouchableNativeFeedback,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    PixelRatio
} from "react-native";
import Dialog, {
    ScaleAnimation,
    DialogTitle,
    DialogContent
} from "react-native-popup-dialog";
import Global from "../Global";
import EIcon from "react-native-vector-icons/Entypo";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

export default class ClassItemAndroid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false
        };
    }

    static defaultProps = {
        blank: false
    };

    getHeight() {
        return this.props.length * this.props.itemHeight;
    }

    render() {
        return (
            <TouchableNativeFeedback
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
                                    this.setState({ dialogVisible: false });
                                }}
                                width={PixelRatio.get() * 0.25}
                                height={PixelRatio.get() * 0.14}
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
                            >
                                <DialogContent style={{ flex: 1 }}>
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        style={{
                                            flex: 1,
                                            paddingHorizontal: 5
                                        }}
                                        centerContent={true}
                                    >
                                        <View style={styles.dialogInnerWrap}>
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
                                                <Text
                                                    style={{
                                                        flex: 5,
                                                        paddingTop: 3,
                                                        fontSize: 12
                                                    }}
                                                >
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
                                                <Text
                                                    style={{
                                                        flex: 5,
                                                        paddingTop: 3,
                                                        fontSize: 12
                                                    }}
                                                >
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
                                                <Text
                                                    style={{
                                                        flex: 5,
                                                        paddingTop: 3,
                                                        fontSize: 12
                                                    }}
                                                >
                                                    {this.printTeachers(
                                                        this.props.teachers
                                                    )}
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
                                                    name="location-pin"
                                                    size={24}
                                                    color="red"
                                                />
                                                <Text
                                                    style={{
                                                        flex: 5,
                                                        paddingTop: 3,
                                                        fontSize: 12
                                                    }}
                                                >
                                                    {this.props.classroom}
                                                </Text>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </DialogContent>
                            </Dialog>
                        </View>
                    )}
                </View>
            </TouchableNativeFeedback>
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
    dialog: {
        borderRadius: 0,
        paddingVertical: 10
    },
    dialogTitle: {
        fontSize: 18,
        color: "#6a6a6a",
        fontWeight: "normal"
    },
    dialogInnerWrap: {
        flex: 1,
        paddingTop: 5
    },
    textInDialog: {
        fontSize: 16,
        color: "#6a6a6a",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        flexDirection: "row"
    }
});
