import React, { Component } from "react";
import {
    TouchableNativeFeedback,
    ScrollView,
    Dimensions,
    StyleSheet,
    View,
    Text
} from "react-native";
import Dialog, {
    ScaleAnimation,
    DialogContent
} from "react-native-popup-dialog";
import Global from "../Global";
import ScoreChart from "./ScoreChart";
import AppStorage from "../AppStorage";

const { width, height } = Dimensions.get("window");

export default class ScoreItemAndroid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogVisible: false,
            getStat: false,
            scoreStat: []
        };
    }
    componentDidMount() {
        AppStorage._load("scoreStat" + this.props.asId, res => {
            if (res.message == "success") {
                this.setState({
                    scoreStat: res.content,
                    getStat: true
                });
            }
        });
    }
    render() {
        var lessonType = this.props.type;
        if (this.props.type == 4160) lessonType = "必修课";
        else if (this.props.type == 4161) lessonType = "选修课";
        else if (this.props.type == 4162) lessonType = "限选课";
        else if (this.props.type == 4163) lessonType = "校选修课";
        else if (this.props.type == 4164) lessonType = "体育课";
        else lessonType = "其他";

        return (
            <TouchableNativeFeedback
                onPress={() => {
                    this.setState({ dialogVisible: true });
                }}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.courName}</Text>
                    <Text style={styles.text}>
                        {this.props.dateScore.substring(0, 4)}年
                        {this.props.dateScore.substring(5, 7)}月
                        {this.props.dateScore.substring(8, 10)}日发布，
                        {this.props.isPass == "Y" ? "已通过" : "未通过"}
                    </Text>
                    <Text style={styles.text}>
                        分数：{this.props.score}，绩点：{this.props.gpoint}
                    </Text>
                    <Dialog
                        visible={this.state.dialogVisible}
                        dialogAnimation={new ScaleAnimation()}
                        onTouchOutside={() => {
                            this.setState({ dialogVisible: false });
                        }}
                        width={0.9}
                        height={0.75}
                        containerStyle={styles.dialog}
                    >
                        <DialogContent style={{ flex: 1 }}>
                            <Text style={styles.dialogTitle}>成绩详情</Text>
                            <Text style={[styles.text, styles.textInDialog]}>
                                {this.props.courName}
                            </Text>
                            <View
                                style={{
                                    height: 5,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#ccc"
                                }}
                            />
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{
                                    height: height * 0.7 - 100
                                }}
                            >
                                <View style={styles.dialogInnerWrap}>
                                    <Text
                                        style={[
                                            styles.text,
                                            styles.textInDialog
                                        ]}
                                    >
                                        类型： {lessonType}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.text,
                                            styles.textInDialog
                                        ]}
                                    >
                                        学期：{this.props.termName}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.text,
                                            styles.textInDialog
                                        ]}
                                    >
                                        发布时间：
                                        {this.props.dateScore.substring(0, 4)}年
                                        {this.props.dateScore.substring(5, 7)}月
                                        {this.props.dateScore.substring(8, 10)}
                                        日
                                        {" " +
                                            this.props.dateScore.substring(
                                                11,
                                                this.props.dateScore.length
                                            )}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.text,
                                            styles.textInDialog
                                        ]}
                                    >
                                        学分：{this.props.credit}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.text,
                                            styles.textInDialog
                                        ]}
                                    >
                                        分数：{this.props.score}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.text,
                                            styles.textInDialog
                                        ]}
                                    >
                                        绩点：
                                        {this.props.gpoint}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.text,
                                            styles.textInDialog
                                        ]}
                                    >
                                        是否通过：
                                        {this.props.isPass == "Y"
                                            ? "已通过"
                                            : "未通过"}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.text,
                                            styles.textInDialog
                                        ]}
                                    >
                                        是否重修：
                                        {this.props.isReselect == "Y"
                                            ? "是"
                                            : "否"}
                                    </Text>
                                </View>
                                <View style={{ paddingTop: 10 }}>
                                    {this.state.getStat ? (
                                        <ScoreChart
                                            scoreStat={this.state.scoreStat}
                                        />
                                    ) : (
                                        <View />
                                    )}
                                </View>
                            </ScrollView>
                        </DialogContent>
                    </Dialog>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    title: {
        color: "#888",
        fontSize: 16,
        fontWeight: "normal",
        paddingBottom: 5
    },
    text: {
        color: "#888",
        fontSize: 12
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
        paddingHorizontal: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    textInDialog: {
        fontSize: 16,
        color: "#555",
        paddingVertical: 2
    }
});
