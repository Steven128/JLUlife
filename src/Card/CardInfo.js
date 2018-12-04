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
export default class CardInfo extends Component {
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
                callback(info);
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
                    backgroundColor: "#efefef"
                }}
            >
                {this.state.getInfo ? (
                    <FlatList
                        data={this.state.info}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.subTitle}>
                                    {item.value}
                                </Text>
                            </View>
                        )}
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
        color: "#888"
    }
});
