import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ActivityIndicator,
    ScrollView,
    Alert,
    Keyboard
} from "react-native";
import { Input, Button } from "react-native-elements";
import cheerio from "cheerio";
import Global from "../Global";
import Base64 from "base-64";
import Icon from "react-native-vector-icons/FontAwesome";
import Dialog, {
    DialogTitle,
    DialogButton,
    DialogContent
} from "react-native-popup-dialog";

const { width, height } = Dimensions.get("window");
export default class CardTransfer extends Component {
    constructor(props) {
        super(props);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.buttonTapped = this.buttonTapped.bind(this);
        this.state = {
            alertVisible: false,
            alertTitle: "",
            alertText: "",
            confirmVisible: false,
            confirmTitle: "",
            confirmText: "",
            amount: "0.00",
            showLoading: false
        };
    }

    handleAmountChange(amount) {
        amount = parseFloat(amount);
        this.setState({
            amount: amount
        });
    }

    buttonTapped() {
        Keyboard.dismiss();
        var pattern = /^[0-9]+([.]\d{1,2})?$/;
        if (!pattern.test(this.state.amount)) {
            this.setState({
                alertTitle: "提示",
                alertText: "请输入正确的金额",
                alertVisible: true
            });
            return false;
        }
        if (parseFloat(this.state.amount) < 0.01) {
            this.setState({
                alertTitle: "提示",
                alertText: "金额不能为0",
                alertVisible: true
            });
            return false;
        }
        this.setState({
            confirmTitle: "提示",
            confirmText: "确定要转入校园卡 " + this.state.amount + " 元吗？",
            confirmVisible: true
        });
    }

    transferMain() {
        this.transfer(
            Global.card.cookie,
            this.state.amount,
            Global.card.password,
            res => {
                if (res.success == true) {
                    this.setState({
                        alertTitle: "转账成功",
                        alertText:
                            "操作成功，成功转入 " +
                            this.state.amount +
                            " 元，欢迎下次使用",
                        alertVisible: true
                    });
                } else {
                    this.setState({
                        alertTitle: "转账失败",
                        alertText: "失败啦，" + res.msg,
                        alertVisible: true
                    });
                }
                this.setState({ showLoading: false });
            }
        );
    }

    transfer(cookie, amount, password, callback) {
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
            <ScrollView
                style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: "#ccc",
                    backgroundColor: "#fff"
                }}
                keyboardShouldPersistTaps="handled"
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
                        placeholder="请输入金额"
                        leftIcon={<Icon name="rmb" size={22} color="#808080" />}
                        value={this.state.amount}
                        onChangeText={this.handleAmountChange}
                        maxLength={6}
                        returnKeyType="next"
                        keyboardType="numeric"
                        selectTextOnFocus={true}
                    />
                </View>
                <View style={{ paddingHorizontal: 30, paddingTop: 15 }}>
                    <Text style={{ color: "#808080", paddingBottom: 10 }}>
                        •
                        向校园卡转账成功后所转金额将显示在过渡余额中，在餐厅等处的卡机上进行刷卡操作后，过渡余额即会转入校园卡
                    </Text>
                    <Text style={{ color: "#808080" }}>
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
                            backgroundColor:
                                Global.settings.theme.backgroundColor
                        }}
                        onPress={this.buttonTapped}
                    />
                </View>
                <Dialog
                    visible={this.state.confirmVisible}
                    dialogTitle={
                        <DialogTitle
                            title={this.state.confirmTitle}
                            style={{
                                backgroundColor: "#ffffff"
                            }}
                            titleStyle={{
                                color: "#6a6a6a",
                                fontWeight: 500
                            }}
                        />
                    }
                    actions={[
                        <DialogButton
                            text="我再想想"
                            textStyle={{
                                color: "#6a6a6a",
                                fontSize: 14,
                                fontWeight: "normal"
                            }}
                            onPress={() => {
                                this.setState({ confirmVisible: false });
                            }}
                        />,
                        <DialogButton
                            text="确定"
                            textStyle={{
                                color: Global.settings.theme.backgroundColor,
                                fontSize: 14,
                                fontWeight: "normal"
                            }}
                            onPress={() => {
                                this.setState({
                                    showLoading: true,
                                    confirmVisible: false
                                });
                                this.transferMain();
                            }}
                        />
                    ]}
                    width={0.75}
                    height={0.45 * (width / height)}
                    containerStyle={styles.dialog}
                >
                    <DialogContent style={{ flex: 1, paddingBottom: 0 }}>
                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    paddingVertical: 10,
                                    alignItems: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        paddingVertical: 5
                                    }}
                                >
                                    {this.state.confirmText}
                                </Text>
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>
                <Dialog
                    visible={this.state.alertVisible}
                    dialogTitle={
                        <DialogTitle
                            title={this.state.alertTitle}
                            style={{
                                backgroundColor: "#ffffff"
                            }}
                            titleStyle={{
                                color: "#6a6a6a",
                                fontWeight: 500
                            }}
                        />
                    }
                    actions={[
                        <DialogButton
                            text="知道啦"
                            textStyle={{
                                color: Global.settings.theme.backgroundColor,
                                fontSize: 14,
                                fontWeight: "normal"
                            }}
                            onPress={() => {
                                this.setState({ alertVisible: false });
                            }}
                        />
                    ]}
                    width={0.75}
                    height={0.45 * (width / height)}
                    containerStyle={styles.dialog}
                >
                    <DialogContent style={{ flex: 1, paddingBottom: 0 }}>
                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    paddingVertical: 10,
                                    alignItems: "center",
                                    flex: 1
                                }}
                            >
                                <Text style={{ flex: 1, color: "#6a6a6a" }}>
                                    {this.state.alertText}
                                </Text>
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>
            </ScrollView>
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
