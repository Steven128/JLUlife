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
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");
export default class CardTransfer extends Component {
    constructor(props) {
        super(props);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.buttonTapped = this.buttonTapped.bind(this);
        this.state = { amount: "0.00", showLoading: false };
    }

    componentDidMount() {}
    handleAmountChange(amount) {
        this.setState({
            amount: amount
        });
    }

    buttonTapped() {
        Alert.alert(
            "提示",
            "确定要转入校园卡 " + this.state.amount + " 元吗？",
            [
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
                        this.transfer(
                            Global.card.cookie,
                            this.state.amount,
                            Global.card.password,
                            res => {
                                if (res.success == true) {
                                    Alert.alert(
                                        "转账成功",
                                        "操作成功，成功转入 " +
                                            this.state.amount +
                                            " 元，欢迎下次使用",
                                        [{ text: "确定" }],
                                        { cancelable: false }
                                    );
                                } else {
                                    Alert.alert(
                                        "转账失败",
                                        "失败啦，" + res.msg,
                                        [{ text: "确定" }],
                                        { cancelable: false }
                                    );
                                }
                                this.setState({ showLoading: false });
                            }
                        );
                    }
                }
            ]
        );
    }

    transfer(cookie, amount, password, callback) {
        var pattern = /^[0-9]+([.]\d{1,2})?$/;
        if (!pattern.test(amount)) {
            alert("请输入正确的金额");
            this.setState({ showLoading: false });
            return false;
        }
        password = Base64.encode(password);
        let url = "http://ykt.jlu.edu.cn:8070/SynCard/Manage/TransferPost";
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
                Referer: "http://ykt.jlu.edu.cn:8070/SynCard/Manage/Transfer"
            },
            body:
                "FromCard=bcard&ToCard=card&Amount=" +
                amount +
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
                        inputContainerStyle={{
                            borderBottomWidth: 1,
                            borderBottomColor: this.state.amountColor
                        }}
                        placeholder="请输入金额"
                        leftIcon={<Icon name="rmb" size={22} color="#888" />}
                        value={this.state.amount}
                        onChangeText={this.handleAmountChange}
                        maxLength={6}
                        returnKeyType="next"
                        keyboardType="numeric"
                        selectTextOnFocus={true}
                    />
                </View>
                <View style={{ paddingHorizontal: 30 }}>
                    <Text style={{ color: "#888", paddingBottom: 10 }}>
                        •
                        向校园卡转账成功后所转金额将显示在过渡余额中，在餐厅等处的卡机上进行刷卡操作后，过渡余额即会转入校园卡
                    </Text>
                    <Text style={{ color: "#888" }}>
                        • 单笔转账最大限额 200 元
                    </Text>
                </View>
                <View style={{ padding: 40, paddingTop: 20 }}>
                    <Button
                        title="转账"
                        loading={this.state.showLoading}
                        loadingProps={{
                            size: "large",
                            color: "#fff"
                        }}
                        titleStyle={{ fontWeight: "700" }}
                        buttonStyle={{
                            height: 45,
                            backgroundColor: Global.settings.theme.backgroundColor
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
        height: 80,
        width: width * 0.86
    }
});
