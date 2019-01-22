import React, { Component } from "react";
import { StyleSheet, Dimensions, ToastAndroid, Platform } from "react-native";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import ScoreItem from "./ScoreItem";
import Global from "../Global";
import ScoreHandler from "../FetchInterface/ScoreHandler";
import Toast from "react-native-easy-toast";
import {
    FooterFailureComponent,
    FooterRefreshingComponent,
    FooterEmptyDataComponent,
    FooterNoMoreDataComponent
} from "../Components/RefreshListComponent";

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
            if (Platform.OS === "ios") {
                if (this.refs.toast != undefined)
                    this.refs.toast.show("登录后才能刷新成绩哟~", 2000);
            } else {
                ToastAndroid.show("登录后才能刷新成绩哟~", ToastAndroid.SHORT);
            }
            return;
        }
        this.setState({
            refreshState: RefreshState.HeaderRefreshing
        });
        ScoreHandler(res => {
            if (res.message == "success") {
                this.setState({
                    scoreList: res.content,
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
                footerRefreshingComponent={<FooterRefreshingComponent />}
                footerFailureComponent={<FooterFailureComponent />}
                footerNoMoreDataComponent={<FooterNoMoreDataComponent />}
                footerEmptyDataComponent={<FooterEmptyDataComponent />}
                tintColor={Global.settings.theme.backgroundColor}
                colors={Global.settings.theme.backgroundColor}
                progressBackgroundColor={Global.settings.theme.backgroundColor}
            >
                <Toast ref="toast" />
            </RefreshListView>
        );
    }
}

const styles = StyleSheet.create({
    container: {}
});
