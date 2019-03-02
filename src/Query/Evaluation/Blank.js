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
} from "../../Components/RefreshListComponent";
import Toast from "react-native-easy-toast";
import Dialog, {
    DialogTitle,
    DialogButton,
    DialogContent
} from "react-native-popup-dialog";

const { width, height } = Dimensions.get("window");
export default class Blank extends Component {
    constructor(props) {
        super(props);
        this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
        this.onFooterRefresh = this.onFooterRefresh.bind(this);
        this.state = {
            alertVisible: false,
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
                    if (Platform.OS === "ios") {
                        if (this.refs.toast != undefined)
                            this.refs.toast.show("评教已经完成啦~", 5000);
                    } else {
                        ToastAndroid.show("评教已经完成啦~", ToastAndroid.LONG);
                    }
                }
            }
        });
    }

    evalAll() {
        if (this.state.blankList.length == 0) {
            this.setState({ alertVisible: true });
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
                        prob11: 10000 + Math.floor(Math.random() * 1000),
                        prob12: 15000 + Math.floor(Math.random() * 1000),
                        prob13: 20000 + Math.floor(Math.random() * 1000),
                        prob14: 25000 + Math.floor(Math.random() * 1000),
                        prob15: 30000 + Math.floor(Math.random() * 1000),
                        prob21: 35000 + Math.floor(Math.random() * 1000),
                        prob22: 40000 + Math.floor(Math.random() * 1000),
                        prob23: 45000 + Math.floor(Math.random() * 1000),
                        prob31: 50000 + Math.floor(Math.random() * 1000),
                        prob32: 55000 + Math.floor(Math.random() * 1000),
                        prob33: 60000 + Math.floor(Math.random() * 1000),
                        prob41: 65000 + Math.floor(Math.random() * 1000),
                        prob42: 70000 + Math.floor(Math.random() * 1000),
                        prob43: 75000 + Math.floor(Math.random() * 1000),
                        prob51: 80000 + Math.floor(Math.random() * 1000),
                        prob52: 85000 + Math.floor(Math.random() * 1000),
                        sat6: 90000 + Math.floor(Math.random() * 1000),
                        mulsel71:
                            10000000 + Math.floor(Math.random() * 1000000),
                        prob73: 95000 + Math.floor(Math.random() * 1000)
                    }
                };
                evalWithAnswer(
                    body,
                    this.state.blankList[i].evalItemId,
                    res => {
                        this.refreshList();
                        if (res.message == "error") {
                            if (Platform.OS === "ios") {
                                if (this.refs.toast != undefined)
                                    this.refs.toast.show("出错啦T^T", 2000);
                            } else {
                                ToastAndroid.show(
                                    "出错啦T^T",
                                    ToastAndroid.SHORT
                                );
                            }
                        }
                    }
                );
            }
    }

    render() {
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
                                            color: "#808080",
                                            lineHeight: 20
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
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: "transparent"
                            }}
                        >
                            <ActivityIndicator
                                style={{ flex: 1 }}
                                size="large"
                                color={Global.settings.theme.backgroundColor}
                            />
                        </View>
                    )}
                </View>
                <Dialog
                    visible={this.state.alertVisible}
                    dialogTitle={
                        <DialogTitle
                            title="提示"
                            style={{
                                backgroundColor: "#ffffff"
                            }}
                            titleStyle={{
                                color: "#6a6a6a",
                                fontWeight: 500
                            }}
                        />
                    }
                    actions={[
                        <DialogButton
                            text="知道啦"
                            textStyle={{
                                color: Global.settings.theme.backgroundColor,
                                fontSize: 14,
                                fontWeight: "normal"
                            }}
                            onPress={() => {
                                this.setState({ alertVisible: false });
                            }}
                        />
                    ]}
                    width={0.75}
                    height={0.45 * (width / height)}
                    containerStyle={styles.dialog}
                >
                    <DialogContent style={{ flex: 1, paddingBottom: 0 }}>
                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    paddingVertical: 10,
                                    alignItems: "center",
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        flex: 1,
                                        color: "#6a6a6a",
                                        lineHeight: 18
                                    }}
                                >
                                    现在没有需要评价的项目~
                                </Text>
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>
            </View>
        );
    }
}

const styles = StyleSheet.create({});
