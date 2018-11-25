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
import LoginInterface from "../src/LoginInterface";
const { width, height } = Dimensions.get("window");

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.loginTapped = this.loginTapped.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
        this.validate = this.validate.bind(this);
        this.state = {
            buttonTapped: false,
            showLoading: false,
            cookie: "",
            j_username: Global.loginInfo.j_username,
            j_password: Global.loginInfo.j_password,
            nameColor: "#888",
            pwdColor: "#888"
        };
    }

    handleNameChange(name) {
        const newName = name.replace(/[^\d]+/, "");
        this.setState({
            j_username: newName
        });
        if (this.state.buttonTapped) {
            this.validate();
        }
    }
    handlePwdChange(pwd) {
        this.setState({
            j_password: pwd
        });
        if (this.state.buttonTapped) {
            this.validate();
        }
    }
    render() {
        const { navigate } = this.props.navigation;
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
                        text: "教务系统登录",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                />
                <ScrollView style={{ height: height - 80 }}>
                    <View style={{ alignSelf: "center" }}>
                        <View style={{ paddingTop: 50 }}>
                            <Input
                                containerStyle={styles.input}
                                inputContainerStyle={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: this.state.nameColor
                                }}
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
                                inputContainerStyle={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: this.state.pwdColor
                                }}
                                placeholder="密码"
                                secureTextEntry={true}
                                leftIcon={
                                    <Icon name="lock1" size={22} color="#888" />
                                }
                                value={this.state.j_password}
                                onChangeText={this.handlePwdChange}
                                returnKeyType="done"
                                keyboardType="numeric"
                                selectTextOnFocus={true}
                            />
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
                </ScrollView>
            </View>
        );
    }

    validate() {
        var nameValidate = false;
        var pwdValidate = false;
        if (this.state.j_username.length < 8)
            this.setState({ nameColor: "red" });
        else {
            nameValidate = true;
            this.setState({ nameColor: "#888" });
        }
        if (this.state.j_password == "") this.setState({ pwdColor: "red" });
        else {
            pwdValidate = true;
            this.setState({ pwdeColor: "#888" });
        }

        if (nameValidate && pwdValidate) return true;
        else return false;
    }

    loginTapped() {
        this.setState({ buttonTapped: true });
        if (this.state.showLoading || !this.validate()) {
            return;
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
        height: 90,
        width: width * 0.86
    }
});
