import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    FlatList,
    ActivityIndicator,
    ToastAndroid,
    Alert,
    Text
} from "react-native";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import Global from "../../Global";
import EvaluationItem from "./EvaluationItem";
import {
    getBlankList,
    evalWithAnswer
} from "../../FetchInterface/EvaluationInterface";
import {
    FooterFailureComponent,
    FooterRefreshingComponent,
    FooterEmptyDataComponent,
    FooterNoMoreDataComponent
} from "../../RefreshListComponent";
import Toast from "react-native-easy-toast";

const { width, height } = Dimensions.get("window");
export default class Blank extends Component {
    constructor(props) {
        super(props);
        this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
        this.onFooterRefresh = this.onFooterRefresh.bind(this);
        this.state = {
            getBlankList: false,
            blankList: [],
            refreshState: RefreshState.Idle,
            evalLength: 0
        };
    }

    componentDidMount() {
        getBlankList(res => {
            if (res.message == "success") {
                this.setState({
                    blankList: res.content,
                    getBlankList: true,
                    evalLength: res.content.length
                });
            }
        });
    }

    onHeaderRefresh() {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing
        });
        getBlankList(res => {
            if (res.message == "success") {
                this.setState({
                    blankList: res.content,
                    getBlankList: true,
                    evalLength: res.content.length,
                    refreshState: RefreshState.Idle
                });
            }
        });
    }

    onFooterRefresh() {
        this.setState({
            refreshState: RefreshState.NoMoreData
        });
    }

    refreshList() {
        this.setState({
            blankList: [],
            getBlankList: false,
            evalLength: 0
        });
        getBlankList(res => {
            if (res.message == "success") {
                this.setState({
                    blankList: res.content,
                    getBlankList: true,
                    evalLength: res.content.length
                });
                if (res.content.length == 0) {
                    Platform.OS === "ios"
                        ? this.refs.toast.show("评教已经完成啦~", 2000)
                        : ToastAndroid.show(
                              "评教已经完成啦~",
                              ToastAndroid.LONG
                          );
                }
            }
        });
    }

    evalAll() {
        if (this.state.blankList.length == 0) {
            Alert.alert(
                "提示",
                "现在没有需要评价的项目~",
                [
                    {
                        text: "知道啦",
                        onPress: () => {
                            return false;
                        }
                    }
                ],
                { cancelable: false }
            );
        } else
            for (var i in this.state.blankList) {
                var body = {
                    guidelineId: 120,
                    evalItemId: this.state.blankList[i].evalItemId,
                    answers: {
                        prob11: "A",
                        prob12: "A",
                        prob13: "N",
                        prob14: "A",
                        prob15: "A",
                        prob21: "A",
                        prob22: "A",
                        prob23: "A",
                        prob31: "A",
                        prob32: "A",
                        prob33: "A",
                        prob41: "A",
                        prob42: "A",
                        prob43: "A",
                        prob51: "A",
                        prob52: "A",
                        sat6: "A",
                        mulsel71: "K",
                        advice72: "",
                        prob73: "Y"
                    },
                    clicks: {
                        _boot_: 0,
                        prob11: 9641,
                        prob12: 14808,
                        prob13: 18801,
                        prob14: 28249,
                        prob15: 31641,
                        prob21: 37225,
                        prob22: 38497,
                        prob23: 40170,
                        prob31: 42129,
                        prob32: 44162,
                        prob33: 45337,
                        prob41: 51345,
                        prob42: 52522,
                        prob43: 53729,
                        prob51: 55306,
                        prob52: 60449,
                        sat6: 61657,
                        mulsel71: 47767259,
                        prob73: 79145
                    }
                };
                console.log(this.state.blankList[i].evalItemId);
                evalWithAnswer(
                    body,
                    this.state.blankList[i].evalItemId,
                    res => {
                        this.refreshList();
                    }
                );
            }
    }

    render() {
        for (var i in this.state.blankList) {
            console.log(this.state.blankList[i].evalItemId);
        }
        console.log("\n");
        return (
            <View
                style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: "#ccc"
                }}
            >
                <View
                    style={{
                        flex: 1,
                        borderRightWidth: 1,
                        borderRightColor: "#ccc"
                    }}
                >
                    <Toast ref="toast" />
                    {this.state.getBlankList ? (
                        <RefreshListView
                            data={this.state.blankList}
                            ListEmptyComponent={
                                <View
                                    style={{
                                        flex: 1,
                                        paddingHorizontal: 30,
                                        paddingVertical: 15
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: "#808080"
                                        }}
                                    >
                                        所有评价都已经完成啦~
                                    </Text>
                                </View>
                            }
                            renderItem={({ item }) => (
                                <EvaluationItem
                                    hasEvaluated={false}
                                    evalItemId={item.evalItemId}
                                    teacherName={item.target.name}
                                    schoolName={item.target.school.schoolName}
                                    lessonName={item.targetClar.notes}
                                    refreshList={this.refreshList.bind(this)}
                                />
                            )}
                            refreshState={this.state.refreshState}
                            onHeaderRefresh={this.onHeaderRefresh}
                            onFooterRefresh={this.onFooterRefresh}
                            footerRefreshingComponent={
                                <FooterRefreshingComponent />
                            }
                            footerFailureComponent={<FooterFailureComponent />}
                            footerNoMoreDataComponent={
                                <FooterNoMoreDataComponent />
                            }
                            footerEmptyDataComponent={
                                <FooterEmptyDataComponent />
                            }
                        />
                    ) : (
                        <View style={{ paddingVertical: height / 2 - 150 }}>
                            <ActivityIndicator
                                style={{}}
                                size="large"
                                color={Global.settings.theme.backgroundColor}
                            />
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({});
