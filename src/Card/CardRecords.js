import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    FlatList,
    ActivityIndicator
} from "react-native";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import cheerio from "cheerio";
import Global from "../Global";
import {
    FooterFailureComponent,
    FooterRefreshingComponent,
    FooterEmptyDataComponent,
    FooterNoMoreDataComponent
} from "../Components/RefreshListComponent";

const { width, height } = Dimensions.get("window");
export default class CardRecords extends Component {
    constructor(props) {
        super(props);
        this.onHeaderRefresh = this.onHeaderRefresh.bind(this);
        this.onFooterRefresh = this.onFooterRefresh.bind(this);
        this.state = {
            getList: false,
            recordsList: [],
            cardNumber: "",
            beginTime: "",
            endTime: "",
            refreshState: RefreshState.Idle
        };
    }

    componentDidMount() {
        this.getCardNumber(Global.card.cookie, res => {
            if (res.message == "success") {
                var beginTime = new Date().toJSON().substring(0, 10);
                var endTime = this.getDateBefore(this.state.beginTime);
                this.setState({
                    cardNumber: res.content,
                    beginTime: beginTime,
                    endTime: endTime
                });
                this.getRecordsList(
                    Global.card.cookie,
                    res.content,
                    beginTime,
                    endTime,
                    res => {
                        if (res.message == "success") {
                            this.setState({
                                recordsList: res.content,
                                getList: true
                            });
                        }
                    }
                );
            } else {
                Global.card.cookie = "";
                Global.card.isOnline = false;
                this.props.navigation.navigate("Login");
            }
        });
    }

    getCardNumber(cookie, callback) {
        let url = "http://ykt.jlu.edu.cn:8070/SynCard/Manage/TrjnQuery";
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
                var cardNumber = this.parseCardNumber(response);
                callback({ message: "success", content: cardNumber });
            })
            .catch(error => {
                if (__DEV__) console.error(error);
                callback({ message: "error" });
            });
    }

    parseCardNumber(_document) {
        const $ = cheerio.load(_document);
        var itemContainer = $("#selectCardnos option");
        var cardNumber = $(itemContainer[0]).html();
        cardNumber = unescape(
            cardNumber.replace(/&#x/g, "%u").replace(/;/g, "")
        );
        cardNumber = cardNumber.replace(/ /g, "");
        cardNumber = cardNumber.match(/卡(.*?)$/)[1];
        return cardNumber;
    }

    getDateBefore(targetDate) {
        var date = new Date(targetDate);
        var newDate = new Date(date.getTime() - 6 * 24 * 60 * 60 * 1000);
        var time =
            newDate.getFullYear() +
            "-" +
            (newDate.getMonth() + 1) +
            "-" +
            newDate.getDate();
        return time;
    }

    getRecordsList(cookie, cardno, beginTime, endTime, callback) {
        cardno = "card_" + cardno + "_" + cardno;
        beginTime = new Date(beginTime).toLocaleDateString();
        endTime = new Date(endTime).toLocaleDateString();
        let url =
            "http://ykt.jlu.edu.cn:8070/SynCard/Manage/TrjnHistory?cardno=" +
            cardno +
            "&beginTime=" +
            beginTime +
            "&endTime=" +
            endTime;
        fetch(url, {
            method: "GET",
            headers: {
                Accept: "text/html, */*; q=0.01",
                "Accept-Language": " zh-CN,zh;q=0.9",
                Cookie: cookie,
                Connection: " keep-alive",
                Host: "ykt.jlu.edu.cn:8070",
                Referer: "http://ykt.jlu.edu.cn:8070/SynCard/Manage/TrjnQuery"
            }
        })
            .then(response => response.text())
            .then(response => {
                var recordList = this.parseHTML(response);
                callback({ message: "success", content: recordList });
            })
            .catch(error => {
                if (__DEV__) console.error(error);
                callback({ message: "error" });
            });
    }

    parseHTML(_document) {
        const $ = cheerio.load(_document);
        var itemContainer = $(".mobileT");
        var listContainer = [];
        for (var i = 0; i < itemContainer.length; i++) {
            var trContainer = $(itemContainer[i]).children("tr");
            var singleContainer = [];
            for (var j = 0; j < trContainer.length; j++) {
                var value = $(trContainer[j])
                    .find(".second")
                    .html();
                value = unescape(value.replace(/&#x/g, "%u").replace(/;/g, ""));
                value = value.replace('<span class="red">', "");
                value = value.replace('<span class="blue">', "");
                value = value.replace(/\r\n/g, "");
                value = value.replace(/  /g, "");
                value = value.replace("</span>", "");
                singleContainer.push(value);
            }
            var singleItem = {};
            singleItem.transTime = singleContainer[0];
            singleItem.businessName = singleContainer[1];
            singleItem.transName = singleContainer[2];
            singleItem.price = singleContainer[3];
            singleItem.balance = singleContainer[4];
            listContainer.push(singleItem);
        }
        return listContainer;
    }

    onHeaderRefresh() {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing
        });
        this.getRecordsList(
            Global.card.cookie,
            this.state.cardNumber,
            this.state.beginTime,
            this.state.endTime,
            res => {
                this.setState({ getList: false });
                if (res.message == "success") {
                    this.setState({
                        recordsList: res.content,
                        getList: true,
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
            }
        );
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
                    borderRightColor: "#ccc",
                    backgroundColor: "#f5f5f5"
                }}
            >
                {this.state.getList ? (
                    <RefreshListView
                        data={this.state.recordsList}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={styles.title}>
                                    {item.transName + "  " + item.price + "元"}
                                </Text>
                                <Text style={styles.subTitle}>
                                    消费时间： {item.transTime}
                                </Text>
                                <Text style={styles.subTitle}>
                                    商户名称： {item.businessName}
                                </Text>
                                <Text style={styles.subTitle}>
                                    卡余额： {item.balance}
                                </Text>
                            </View>
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
                        footerEmptyDataComponent={<FooterEmptyDataComponent />}
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
        color: "#6f6f6f",
        paddingBottom: 5,
        lineHeight: 20
    },
    subTitle: {
        color: "#808080",
        fontSize: 12,
        lineHeight: 16
    }
});
