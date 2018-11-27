import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, ToastAndroid } from "react-native";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import ScoreItem from "./ScoreItem";
import Global from "../Global";
import ScoreInterface from "../FetchInterface/ScoreInterface";

const { width, height } = Dimensions.get("window");
export default class ScoreView extends Component {
    constructor(props) {
        super(props);
        this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
        this.onFooterRefresh = this.onFooterRefresh.bind(this);
        this.state = {
            scoreList: this.props.scoreList,
            refreshState: RefreshState.Idle
        };
    }

    onHeaderRefresh() {
        if (!Global.isOnline) {
            ToastAndroid.show("登录后才能刷新成绩哟~", ToastAndroid.SHORT);
            return;
        }
        this.setState({
            refreshState: RefreshState.HeaderRefreshing
        });
        ScoreInterface(res => {
            this.setState({
                scoreList: res,
                refreshState: RefreshState.Idle
            });
        });
    }

    onFooterRefresh() {
        this.setState({
            refreshState: RefreshState.NoMoreData
        });
    }

    render() {
        var items = [];
        var scoreList = this.state.scoreList;
        for (var i in scoreList) {
            var scoreItem = (
                <ScoreItem
                    key={i}
                    asId={scoreList[i].asId}
                    courName={scoreList[i].courName}
                    type={scoreList[i].type}
                    termName={scoreList[i].termName}
                    dateScore={scoreList[i].dateScore}
                    credit={scoreList[i].credit}
                    isPass={scoreList[i].isPass}
                    score={scoreList[i].score}
                    gpoint={scoreList[i].gpoint}
                />
            );
            items.push(scoreItem);
        }
        return (
            <RefreshListView
                data={this.state.scoreList}
                renderItem={({ item }) => (
                    <ScoreItem
                        key={item.courName}
                        asId={item.asId}
                        courName={item.courName}
                        type={item.type}
                        termName={item.termName}
                        dateScore={item.dateScore}
                        credit={item.credit}
                        isPass={item.isPass}
                        score={item.score}
                        gpoint={item.gpoint}
                    />
                )}
                refreshState={this.state.refreshState}
                onHeaderRefresh={this.onHeaderRefresh}
                onFooterRefresh={this.onFooterRefresh}
                footerRefreshingText="玩命加载中 >.<"
                footerFailureText="我擦嘞，居然失败了 =.=!"
                footerNoMoreDataText="-我是有底线的-"
                footerEmptyDataText="-好像什么东西都没有-"
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {}
});
