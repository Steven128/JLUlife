import React, { Component } from "react";
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView
} from "react-native";
import Dialog, {
    ScaleAnimation,
    DialogContent
} from "react-native-popup-dialog";
import Global from "../Global";
import EIcon from "react-native-vector-icons/Entypo";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

export default class ClassItem extends Component {
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
            <TouchableOpacity
                onPress={() => {
                    this.setState({ dialogVisible: true });
                }}
            >
                <View style={[styles.container, { height: this.getHeight() }]}>
                    {this.props.blank ? (
                        <View />
                    ) : (
                        <View
                            style={[
                                styles.innerItem,
                                { backgroundColor: this.props.color }
                            ]}
                        >
                            <Text
                                style={[
                                    styles.innerItemText,
                                    { fontSize: this.props.fontSize }
                                ]}
                            >
                                {this.props.innerText}
                            </Text>
                        </View>
                    )}
                </View>
                {this.props.blank ? (
                    <View />
                ) : (
                    <Dialog
                        visible={this.state.dialogVisible}
                        dialogAnimation={new ScaleAnimation()}
                        onTouchOutside={() => {
                            this.setState({ dialogVisible: false });
                        }}
                        width={0.7}
                        height={0.4}
                        containerStyle={styles.dialog}
                    >
                        <DialogContent>
                            <ScrollView
                                style={{
                                    height: height * 0.4,
                                    paddingHorizontal: 10
                                }}
                            >
                                <Text
                                    style={[
                                        styles.dialogTitle,
                                        { fontSize: this.props.fontSize + 8 }
                                    ]}
                                >
                                    {this.props.lessonName}
                                </Text>

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
                                            size={(this.props.fontSize - 1) * 2}
                                            color="lightgreen"
                                        />
                                        <Text
                                            style={{
                                                flex: 5,
                                                paddingTop: 3,
                                                fontSize: this.props.fontSize
                                            }}
                                        >
                                            第{this.props.beginWeek} -{" "}
                                            {this.props.endWeek}周
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
                                            size={(this.props.fontSize - 1) * 2}
                                            color="orange"
                                        />
                                        <Text
                                            style={{
                                                flex: 5,
                                                paddingTop: 3,
                                                fontSize: this.props.fontSize
                                            }}
                                        >
                                            周
                                            {this.numToChinese(
                                                this.props.dayOfWeek
                                            )}{" "}
                                            第{this.props.time[0]} -{" "}
                                            {
                                                this.props.time[
                                                    this.props.time.length - 1
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
                                            size={(this.props.fontSize - 1) * 2}
                                            color="lightblue"
                                        />
                                        <Text
                                            style={{
                                                flex: 5,
                                                paddingTop: 3,
                                                fontSize: this.props.fontSize
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
                                            size={(this.props.fontSize - 1) * 2}
                                            color="red"
                                        />
                                        <Text
                                            style={{
                                                flex: 5,
                                                paddingTop: 3,
                                                fontSize: this.props.fontSize
                                            }}
                                        >
                                            {this.props.classroom}
                                        </Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </DialogContent>
                    </Dialog>
                )}
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
        padding: 2
    },
    innerItem: {
        flex: 1,
        borderRadius: 5,
        padding: 3,
        overflow: "hidden"
    },
    innerItemText: {
        color: "#fff"
    },
    dialog: {
        borderRadius: 0,
        paddingVertical: 15,
        overflow: "scroll"
    },
    dialogTitle: {
        fontSize: 22,
        color: "#555",
        paddingTop: 25,
        paddingBottom: 15
    },
    dialogInnerWrap: {
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 5
    },
    textInDialog: {
        fontSize: 16,
        color: "#777",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        flexDirection: "row"
    }
});
