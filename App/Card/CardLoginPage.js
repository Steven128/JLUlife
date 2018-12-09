/**
 * 一卡通 -> 登录页
 */
import React, { Component } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Alert,
    ToastAndroid,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
    KeyboardAvoidingView,
    StatusBar,
    Platform
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Header, Input, Button, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";
import Global from "../../src/Global";
import AppStorage from "../../src/AppStorage";
import Base64 from "base-64";
import isIphoneX from "../../src/isIphoneX";
import Toast, { DURATION } from "react-native-easy-toast";

const { width, height } = Dimensions.get("window");

export default class CardLoginPage extends Component {
    constructor(props) {
        super(props);
        this.loginTapped = this.loginTapped.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.refreshCode = this.refreshCode.bind(this);
        this.validate = this.validate.bind(this);
        this.state = {
            showLoading: false,
            cookie: "",
            username: "",
            password: "",
            code: "",
            uri: "",
            showErrMsg: false,
            errMsgList: []
        };
    }

    handleNameChange(name) {
        var newName = name.replace(/[^\d]+/, "");
        this.setState({
            username: newName
        });
    }
    handlePwdChange(pwd) {
        var newPwd = pwd.replace(/[^\d]+/, "");
        this.setState({
            password: newPwd
        });
    }

    handleCodeChange(code) {
        this.setState({
            code: code
        });
    }
    componentDidMount() {
        /**
         * 从缓存加载一卡通登录名和密码，存在的话自动填入表单
         */
        AppStorage._load("cardLoginInfo", res => {
            if (res.message == "success") {
                Global.card.username = res.content.username;
                Global.card.password = res.content.password;
                this.setState({
                    username: res.content.username,
                    password: res.content.password
                });
            }
        });
        this.getCookie(cookie => {
            this.setState({
                cookie: cookie,
                uri:
                    "http://ykt.jlu.edu.cn:8070/Account/GetCheckCodeImg/Flag=" +
                    new Date().getTime()
            });
        });
    }
    /**
     * 按登录按钮后执行此函数
     */
    loginTapped() {
        //正在登录或表单验证失败，返回false
        if (this.state.showLoading || !this.validate()) {
            return false;
        }
        this.setState({
            showLoading: !this.state.showLoading
        });
        this.state.cookie == ""
            ? null
            : this.loginMain(this.state.cookie, res => {
                  if (res.response.success == true) {
                      Global.card.isOnline = true;
                      Global.card.cookie =
                          res.cookie + "; " + this.state.cookie;
                      Global.card.username = this.state.username;
                      Global.card.password = this.state.password;
                      AppStorage._save("cardLoginInfo", {
                          username: this.state.username,
                          password: this.state.password
                      });
                      Platform.OS === "ios"
                          ? this.refs.toast.show("登录成功", 2000)
                          : ToastAndroid.show("登录成功", ToastAndroid.LONG);
                      this.props.navigation.navigate("Main", {
                          message: "success"
                      });
                  } else {
                      this.refreshCode();
                      this.setState({
                          showLoading: !this.state.showLoading
                      });
                      Alert.alert("出错啦", res.response.msg, [
                          { text: "确定" }
                      ]);
                  }
              });
    }

    /**
     * 获取cookie
     * @param {Function} callback 回调函数
     */
    getCookie(callback) {
        var loginURL = "http://ykt.jlu.edu.cn:8070/";
        fetch(loginURL, {
            method: "GET"
        })
            .then(response => response)
            .then(response => {
                var cookie = response.headers.get("set-cookie");
                cookie = cookie.match(/ASP.NET(.*?);/)[0];
                cookie = cookie.replace(";", "");
                callback(cookie);
            })
            .catch(error => {
                if (__DEV__) console.error(error);
                callback({ message: "error" });
            });
    }

    /**
     * 登录执行体
     * @param {String} cookie cookie
     * @param {Function} callback 回调函数
     */
    loginMain(cookie, callback) {
        var name = this.state.username;
        var password = Base64.encode(this.state.password);
        var loginURL = "http://ykt.jlu.edu.cn:8070/Account/Login";
        fetch(loginURL, {
            method: "POST",
            headers: {
                Accept: "*/*",
                "Accept-Language": " zh-CN,zh;q=0.9",
                Cookie: cookie,
                Connection: " keep-alive",
                Host: "ykt.jlu.edu.cn:8070",
                Origin: "http://ykt.jlu.edu.cn:8070",
                Referer: "http://ykt.jlu.edu.cn:8070/Account/Login",
                "Content-Type": " application/x-www-form-urlencoded"
            },
            body:
                "SignType=SynSno&UserAccount=" +
                name +
                "&Password=" +
                password +
                "&NextUrl=&CheckCode=" +
                this.state.code +
                "&openid=&Schoolcode=JLU"
        })
            .then(response => response)
            .then(response => {
                var cookie = "";
                var responseJson = JSON.parse(response._bodyInit);
                if (responseJson.success == true) {
                    cookie = response.headers.get("set-cookie");
                    cookie = cookie.match(/iPlanetDirectoryPro(.*?);/)[0];
                    cookie = cookie.replace(";", "");
                }
                callback({ cookie: cookie, response: responseJson });
            })
            .catch(error => {
                if (__DEV__) console.error(error);
                callback({ message: "error" });
            });
    }

    /**
     * 刷新图片验证码
     */
    refreshCode() {
        this.setState({
            uri:
                "http://ykt.jlu.edu.cn:8070/Account/GetCheckCodeImg/Flag=" +
                new Date().getTime()
        });
    }

    /**
     * 表单验证
     */
    validate() {
        var flag = true;
        var errorText = [];
        if (this.state.username == "") {
            flag = false;
            errorText.push("校园卡账号不能为空");
        } else if (this.state.username.length < 11) {
            flag = false;
            errorText.push("校园卡账号不合法，请检查");
        }
        if (this.state.password == "") {
            flag = false;
            errorText.push("查询密码不能为空");
        } else if (this.state.password.length < 6) {
            flag = false;
            errorText.push("查询密码不合法，请检查");
        }
        if (this.state.code == "") {
            flag = false;
            errorText.push("验证码不能为空");
        }
        if (flag) {
            this.setState({
                errMsgList: [],
                showErrMsg: false
            });
            return true;
        } else {
            this.setState({
                errMsgList: errorText,
                showErrMsg: true
            });
            return false;
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        var headerStyle = {
            borderBottomColor: Global.settings.theme.backgroundColor
        };
        if (isIphoneX()) {
            headerStyle.paddingTop = 0;
            headerStyle.height = 44;
        }
        var contentPaddingTop = this.state.showErrMsg ? 20 : 50;
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: Global.settings.theme.backgroundColor
                }}
            >
                <StatusBar
                    backgroundColor={Global.settings.theme.backgroundColor}
                    barStyle="light-content"
                    translucent={false}
                />
                <Toast ref="toast" />
                <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                    <Header
                        containerStyle={headerStyle}
                        backgroundColor={Global.settings.theme.backgroundColor}
                        placement="left"
                        leftComponent={
                            <Icon
                                name="left"
                                size={20}
                                color="#ffffff"
                                onPress={() => this.props.navigation.goBack()}
                            />
                        }
                        centerComponent={{
                            text: "一卡通账号登录",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                    />
                    <ScrollView style={{ flex: 1 }}>
                        {this.state.showErrMsg ? (
                            <View
                                style={{
                                    height: 30,
                                    backgroundColor: "#d10000",
                                    padding: 5,
                                    justifyContent: "center",
                                    textAlignVertical: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#fff",
                                        textAlign: "center"
                                    }}
                                >
                                    {this.state.errMsgList[0]}
                                </Text>
                            </View>
                        ) : null}
                        <View style={{ alignSelf: "center" }}>
                            <View style={{ paddingTop: contentPaddingTop }}>
                                <Input
                                    containerStyle={styles.input}
                                    inputStyle={styles.inputStyle}
                                    placeholder="校园卡账号（11位学工号）"
                                    leftIcon={
                                        <Icon
                                            name="user"
                                            size={22}
                                            color="#888"
                                        />
                                    }
                                    value={this.state.username}
                                    onChangeText={this.handleNameChange}
                                    returnKeyType="next"
                                    maxLength={11}
                                    keyboardType="numeric"
                                    selectTextOnFocus={true}
                                />
                                <Input
                                    containerStyle={styles.input}
                                    inputStyle={styles.inputStyle}
                                    placeholder="查询密码"
                                    secureTextEntry={true}
                                    leftIcon={
                                        <Icon
                                            name="lock1"
                                            size={22}
                                            color="#888"
                                        />
                                    }
                                    value={this.state.password}
                                    onChangeText={this.handlePwdChange}
                                    maxLength={6}
                                    returnKeyType="next"
                                    keyboardType="numeric"
                                    selectTextOnFocus={true}
                                />
                                <View style={{ flexDirection: "row" }}>
                                    <Input
                                        containerStyle={[
                                            styles.input,
                                            { flex: 3 }
                                        ]}
                                        inputStyle={styles.inputStyle}
                                        placeholder="验证码"
                                        leftIcon={
                                            <Icon
                                                name="key"
                                                size={22}
                                                color="#888"
                                            />
                                        }
                                        value={this.state.code}
                                        onChangeText={this.handleCodeChange}
                                        maxLength={4}
                                        keyboardType="numeric"
                                        returnKeyType="done"
                                        selectTextOnFocus={true}
                                    />
                                    <TouchableWithoutFeedback
                                        onPress={this.refreshCode}
                                    >
                                        <Image
                                            style={styles.image}
                                            source={{
                                                uri: this.state.uri,
                                                headers: {
                                                    Cookie: this.state.cookie
                                                }
                                            }}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={{ padding: 40, paddingTop: 20 }}>
                                <Button
                                    title="登录"
                                    loading={this.state.showLoading}
                                    loadingProps={{
                                        size: "large",
                                        color: "#fff"
                                    }}
                                    titleStyle={{ fontWeight: "700" }}
                                    buttonStyle={{
                                        height: 45,
                                        backgroundColor:
                                            Global.settings.theme
                                                .backgroundColor
                                    }}
                                    onPress={this.loginTapped}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        paddingVertical: 5,
        width: width * 0.86
    },
    inputStyle: {
        height: 50,
        overflow: "hidden"
    },
    imgWrap: {
        flex: 2,
        textAlign: "center",
        alignItems: "center",
        paddingTop: 10
    },
    image: {
        width: 90,
        height: 30,
        marginTop: 25,
        marginLeft: 10
    }
});
