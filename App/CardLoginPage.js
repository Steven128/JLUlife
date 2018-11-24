import React, { Component } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Alert,
    ToastAndroid,
    Image,
    TouchableOpacity
} from "react-native";
import { Header, Input, Button, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";
import Global from "../src/Global";
import LoginInterface from "../src/LoginInterface";
const { width, height } = Dimensions.get("window");

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.loginTapped = this.loginTapped.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.refreshCode = this.refreshCode.bind(this);
        this.state = {
            rand: "",
            showLoading: false,
            cookie: "",
            username: "",
            password: "",
            code: ""
        };
    }

    handleNameChange(name) {
        this.setState({
            username: name
        });
    }
    handlePwdChange(pwd) {
        this.setState({
            password: pwd
        });
    }

    handleCodeChange(code) {
        this.setState({
            code: code
        });
    }
    componentDidMount() {
        this.setState({
            rand: new Date().getTime()
        });
        this.getCookie(cookie => {
            this.setState({
                cookie: cookie
            });
            console.log(this.state.cookie);
        });
    }

    loginTapped() {
        if (this.state.showLoading) {
            return null;
        }
        this.setState({
            showLoading: !this.state.showLoading
        });
        this.state.cookie == ""
            ? null
            : this.loginMain(this.state.cookie, res => {
                  console.log(res);
              });
    }
    getCookie(callback) {
        var loginURL = "http://dsf.jlu.edu.cn/";
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
                console.error(error);
                callback({ message: "error" });
            });
    }
    loginMain(cookie, callback) {
        console.log(this.state.code);
        var loginURL = "http://dsf.jlu.edu.cn/Account/MiniCheckIn";
        fetch(loginURL, {
            method: "POST",
            headers: {
                Accept: "*/*",
                "Accept-Language": " zh-CN,zh;q=0.9",
                Cookie: cookie,
                Connection: " keep-alive",
                Host: " dsf.jlu.edu.cn",
                Origin: " http://dsf.jlu.edu.cn",
                Referer: " http://dsf.jlu.edu.cn/",
                "Content-Type": " application/x-www-form-urlencoded",
                "X-Requested-With": " XMLHttpRequest"
            },
            body:
                "signtype=SynSno&username=20160100645&password=061071&checkcode=" +
                this.state.code +
                "&isUsedKeyPad=false"
        })
            .then(response => response)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
                callback({ message: "error" });
            });
    }

    refreshCode() {
        this.setState({
            rand: new Date().getTime()
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        var image = null;
        var headers = {
            Cookie: this.state.cookie
        };
        if (this.state.cookie != "") {
            image = (
                <Image
                    style={styles.image}
                    source={{
                        uri:
                            "http://dsf.jlu.edu.cn/Account/GetCheckCodeImg/Flag=" +
                            this.state.rand,
                        method: "POST",
                        headers: {
                            Cookie: this.state.cookie
                        },
                        body: ""
                    }}
                />
            );
        }
        return (
            <View>
                <Header
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
                <View style={{ alignSelf: "center" }}>
                    <View style={{ paddingTop: 50 }}>
                        <Input
                            containerStyle={styles.input}
                            placeholder="一卡通帐号"
                            leftIcon={
                                <Icon name="user" size={22} color="#888" />
                            }
                            value={this.state.username}
                            onChangeText={this.handleNameChange}
                            returnKeyType="next"
                        />
                        <Input
                            containerStyle={styles.input}
                            placeholder="查询密码"
                            secureTextEntry={true}
                            leftIcon={
                                <Icon name="lock1" size={22} color="#888" />
                            }
                            value={this.state.password}
                            onChangeText={this.handlePwdChange}
                            returnKeyType="next"
                        />
                        <View style={{ flexDirection: "row" }}>
                            <Input
                                containerStyle={[styles.input, { flex: 3 }]}
                                placeholder="验证码"
                                leftIcon={
                                    <Icon name="key" size={22} color="#888" />
                                }
                                value={this.state.code}
                                onChangeText={this.handleCodeChange}
                                returnKeyType="done"
                            />
                            <TouchableOpacity onPress={this.refreshCode}>
                                <View style={styles.imgWrap}>{image}</View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Button
                        title="登录"
                        loading={this.state.showLoading}
                        loadingProps={{
                            size: "large",
                            color: "rgba(111, 202, 186, 1)"
                        }}
                        titleStyle={{ fontWeight: "700" }}
                        buttonStyle={{
                            backgroundColor: "#2089dc",
                            marginLeft: width * 0.07,
                            marginRight: width * 0.07,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                        }}
                        containerStyle={{ marginTop: 20 }}
                        onPress={this.loginTapped}
                    />
                </View>
                <Image
                    source={{
                        uri: "https://reactjs.org/logo-og.png",
                        method: "POST",
                        headers: {
                            Pragma: "no-cache"
                        },
                        body: ""
                    }}
                    style={{ width: 400, height: 400 }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    input: {
        height: 80,
        width: width * 0.86
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
        borderColor: "#000",
        borderWidth: 2
    }
});
