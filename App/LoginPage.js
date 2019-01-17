/**
 * 教务系统登录页
 */
import React, { Component } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Alert,
    ToastAndroid,
    ScrollView,
    StatusBar,
    Platform,
    SafeAreaView,
    Switch,
    KeyboardAvoidingView,
    Keyboard,
    BackHandler
} from "react-native";
import { Header, Input, Button, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";
import Global from "../src/Global";
import LoginInterface from "../src/FetchInterface/LoginInterface";
import Toast from "react-native-easy-toast";
import AppStorage from "../src/AppStorage";
import Dialog, {
    DialogTitle,
    DialogButton,
    DialogContent
} from "react-native-popup-dialog";

const { width, height } = Dimensions.get("window");

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.loginTapped = this.loginTapped.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
        this.handleOutOfSchoolChange = this.handleOutOfSchoolChange.bind(this);
        this.validate = this.validate.bind(this);
        this.state = {
            alertVisible: false,
            alertText: "",
            showLoading: false,
            cookie: "",
            j_username: Global.loginInfo.j_username,
            j_password: Global.loginInfo.j_password,
            showErrMsg: false,
            errMsgList: [],
            outOfSchool: Global.settings.outOfSchool,
            scrollViewHeight: height
        };
    }

    componentWillMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackAndroid);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.onBackAndroid
        );
    }

    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };

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

    handleOutOfSchoolChange(value) {
        Global.settings.outOfSchool = value;
        this.setState({
            outOfSchool: value
        });
        AppStorage._save("settings", Global.settings);
    }

    _onLayout(event) {
        let { x, y, width, height } = event.nativeEvent.layout;
        this.setState({ scrollViewHeight: height });
    }

    render() {
        const { navigate } = this.props.navigation;
        var headerStyle = {
            borderBottomColor: Global.settings.theme.backgroundColor
        };
        if (Platform.OS == "ios") {
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
                            text: "教务系统登录",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                    />
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
                    <KeyboardAvoidingView behavior="position">
                        <ScrollView
                            style={{
                                height: this.state.scrollViewHeight
                            }}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View
                                style={{ alignSelf: "center" }}
                                onLayout={this._onLayout.bind(this)}
                            >
                                <View style={{ paddingTop: contentPaddingTop }}>
                                    <Input
                                        containerStyle={styles.input}
                                        inputStyle={styles.inputStyle}
                                        placeholder="教学号"
                                        leftIcon={
                                            <Icon
                                                name="user"
                                                size={22}
                                                color="#888"
                                            />
                                        }
                                        value={this.state.j_username}
                                        onChangeText={this.handleNameChange}
                                        returnKeyType="next"
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
                                            <Icon
                                                name="lock1"
                                                size={22}
                                                color="#888"
                                            />
                                        }
                                        value={this.state.j_password}
                                        onChangeText={this.handlePwdChange}
                                        returnKeyType="done"
                                        selectTextOnFocus={true}
                                    />
                                </View>
                                {/* <View
                                    style={[
                                        styles.input,
                                        {
                                            paddingHorizontal: 15,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            textAlignVertical: "center"
                                        }
                                    ]}
                                >
                                    <Text style={{ paddingLeft: 15, flex: 4 }}>
                                        我在校外
                                    </Text>
                                    <Switch
                                        style={{ flex: 1 }}
                                        trackColor={
                                            Global.settings.theme
                                                .backgroundColor
                                        }
                                        thumbColor={
                                            Global.settings.theme
                                                .backgroundColor
                                        }
                                        value={this.state.outOfSchool}
                                        onValueChange={
                                            this.handleOutOfSchoolChange
                                        }
                                    />
                                </View> */}
                                <View
                                    style={{
                                        paddingHorizontal: 40,
                                        paddingTop: 20,
                                        paddingBottom: 10
                                    }}
                                >
                                    <Button
                                        title="登录"
                                        loading={this.state.showLoading}
                                        loadingProps={{
                                            size: "large",
                                            color: "#fff"
                                        }}
                                        titleStyle={{ fontWeight: "700" }}
                                        buttonStyle={{
                                            height: 40,
                                            backgroundColor:
                                                Global.settings.theme
                                                    .backgroundColor
                                        }}
                                        onPress={this.loginTapped}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
                <Dialog
                    visible={this.state.alertVisible}
                    dialogTitle={
                        <DialogTitle
                            title="出错啦"
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
                    <DialogContent style={{ flex: 1 }}>
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
            </SafeAreaView>
        );
    }
    /**
     * 表单验证
     */
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
    /**
     * 按登录键后处理
     */
    loginTapped() {
        Keyboard.dismiss();
        if (this.state.showLoading || !this.validate()) {
            return false;
        }
        this.setState({
            showLoading: !this.state.showLoading
        });
        var params = this.props.navigation.state.params;
        if (params.from == "Table") params.from = "Home";
        LoginInterface(this.state.j_username, this.state.j_password, res => {
            if (res.message == "success") {
                Platform.OS === "ios"
                    ? this.refs.toast.show("登录成功", 5000)
                    : ToastAndroid.show("登录成功", ToastAndroid.LONG);
                this.props.navigation.navigate(params.from, {
                    from: "Login",
                    message: "success"
                });
            } else if (res.message == "error") {
                this.setState({
                    showLoading: !this.state.showLoading
                });
                if (res.reason == "wrong_password") {
                    this.setState({
                        alertText: "用户名或密码错了惹，仔细检查一下吧~",
                        alertVisible: true
                    });
                } else if (res.reason == "overtime") {
                    this.setState({
                        alertText: "貌似超时啦，再试一次吧~",
                        alertVisible: true
                    });
                } else {
                    this.setState({
                        alertText: "网络开小差啦，看看是不是连上校园网了呢~",
                        alertVisible: true
                    });
                }
            } else {
                this.setState({
                    showLoading: !this.state.showLoading,
                    alertText: "网络开小差啦，过一会儿再试吧~",
                    alertVisible: true
                });
            }
        });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        paddingVertical: 10,
        width: width * 0.86
    },
    inputStyle: {
        height: 30,
        overflow: "hidden",
        paddingVertical: 0
    }
});
