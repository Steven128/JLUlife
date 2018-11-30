import React, { Component } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Alert,
    ToastAndroid,
    ScrollView
} from "react-native";
import { Header, Input, Button, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";
import Global from "../src/Global";
import LoginInterface from "../src/FetchInterface/LoginInterface";
const { width, height } = Dimensions.get("window");

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.loginTapped = this.loginTapped.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
        this.validate = this.validate.bind(this);
        this.state = {
            showLoading: false,
            cookie: "",
            j_username: Global.loginInfo.j_username,
            j_password: Global.loginInfo.j_password,
            showErrMsg: false,
            errMsgList: []
        };
    }

    handleNameChange(name) {
        const newName = name.replace(/[^\d]+/, "");
        this.setState({
            j_username: newName
        });
    }
    handlePwdChange(pwd) {
        this.setState({
            j_password: pwd
        });
    }
    render() {
        const { navigate } = this.props.navigation;
        var contentPaddingTop = this.state.showErrMsg ? 20 : 50;
        return (
            <View style={{ flex: 1, backgroundColor: "#efefef" }}>
                <Header
                    containerStyle={{ borderBottomColor: "#2089dc" }}
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
                        text: "教务系统登录",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                />
                <ScrollView style={{ height: height - 80 }}>
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
                                style={{ color: "#fff", textAlign: "center" }}
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
                                placeholder="教学号"
                                leftIcon={
                                    <Icon name="user" size={22} color="#888" />
                                }
                                value={this.state.j_username}
                                onChangeText={this.handleNameChange}
                                returnKeyType="next"
                                autoFocus={true}
                                maxLength={8}
                                keyboardType="numeric"
                                selectTextOnFocus={true}
                            />
                            <Input
                                containerStyle={styles.input}
                                inputStyle={styles.inputStyle}
                                placeholder="密码"
                                secureTextEntry={true}
                                leftIcon={
                                    <Icon name="lock1" size={22} color="#888" />
                                }
                                value={this.state.j_password}
                                onChangeText={this.handlePwdChange}
                                returnKeyType="done"
                                selectTextOnFocus={true}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 40, paddingTop: 60 }}>
                            <Button
                                title="登录"
                                loading={this.state.showLoading}
                                loadingProps={{
                                    size: "large",
                                    color: "#fff"
                                }}
                                titleStyle={{ fontWeight: "700" }}
                                buttonStyle={{ height: 45 }}
                                onPress={this.loginTapped}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    validate() {
        var flag = true;
        var errorText = [];
        if (this.state.j_username == "") {
            flag = false;
            errorText.push("教学号不能为空");
        } else if (this.state.j_username.length < 8) {
            flag = false;
            errorText.push("教学号不合法，请检查");
        }
        if (this.state.j_password == "") {
            flag = false;
            errorText.push("密码不能为空");
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

    loginTapped() {
        if (this.state.showLoading || !this.validate()) {
            return false;
        }
        this.setState({
            showLoading: !this.state.showLoading
        });
        LoginInterface(this.state.j_username, this.state.j_password, res => {
            if (res.message == "success") {
                ToastAndroid.show("登录成功", ToastAndroid.LONG);
                this.props.navigation.navigate("Home", {
                    message: "success",
                    currentStuName: Global.currentStuName,
                    termName: Global.termName
                });
            } else if (res.message == "error") {
                this.setState({
                    showLoading: !this.state.showLoading
                });
                if (res.reason == "wrong_password") {
                    Alert.alert(
                        "出错啦",
                        "用户名或密码错了惹，仔细检查一下吧~",
                        [{ text: "确定" }]
                    );
                } else if (res.reason == "overtime") {
                    Alert.alert("出错啦", "貌似超时啦，再试一次吧~", [
                        { text: "确定" }
                    ]);
                } else {
                    Alert.alert(
                        "出错啦",
                        "网络开小差啦，看看是不是连上校园网了呢~",
                        [{ text: "确定" }]
                    );
                }
            } else {
                this.setState({
                    showLoading: !this.state.showLoading
                });
                Alert.alert("出错啦", "网络开小差啦，过一会儿再试吧~", [
                    { text: "确定" }
                ]);
            }
        });
    }
}
const styles = StyleSheet.create({
    input: {
        paddingVertical: 15,
        width: width * 0.86
    },
    inputStyle: {
        height: 50,
        overflow: "hidden"
    }
});
