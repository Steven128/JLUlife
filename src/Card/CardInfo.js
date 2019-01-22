import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    FlatList,
    ActivityIndicator
} from "react-native";
import cheerio from "cheerio";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import Global from "../Global";
import {
    FooterFailureComponent,
    FooterRefreshingComponent,
    FooterEmptyDataComponent,
    FooterNoMoreDataComponent
} from "../Components/RefreshListComponent";

const { width, height } = Dimensions.get("window");
export default class CardInfo extends Component {
    constructor(props) {
        super(props);
        this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
        this.onFooterRefresh = this.onFooterRefresh.bind(this);
        this.state = {
            getInfo: false,
            info: [],
            refreshState: RefreshState.Idle
        };
    }

    componentDidMount() {
        this.getInfo(Global.card.cookie, res => {
            if (res.message == "success") {
                this.setState({
                    info: res.content,
                    getInfo: true
                });
            } else {
                Global.card.cookie = "";
                Global.card.isOnline = false;
                this.props.navigation.navigate("Login");
            }
        });
    }

    onHeaderRefresh() {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing
        });
        this.getInfo(Global.card.cookie, res => {
            this.setState({ getInfo: false });
            if (res.message == "success") {
                this.setState({
                    info: res.content,
                    getInfo: true,
                    refreshState: RefreshState.Idle
                });
            } else {
                this.setState({
                    refreshState: RefreshState.Idle
                });
                Global.card.cookie = "";
                Global.card.isOnline = false;
                this.props.navigation.navigate("Login");
            }
        });
    }

    onFooterRefresh() {
        this.setState({
            refreshState: RefreshState.NoMoreData
        });
    }

    getInfo(cookie, callback) {
        let url = "http://ykt.jlu.edu.cn:8070/SynCard/Manage/BasicInfo";
        fetch(url, {
            method: "GET",
            headers: {
                Accept:
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                "Accept-Language": " zh-CN,zh;q=0.9",
                Cookie: cookie,
                Connection: " keep-alive",
                Host: "ykt.jlu.edu.cn:8070"
            }
        })
            .then(response => response.text())
            .then(response => {
                var info = this.parseHTML(response);
                callback({ message: "success", content: info });
            })
            .catch(error => {
                if (__DEV__) console.error(error);
                callback({ message: "error" });
            });
    }

    parseHTML(_document) {
        const $ = cheerio.load(_document);
        var itemContainer = $(".mobileT .second");
        var infoContainer = [];
        var key = [
            "姓名",
            "学工号",
            "校园卡余额",
            "银行卡号",
            "当前过渡余额",
            "上次过渡余额",
            "挂失状态",
            "冻结状态",
            "身份类型",
            "部门名称"
        ];
        for (var i = 0; i < itemContainer.length; i++) {
            var info = $(itemContainer[i]).html();
            info = unescape(info.replace(/&#x/g, "%u").replace(/;/g, ""));
            info = info.replace(/\r\n/g, "");
            info = info.replace(/ /g, "");
            infoContainer.push({ name: key[i], value: info });
        }
        return infoContainer;
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: "#ccc",
                    backgroundColor: "#f5f5f5"
                }}
            >
                {this.state.getInfo ? (
                    <RefreshListView
                        data={this.state.info}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.subTitle}>
                                    {item.value}
                                </Text>
                            </View>
                        )}
                        refreshState={this.state.refreshState}
                        onHeaderRefresh={this.onHeaderRefresh}
                        onFooterRefresh={this.onFooterRefresh}
                        footerRefreshingComponent={
                            <View style={{ height: 0 }} />
                        }
                        footerFailureComponent={<View style={{ height: 0 }} />}
                        footerNoMoreDataComponent={
                            <View style={{ height: 0 }} />
                        }
                        footerEmptyDataComponent={
                            <View style={{ height: 0 }} />
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
        );
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    title: {
        fontSize: 16,
        color: "#555",
        paddingBottom: 5
    },
    subTitle: {
        color: "#808080"
    }
});
