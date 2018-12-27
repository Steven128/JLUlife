import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import NotificationItem from "./NotificationItem";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import { searchOa } from "../FetchInterface/NotificationInterface";
import {
    FooterFailureComponent,
    FooterRefreshingComponent,
    FooterEmptyDataComponent,
    FooterNoMoreDataComponent
} from "../RefreshListComponent";

const { width, height } = Dimensions.get("window");

export default class SearchView extends Component {
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
        console.log("onHeaderRefresh");
        this.setState({
            refreshState: RefreshState.HeaderRefreshing
        });
        searchOa(1, this.props.searchnr, this.props.searchlx, res => {
            if (res.message == "success") {
                this.setState({
                    oaList: res.content,
                    refreshState: RefreshState.Idle,
                    pageCount: 1
                });
            }
        });
    }

    onFooterRefresh() {
        console.log("onFooterRefresh");
        this.setState({
            refreshState: RefreshState.FooterRefreshing
        });
        console.log(this.state.pageCount + 1);
        searchOa(
            this.state.pageCount + 1,
            this.props.searchnr,
            this.props.searchlx,
            res => {
                if (res.message == "success") {
                    var newList = this.state.oaList;
                    for (var i in res.content) newList.push(res.content[i]);
                    this.setState({
                        oaList: newList,
                        refreshState: RefreshState.Idle,
                        pageCount: this.state.pageCount + 1
                    });
                    if (res.content.length == 0) {
                        this.setState({
                            refreshState: RefreshState.NoMoreData
                        });
                    }
                }
            }
        );
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
                footerRefreshingComponent={<FooterRefreshingComponent />}
                footerFailureComponent={<FooterFailureComponent />}
                footerNoMoreDataComponent={<FooterNoMoreDataComponent />}
                footerEmptyDataComponent={<FooterEmptyDataComponent />}
            />
        );
    }
}

const styles = StyleSheet.create({});
