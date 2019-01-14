import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    FlatList,
    ActivityIndicator
} from "react-native";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import Global from "../Global";
import EduInterface from "../FetchInterface/EduInterface";
import EducationItem from "./EducationItem";
import {
    FooterFailureComponent,
    FooterRefreshingComponent,
    FooterEmptyDataComponent,
    FooterNoMoreDataComponent
} from "../Components/RefreshListComponent";

const { width, height } = Dimensions.get("window");
export default class EduInfo extends Component {
    constructor(props) {
        super(props);
        this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
        this.onFooterRefresh = this.onFooterRefresh.bind(this);
        this.state = {
            getEdu: false,
            eduList: [],
            pageCount: 1,
            refreshState: RefreshState.Idle
        };
    }

    componentDidMount() {
        EduInterface("jxxx", 1, res => {
            this.setState({
                eduList: res
            });
            this.setState({
                getEdu: true
            });
        });
    }

    onHeaderRefresh() {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing
        });
        EduInterface("jxxx", 1, res => {
            this.setState({
                eduList: res,
                refreshState: RefreshState.Idle,
                pageCount: 1
            });
        });
    }

    onFooterRefresh() {
        this.setState({
            refreshState: RefreshState.FooterRefreshing
        });
        EduInterface("jxxx", this.state.pageCount + 1, res => {
            if (res == "nomore")
                this.setState({ refreshState: RefreshState.NoMoreData });
            else {
                var newList = this.state.eduList;
                for (var i in res) newList.push(res[i]);
                this.setState({
                    eduList: newList,
                    refreshState: RefreshState.Idle,
                    pageCount: this.state.pageCount + 1,
                    refreshState: RefreshState.Idle
                });
            }
        });
    }

    render() {
        return (
            <View style={{ borderRightWidth: 1, borderRightColor: "#ccc" }}>
                <View style={{ borderRightWidth: 1, borderRightColor: "#ccc" }}>
                    {this.state.getEdu ? (
                        <RefreshListView
                            data={this.state.eduList}
                            renderItem={({ item }) => (
                                <EducationItem
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
