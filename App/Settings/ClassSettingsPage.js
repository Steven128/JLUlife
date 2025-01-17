/**
 * 设置 -> 课程表设置页
 */
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    Slider,
    Switch,
    PermissionsAndroid,
    ToastAndroid,
    StatusBar,
    SafeAreaView,
    ScrollView,
    BackHandler
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import ImagePicker from "react-native-image-crop-picker";
import Global from "../../src/Global";
import AppStorage from "../../src/AppStorage";
import Toast from "react-native-easy-toast";
import TermPicker from "../../src/Class/TermPicker";

const { width, height } = Dimensions.get("window");

export default class ClassSettingsPage extends Component {
    constructor(props) {
        super(props);
        this.handleNavColorChange = this.handleNavColorChange.bind(this);
        this.handleClassItemHeightChange = this.handleClassItemHeightChange.bind(
            this
        );
        this.handleClassFontSizeChange = this.handleClassFontSizeChange.bind(
            this
        );
        this.handleClassBgOpacityChange = this.handleClassBgOpacityChange.bind(
            this
        );
        this.handleClassItemOpacityChange = this.handleClassItemOpacityChange.bind(
            this
        );
        this.state = {
            isOnline: Global.isOnline,
            navColor: false,
            classItemHeight: 70,
            classFontSize: 14,
            classBgOpacity: 0,
            classItemOpacity: 1,
            currentTermId: "",
            termChanged: false
        };
    }

    componentDidMount() {
        //从全局变量加载设置
        this.setState({
            navColor:
                Global.settings.class.navColor == "#ffffff" ? true : false,
            classItemHeight: Global.settings.class.itemHeight,
            classFontSize: Global.settings.class.fontSize,
            classBgOpacity: Global.settings.class.backgroundOpacity,
            classItemOpacity: 1 - Global.settings.class.itemOpacity,
            currentTermId: Global.settings.class.currentTermId
        });
        console.log(Global.settings.class.currentTermId);
    }

    componentWillMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.onBackAndroid
        );
        if (this.state.termChanged) {
            var params = this.props.navigation.state.params;
            params.refreshClassTable();
        }
    }

    onBackAndroid = () => {
        this.props.navigation.navigate(
            this.props.navigation.state.params.from,
            { from: "ClassSettings" }
        );
        return true;
    };

    getSelectedIndex() {
        var index = 0;
        for (var i in Global.terms) {
            if (Global.terms[i].termId == Global.settings.class.currentTermId) {
                index = i;
                break;
            }
        }
        console.log(index);
        return index;
    }

    handleNavColorChange(value) {
        this.setState({
            navColor: value
        });
        Global.settings.class.navColor = value ? "#ffffff" : "#808080";
        AppStorage._save("settings", Global.settings);
    }

    handleClassItemHeightChange(height) {
        this.setState({
            classItemHeight: height
        });
        Global.settings.class.itemHeight = height;
        AppStorage._save("settings", Global.settings);
    }
    handleClassFontSizeChange(fontSize) {
        this.setState({
            classFontSize: fontSize
        });
        Global.settings.class.fontSize = fontSize;
        AppStorage._save("settings", Global.settings);
    }
    handleClassBgOpacityChange(opacity) {
        this.setState({ classBgOpacity: opacity });
        Global.settings.class.backgroundOpacity = opacity;
        AppStorage._save("settings", Global.settings);
    }
    handleClassItemOpacityChange(opacity) {
        this.setState({ classItemOpacity: opacity });
        Global.settings.class.itemOpacity = 1 - opacity;
        AppStorage._save("settings", Global.settings);
    }

    /**
     * Android上请求存储权限
     * @param {Function} callback 回调函数
     */
    async requestStoragePermission(callback) {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                callback({ message: "success" });
            } else {
                callback({ message: "failed" });
            }
        } catch (err) {
            console.warn(err);
        }
    }

    /**
     * 选择图片
     */
    selectPicture() {
        Platform.OS == "ios"
            ? this.pickImage()
            : this.requestStoragePermission(res => {
                  if (res.message != "success") {
                      ToastAndroid.show(
                          "授权后才可以访问图库哦~",
                          ToastAndroid.SHORT
                      );
                  } else {
                      this.pickImage();
                  }
              });
    }

    pickImage() {
        ImagePicker.openPicker({
            width: width,
            height: height - 80,
            cropping: true,
            includeBase64: true,
            cropperActiveWidgetColor: Global.settings.theme.backgroundColor,
            cropperStatusBarColor: Global.settings.theme.backgroundColor,
            cropperToolbarColor: Global.settings.theme.backgroundColor,
            cropperChooseText: "裁剪",
            cropperCancelText: "取消"
        }).then(image => {
            Global.settings.class.backgroundImage =
                "data:img/png;base64," + image.data;
            AppStorage._save("settings", Global.settings);
        });
    }

    /**
     * 长按后清除图片
     */
    clearBgImage() {
        Global.settings.class.backgroundImage = "";
        AppStorage._save("settings", Global.settings);
        if (Platform.OS === "ios") {
            if (this.refs.toast != undefined)
                this.refs.toast.show("背景图片已恢复默认啦~", 2000);
        } else {
            ToastAndroid.show("背景图片已恢复默认啦~", ToastAndroid.SHORT);
        }
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
        var currentTermName = "";
        for (var i in Global.terms) {
            if (Global.terms[i].termId == this.state.currentTermId) {
                currentTermName = Global.terms[i].termName;
            }
        }
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
                            <EIcon
                                name="chevron-left"
                                size={28}
                                color="#ffffff"
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        this.props.navigation.state.params.from,
                                        {
                                            from: "ClassSettings",
                                            termChanged: this.state.termChanged
                                        }
                                    )
                                }
                            />
                        }
                        centerComponent={{
                            text: "课程表设置",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                    />
                    <ScrollView style={{ flex: 1 }}>
                        {Platform.OS === "ios" ? (
                            <TouchableOpacity
                                activeOpacity={0.75}
                                onPress={() => this.termPicker.show()}
                            >
                                <View style={styles.settingWrap}>
                                    <Text style={styles.settingText}>
                                        课程表当前学期
                                    </Text>
                                    <Text
                                        style={[
                                            styles.settingText,
                                            {
                                                paddingTop: 5,
                                                color: "#808080",
                                                fontSize: 12,
                                                lineHeight: 16
                                            }
                                        ]}
                                    >
                                        {currentTermName}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableNativeFeedback
                                onPress={() => this.termPicker.show()}
                            >
                                <View style={styles.settingWrap}>
                                    <Text style={styles.settingText}>
                                        课程表当前学期
                                    </Text>
                                    <Text
                                        style={[
                                            styles.settingText,
                                            {
                                                paddingTop: 5,
                                                color: "#808080",
                                                fontSize: 12,
                                                lineHeight: 16
                                            }
                                        ]}
                                    >
                                        {currentTermName}
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                        )}
                        <View
                            style={[
                                styles.settingWrap,
                                {
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlignVertical: "center"
                                }
                            ]}
                        >
                            <Text
                                style={{
                                    paddingLeft: 15,
                                    flex: 4,
                                    lineHeight: 18
                                }}
                            >
                                <Text style={styles.settingText}>
                                    课程表主题：{" "}
                                    <Text style={styles.sliderSubText}>
                                        {this.state.navColor ? "浅色" : "深色"}
                                    </Text>
                                </Text>
                            </Text>
                            <Switch
                                style={{ flex: 1 }}
                                trackColor={
                                    Global.settings.theme.backgroundColor
                                }
                                thumbColor={
                                    Global.settings.theme.backgroundColor
                                }
                                value={this.state.navColor}
                                onValueChange={this.handleNavColorChange}
                            />
                        </View>
                        <View style={styles.settingWrap}>
                            <Text style={styles.settingText}>
                                课程格子高度：{" "}
                                <Text style={styles.sliderSubText}>
                                    {this.state.classItemHeight}
                                </Text>
                            </Text>
                            <Slider
                                thumbTintColor={
                                    Global.settings.theme.backgroundColor
                                }
                                minimumTrackTintColor={
                                    Global.settings.theme.backgroundColor
                                }
                                minimumValue={20}
                                maximumValue={120}
                                value={this.state.classItemHeight}
                                onValueChange={this.handleClassItemHeightChange}
                                step={5}
                            />
                        </View>
                        <View style={styles.settingWrap}>
                            <Text style={styles.settingText}>
                                课程字体大小：{" "}
                                <Text style={styles.sliderSubText}>
                                    {this.state.classFontSize}
                                </Text>
                            </Text>
                            <Slider
                                thumbTintColor={
                                    Global.settings.theme.backgroundColor
                                }
                                minimumTrackTintColor={
                                    Global.settings.theme.backgroundColor
                                }
                                minimumValue={9}
                                maximumValue={18}
                                value={this.state.classFontSize}
                                onValueChange={this.handleClassFontSizeChange}
                                step={1}
                            />
                        </View>
                        {Platform.OS === "ios" ? (
                            <TouchableOpacity
                                activeOpacity={0.75}
                                onPress={this.selectPicture.bind(this)}
                                onLongPress={this.clearBgImage.bind(this)}
                            >
                                <View style={styles.settingWrap}>
                                    <Text style={styles.settingText}>
                                        课程表背景
                                    </Text>
                                    <Text
                                        style={[
                                            styles.settingText,
                                            {
                                                paddingTop: 5,
                                                color: "#808080",
                                                fontSize: 12,
                                                lineHeight: 16
                                            }
                                        ]}
                                    >
                                        长按可以清除哦~
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableNativeFeedback
                                onPress={this.selectPicture.bind(this)}
                                onLongPress={this.clearBgImage.bind(this)}
                            >
                                <View style={styles.settingWrap}>
                                    <Text style={styles.settingText}>
                                        课程表背景
                                    </Text>
                                    <Text
                                        style={[
                                            styles.settingText,
                                            {
                                                paddingTop: 5,
                                                color: "#808080",
                                                fontSize: 12,
                                                lineHeight: 16
                                            }
                                        ]}
                                    >
                                        长按可以清除哦~
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                        )}

                        <View style={styles.settingWrap}>
                            <Text style={styles.settingText}>
                                背景透明度：{" "}
                                <Text style={styles.sliderSubText}>
                                    {Math.ceil(this.state.classBgOpacity * 100)}
                                    %
                                </Text>
                            </Text>
                            <Slider
                                thumbTintColor={
                                    Global.settings.theme.backgroundColor
                                }
                                minimumTrackTintColor={
                                    Global.settings.theme.backgroundColor
                                }
                                minimumValue={0}
                                maximumValue={1}
                                value={this.state.classBgOpacity}
                                onValueChange={this.handleClassBgOpacityChange}
                            />
                        </View>
                        <View style={styles.settingWrap}>
                            <Text style={styles.settingText}>
                                课程格子透明度：{" "}
                                <Text style={styles.sliderSubText}>
                                    {Math.ceil(
                                        this.state.classItemOpacity * 100
                                    )}
                                    %
                                </Text>
                            </Text>
                            <Slider
                                thumbTintColor={
                                    Global.settings.theme.backgroundColor
                                }
                                minimumTrackTintColor={
                                    Global.settings.theme.backgroundColor
                                }
                                minimumValue={0}
                                maximumValue={1}
                                value={this.state.classItemOpacity}
                                onValueChange={
                                    this.handleClassItemOpacityChange
                                }
                            />
                        </View>
                    </ScrollView>
                </View>
                <TermPicker
                    ref={ref => (this.termPicker = ref)}
                    itemTextColor="#808080"
                    itemSelectedColor={Global.settings.theme.backgroundColor}
                    onPickerCancel={() => {}}
                    onPickerConfirm={value => {
                        this.setState({
                            currentTermId: Global.terms[value.index].termId,
                            termChanged: true
                        });
                        Global.settings.class.currentTermId =
                            Global.terms[value.index].termId;
                        AppStorage._save("settings", Global.settings);
                    }}
                    itemHeight={50}
                    selectedIndex={this.getSelectedIndex(
                        Global.settings.class.currentTermId
                    )}
                    confirmTextColor={Global.settings.theme.backgroundColor}
                />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        height: 60,
        textAlign: "left",
        justifyContent: "center",
        textAlignVertical: "center",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingHorizontal: 30
    },
    settingWrap: {
        padding: 15,
        backgroundColor: "#fff",
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        alignItems: "stretch",
        justifyContent: "center"
    },
    settingText: {
        paddingLeft: 15,
        paddingTop: 10,
        color: "#555",
        lineHeight: 18
    },
    sliderSubText: { color: "#808080", lineHeight: 18 }
});
