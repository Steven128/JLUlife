import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import NotificationItem from "./NotificationItem";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import NotificationInterface from "../FetchInterface/NotificationInterface";

const { width, height } = Dimensions.get("window");

export default class NotificationView extends Component {
    constructor(props) {
        super(props);
        this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
        this.onFooterRefresh = this.onFooterRefresh.bind(this);
        this.state = {
            pageCount: 1,
            refreshState: RefreshState.Idle,
            oaList: this.props.oaList
        };
    }

    onHeaderRefresh() {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing
        });
        NotificationInterface(1, res => {
            this.setState({
                oaList: res,
                refreshState: RefreshState.Idle,
                pageCount: 1
            });
        });
    }

    onFooterRefresh() {
        this.setState({
            refreshState: RefreshState.FooterRefreshing
        });
        NotificationInterface(this.state.pageCount + 1, res => {
            var newList = this.state.oaList;
            for (var i in res) newList.push(res[i]);
            this.setState({
                oaList: newList,
                refreshState: RefreshState.Idle,
                pageCount: this.state.pageCount + 1
            });
        });
    }

    render() {
        return (
            <RefreshListView
                data={this.state.oaList}
                renderItem={({ item }) => (
                    <NotificationItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        comeFrom={item.comeFrom}
                        time={item.time}
                        toTop={item.toTop}
                        navigation={this.props.navigation}
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

const styles = StyleSheet.create({});
