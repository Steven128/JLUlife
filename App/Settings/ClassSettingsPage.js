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
    Alert,
    Slider,
    Switch,
    PermissionsAndroid,
    ToastAndroid,
    StatusBar,
    SafeAreaView
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import ImagePicker from "react-native-image-crop-picker";
import Global from "../../src/Global";
import AppStorage from "../../src/AppStorage";
import Toast from "react-native-easy-toast";

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
            classItemOpacity: 1
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
            classItemOpacity: 1 - Global.settings.class.itemOpacity
        });
    }

    componentWillUnmount() {
        //离开页面时将更改写入全局变量和缓存，保存起来
        Global.settings.class.navColor = this.state.navColor
            ? "#ffffff"
            : "#808080";
        Global.settings.class.itemHeight = this.state.classItemHeight;
        Global.settings.class.fontSize = this.state.classFontSize;
        Global.settings.class.backgroundOpacity = this.state.classBgOpacity;
        Global.settings.class.itemOpacity = 1 - this.state.classItemOpacity;
        AppStorage._save("settings", Global.settings);
    }

    handleNavColorChange(value) {
        this.setState({
            navColor: value
        });
    }

    handleClassItemHeightChange(height) {
        this.setState({
            classItemHeight: height
        });
    }
    handleClassFontSizeChange(fontSize) {
        this.setState({
            classFontSize: fontSize
        });
    }
    handleClassBgOpacityChange(opacity) {
        this.setState({ classBgOpacity: opacity });
    }
    handleClassItemOpacityChange(opacity) {
        this.setState({ classItemOpacity: opacity });
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
            height: height,
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
        Platform.OS === "ios"
            ? this.refs.toast.show("背景图片已恢复默认啦~", 2000)
            : ToastAndroid.show("背景图片已恢复默认啦~", ToastAndroid.SHORT);
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
                            <Button
                                title=""
                                icon={
                                    <EIcon
                                        name="chevron-left"
                                        size={28}
                                        color="white"
                                    />
                                }
                                clear
                                onPress={() =>
                                    this.props.navigation.navigate("Settings")
                                }
                            />
                        }
                        centerComponent={{
                            text: "课程表设置",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                    />
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
                        <Text style={{ paddingLeft: 15, flex: 4 }}>
                            课程表主题：{" "}
                            <Text style={styles.sliderSubText}>
                                {this.state.navColor ? "浅色" : "深色"}
                            </Text>
                        </Text>
                        <Switch
                            style={{ flex: 1 }}
                            trackColor={Global.settings.theme.backgroundColor}
                            thumbColor={Global.settings.theme.backgroundColor}
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
                                            color: "#888",
                                            fontSize: 12
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
                                            color: "#888",
                                            fontSize: 12
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
                                {Math.ceil(this.state.classBgOpacity * 100)}%
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
                                {Math.ceil(this.state.classItemOpacity * 100)}%
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
                            onValueChange={this.handleClassItemOpacityChange}
                        />
                    </View>
                </View>
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
        color: "#555"
    },
    sliderSubText: { color: "#888" }
});
