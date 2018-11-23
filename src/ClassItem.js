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
import Global from "../src/Global";
import Icon from "react-native-vector-icons/AntDesign";
import MIcon from "react-native-vector-icons/MaterialIcons";

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
        return this.props.length * 70;
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
                            <Text style={styles.innerItemText}>
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
                            <Text style={styles.dialogTitle}>
                                {this.props.lessonName}
                            </Text>
                            <ScrollView
                                style={{
                                    height: height * 0.5
                                }}
                            >
                                <View style={styles.dialogInnerWrap}>
                                    <View
                                        style={[
                                            styles.text,
                                            styles.textInDialog
                                        ]}
                                    >
                                        <Icon
                                            style={{ flex: 1 }}
                                            name="calendar"
                                            size={28}
                                            color="lightgreen"
                                        />
                                        <Text style={{ flex: 5 }}>
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
                                        <Icon
                                            style={{ flex: 1 }}
                                            name="clockcircle"
                                            size={28}
                                            color="orange"
                                        />
                                        <Text style={{ flex: 5 }}>
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
                                        <MIcon
                                            style={{ flex: 1 }}
                                            name="person"
                                            size={26}
                                            color="lightblue"
                                        />
                                        <Text style={{ flex: 5 }}>
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
                                        <MIcon
                                            style={{ flex: 1 }}
                                            name="location-on"
                                            size={28}
                                            color="red"
                                        />
                                        <Text style={{ flex: 5 }}>
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
        padding: 1
    },
    innerItem: {
        flex: 1,
        borderRadius: 5,
        padding: 3
    },
    innerItemText: {
        color: "#fff"
    },
    dialog: {
        borderRadius: 0,
        paddingVertical: 15,
        paddingHorizontal: 10
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
