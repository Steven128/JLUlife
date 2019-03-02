import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class AvgGpointItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>平均绩点成绩统计</Text>
                <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                    <Text style={[styles.text, styles.textTitle]}>
                        按首次成绩
                    </Text>
                    <View>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.textTitle]}>
                                平均绩点
                            </Text>
                            <Text style={[styles.text]}>
                                {Math.floor(
                                    this.props.gpointData.gpaFirst * 10000
                                ) / 10000}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.textTitle]}>
                                平均成绩
                            </Text>
                            <Text style={[styles.text]}>
                                {Math.floor(
                                    this.props.gpointData.avgScoreFirst * 10000
                                ) / 10000}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                    <Text style={[styles.text, styles.textTitle]}>
                        按最好成绩
                    </Text>
                    <View>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.textTitle]}>
                                平均绩点
                            </Text>
                            <Text style={[styles.text]}>
                                {Math.floor(
                                    this.props.gpointData.gpaBest * 10000
                                ) / 10000}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.textTitle]}>
                                平均成绩
                            </Text>
                            <Text style={[styles.text]}>
                                {Math.floor(
                                    this.props.gpointData.avgScoreBest * 10000
                                ) / 10000}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        backgroundColor: "#fff",
        margin: 10,
        marginBottom: 0
    },
    title: {
        paddingBottom: 10,
        fontSize: 16,
        color: "#6a6a6a",
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        lineHeight: 20
    },
    row: {
        flexDirection: "row",
        paddingVertical: 3,
        paddingHorizontal: 10
    },
    text: {
        color: "#808080",
        lineHeight: 18
    },
    textTitle: {
        paddingRight: 20,
        lineHeight: 18
    }
});
