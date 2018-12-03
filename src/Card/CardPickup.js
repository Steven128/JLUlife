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
import Global from "../Global";
const { width, height } = Dimensions.get("window");
export default class CardPickup extends Component {
    constructor(props) {
        super(props);
        this.state = { getInfo: false, info: [] };
    }

    componentDidMount() {
        this.getInfo(Global.card.cookie, res => {
            this.setState({
                info: res,
                getInfo: true
            });
        });
    }

    getInfo(cookie, callback) {
        let url = "http://ykt.jlu.edu.cn:8070/InfoPub/CardNotice/NFixCardList";
        fetch(url, {
            method: "GET",
            headers: {
                Accept:
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                "Accept-Language": " zh-CN,zh;q=0.9",
                Cookie: cookie,
                Connection: " keep-alive",
                Host: "ykt.jlu.edu.cn:8070",
                Referer: "http://ykt.jlu.edu.cn:8070/Home/Index"
            }
        })
            .then(response => response.text())
            .then(response => {
                var info = this.parseHTML(response);
                callback(info);
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
                value = value.replace("<span>", "");
                value = value.replace('<span class="blue">', "");
                value = value.replace(/\r\n/g, "");
                value = value.replace(/  /g, "");
                value = value.replace("</span>", "");
                singleContainer.push(value);
            }
            var singleItem = {};
            singleItem.cardNumber = singleContainer[0];
            singleItem.pickuper = singleContainer[1];
            singleItem.phoneNumber = singleContainer[2];
            singleItem.time = singleContainer[3];
            singleItem.place = singleContainer[4];
            listContainer.push(singleItem);
        }
        return listContainer;
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: "#ccc",
                    backgroundColor: "#efefef"
                }}
            >
                {this.state.getInfo ? (
                    <FlatList
                        data={this.state.info}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={styles.title}>
                                    卡号： {item.cardNumber}
                                </Text>
                                <Text style={styles.subTitle}>
                                    捡获人: {item.pickuper}
                                </Text>
                                <Text style={styles.subTitle}>
                                    联系方式： {item.phoneNumber}
                                </Text>
                                <Text style={styles.subTitle}>
                                    检获时间： {item.time}
                                </Text>
                                <Text style={styles.subTitle}>
                                    地址： {item.place}
                                </Text>
                            </View>
                        )}
                    />
                ) : (
                    <View style={{ paddingVertical: height / 2 - 150 }}>
                        <ActivityIndicator
                            style={{}}
                            size="large"
                            color="#2089dc"
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
        paddingBottom: 5
    },
    subTitle: {
        color: "#888",
        fontSize: 12
    }
});
