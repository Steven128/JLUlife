import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    FlatList,
    ActivityIndicator,
    Text,
    Platform
} from "react-native";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import Global from "../../Global";
import EvaluationItem from "./EvaluationItem";
import { getDoneList } from "../../FetchInterface/EvaluationInterface";
import {
    FooterFailureComponent,
    FooterRefreshingComponent,
    FooterEmptyDataComponent,
    FooterNoMoreDataComponent
} from "../../Components/RefreshListComponent";

const { width, height } = Dimensions.get("window");
export default class Done extends Component {
    constructor(props) {
        super(props);
        this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
        this.onFooterRefresh = this.onFooterRefresh.bind(this);
        this.state = {
            getDoneList: false,
            DoneList: [],
            refreshState: RefreshState.Idle
        };
    }

    componentDidMount() {
        getDoneList(res => {
            if (res.message == "success") {
                this.setState({
                    doneList: res.content,
                    getDoneList: true
                });
            }
        });
    }

    componentDidUpdate() {
        getDoneList(res => {
            if (res.message == "success") {
                this.setState({
                    doneList: res.content,
                    getDoneList: true
                });
            }
        });
    }

    onHeaderRefresh() {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing
        });
        getDoneList(res => {
            if (res.message == "success") {
                this.setState({
                    doneList: res.content,
                    getDoneList: true,
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

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: "#ccc"
                }}
            >
                <View style={{ flex: 1 }}>
                    {this.state.getDoneList ? (
                        <RefreshListView
                            data={this.state.doneList}
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
                                        好像什么东西都没有ヽ(ー_ー)ノ
                                    </Text>
                                </View>
                            }
                            renderItem={({ item }) => (
                                <EvaluationItem
                                    hasEvaluated={true}
                                    evalItemId={item.evalItemId}
                                    teacherName={item.target.name}
                                    schoolName={item.target.school.schoolName}
                                    evalTime={item.dateInput}
                                    lessonName={item.targetClar.notes}
                                    evalTitle={item.evalActTime.evalTime.title}
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
            </View>
        );
    }
}

const styles = StyleSheet.create({});
