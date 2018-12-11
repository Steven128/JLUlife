import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    FlatList,
    ActivityIndicator,
    Alert
} from "react-native";
import { Input, Button } from "react-native-elements";
import cheerio from "cheerio";
import Global from "../Global";
import Base64 from "base-64";
import Icon from "react-native-vector-icons/AntDesign";

const { width, height } = Dimensions.get("window");
export default class CardLoss extends Component {
    constructor(props) {
        super(props);
        this.buttonTapped = this.buttonTapped.bind(this);
        this.state = { showLoading: false, password: "" };
    }

    componentDidMount() {}

    buttonTapped() {
        if (this.state.password != Global.card.password) {
            Alert.alert("提示", "查询密码不正确，再检查一下吧~");
            return false;
        }
        Alert.alert("提示", "确定要挂失吗？", [
            {
                text: "我再想想",
                style: "cancel",
                onPress: () => {
                    return false;
                }
            },
            {
                text: "确定",
                onPress: () => {
                    this.setState({ showLoading: true });
                    this.getCardNumber(Global.card.cookie, cardNumber => {
                        this.reportLoss(
                            Global.card.cookie,
                            cardNumber,
                            Global.card.password,
                            res => {
                                if (res.msg.indexOf("该校园卡已挂失") < 0) {
                                    Alert.alert(
                                        "挂失成功",
                                        "你的校园卡资金暂时安全了呢\n如果7天内还未找到卡，赶快去补办一张新的吧~",
                                        [{ text: "确定" }],
                                        { cancelable: false }
                                    );
                                } else {
                                    Alert.alert(
                                        "挂失失败",
                                        "失败啦，" + res.msg,
                                        [{ text: "确定" }],
                                        { cancelable: false }
                                    );
                                }
                                this.setState({ showLoading: false });
                            }
                        );
                    });
                }
            }
        ]);
    }

    reportLoss(cookie, cardNumber, password, callback) {
        password = Base64.encode(password);
        let url = "http://ykt.jlu.edu.cn:8070/SynCard/Manage/CardLost";
        fetch(url, {
            method: "POST",
            headers: {
                Accept: "*/*",
                Cookie: cookie,
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                Connection: " keep-alive",
                Host: "ykt.jlu.edu.cn:8070",
                Origin: "http://ykt.jlu.edu.cn:8070",
                Referer: "http://ykt.jlu.edu.cn:8070/SynCard/Manage/CardLost"
            },
            body:
                "CardNo=card_" +
                cardNumber +
                "_" +
                cardNumber +
                "&selectCardnos=card_" +
                cardNumber +
                "_" +
                cardNumber +
                "&Password=" +
                password
        })
            .then(response => response.json())
            .then(response => {
                callback(response);
            })
            .catch(error => {
                if (__DEV__) console.error(error);
                callback({ message: "error" });
            });
    }

    getCardNumber(cookie, callback) {
        let url = "http://ykt.jlu.edu.cn:8070/SynCard/Manage/CardLost";
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
                callback(cardNumber);
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

    handlePwdChange(value) {
        this.setState({
            password: value
        });
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: "#ccc",
                    backgroundColor: "#fff"
                }}
            >
                <View
                    style={{
                        paddingTop: 50,
                        alignSelf: "center",
                        backgroundColor: "#fff"
                    }}
                >
                    <Input
                        containerStyle={styles.input}
                        inputStyle={styles.inputStyle}
                        placeholder="请输入查询密码"
                        secureTextEntry={true}
                        leftIcon={<Icon name="lock1" size={22} color="#888" />}
                        value={this.state.password}
                        onChangeText={this.handlePwdChange.bind(this)}
                        maxLength={6}
                        returnKeyType="next"
                        keyboardType="numeric"
                        selectTextOnFocus={true}
                    />
                </View>
                <View style={{ padding: 40, paddingTop: 20 }}>
                    <Button
                        title="挂失"
                        loading={this.state.showLoading}
                        loadingProps={{
                            size: "large",
                            color: "#fff"
                        }}
                        titleStyle={{ fontWeight: "700" }}
                        buttonStyle={{
                            height: 45,
                            backgroundColor:
                                Global.settings.theme.backgroundColor
                        }}
                        onPress={this.buttonTapped}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        paddingVertical: 5,
        width: width * 0.86
    },
    inputStyle: {
        height: 50,
        overflow: "hidden"
    }
});
