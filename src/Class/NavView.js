import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import Global from "../Global";
import ClassItem from "./ClassItem";

const { width, height } = Dimensions.get("window");

export class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekList: ["一", "二", "三", "四", "五", "六", "日"]
        };
    }

    render() {
        var container = [];
        for (var i = 0; i < 7; i++) {
            container.push(
                <View
                    style={[
                        styles.topNav,
                        {
                            backgroundColor: this.props.backgroundColor,
                            opacity: this.props.opacity
                        }
                    ]}
                >
                    <Text style={{ color: this.props.color }}>
                        {this.state.weekList[i]}
                    </Text>
                    <Text style={{ color: this.props.color }}>
                        {this.props.weekDayList.date[i]}
                    </Text>
                </View>
            );
        }

        return (
            <View
                style={{
                    height: 50,
                    flexDirection: "row"
                }}
            >
                <View
                    style={[
                        styles.topNav,
                        {
                            flex: 0.5,
                            backgroundColor: this.props.backgroundColor,
                            opacity: this.props.opacity
                        }
                    ]}
                >
                    <Text style={{ color: this.props.color }}>
                        {this.props.weekDayList.month}
                    </Text>
                    <Text style={{ color: this.props.color }}>月</Text>
                </View>
                {container}
            </View>
        );
    }
}

export class LeftNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        };
    }

    render() {
        var container = [];
        for (var i = 0; i < this.props.classLength; i++) {
            container.push(
                <View
                    style={[
                        styles.leftNav,
                        {
                            height: this.props.itemHeight,
                            backgroundColor: this.props.backgroundColor,
                            opacity: this.props.opacity
                        }
                    ]}
                >
                    <Text style={{ color: this.props.color }}>
                        {this.state.classList[i]}
                    </Text>
                </View>
            );
        }
        return <View style={[styles.column, { flex: 0.5 }]}>{container}</View>;
    }
}

const styles = StyleSheet.create({
    topNav: {
        // height: 50,
        flex: 1,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlignVertical: "center"
    },
    leftNav: {
        height: 80,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlignVertical: "center"
    }
});
