import React, { Component } from "react";
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions,
    Animated,
    ScrollView,
    Easing,
    Image,
    Alert
} from "react-native";
import Global from "../Global";
import Dialog, {
    DialogTitle,
    DialogButton,
    DialogContent
} from "react-native-popup-dialog";

const { width, height } = Dimensions.get("window");

export default class ClassAdditions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertVisible: false,
            pickerOpen: false,
            pickerHeight: new Animated.Value(0),
            bgOpacity: new Animated.Value(0),
            imgHeight: new Animated.Value(0)
        };
    }

    componentWillMount() {}

    handlePickerOpen() {
        if (this.state.pickerOpen) {
            this.setState({ pickerOpen: false });
            Animated.parallel([
                Animated.timing(this.state.bgOpacity, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.linear
                }),
                Animated.timing(this.state.pickerHeight, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.linear
                }),
                Animated.timing(this.state.imgHeight, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.linear
                })
            ]).start();
        } else {
            this.setState({ pickerOpen: true });
            Animated.parallel([
                Animated.timing(this.state.bgOpacity, {
                    toValue: 0.25,
                    duration: 200,
                    easing: Easing.linear
                }),
                Animated.timing(this.state.pickerHeight, {
                    toValue: 120,
                    duration: 200,
                    easing: Easing.linear
                }),
                Animated.timing(this.state.imgHeight, {
                    toValue: 30,
                    duration: 200,
                    easing: Easing.linear
                })
            ]).start();
        }
    }

    closePicker() {
        this.props.handleChange();
        if (this.state.pickerOpen) {
            this.setState({ pickerOpen: false });
            Animated.parallel([
                Animated.timing(this.state.bgOpacity, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.linear
                }),
                Animated.timing(this.state.pickerHeight, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.linear
                }),
                Animated.timing(this.state.imgHeight, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.linear
                })
            ]).start();
        }
    }

    isPickerOpen() {
        alert(this.state.pickerOpen);
        return this.state.pickerOpen;
    }

    render() {
        return (
            <View
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 99997,
                    height: this.state.pickerOpen ? "auto" : 0
                }}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.closePicker();
                    }}
                >
                    <Animated.View
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            zIndex: 99998,
                            backgroundColor: "#000",
                            opacity: this.state.bgOpacity
                        }}
                    />
                </TouchableWithoutFeedback>
                <Animated.View
                    style={{
                        height: this.state.pickerHeight,
                        backgroundColor: "#ffffff",
                        position: "absolute",
                        left: 0,
                        right: 0,
                        zIndex: 99999
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            display: this.state.pickerOpen ? "flex" : "none"
                        }}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.props.navigation.navigate("AddClass");
                                this.closePicker();
                            }}
                        >
                            <View style={styles.itemContainer}>
                                <Animated.Image
                                    style={[
                                        styles.img,
                                        { height: this.state.imgHeight }
                                    ]}
                                    source={require("../../App/assets/icons/addClass.png")}
                                />
                                <Text style={styles.text}>添加课程</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.setState({ alertVisible: true });
                            }}
                        >
                            <View style={styles.itemContainer}>
                                <Animated.Image
                                    style={[
                                        styles.img,
                                        { height: this.state.imgHeight }
                                    ]}
                                    source={require("../../App/assets/icons/refresh.png")}
                                />
                                <Text style={styles.text}>刷新课表</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.props.navigation.navigate(
                                    "ClassSettings",
                                    { from: "Table" }
                                );
                                this.closePicker();
                            }}
                        >
                            <View style={styles.itemContainer}>
                                <Animated.Image
                                    style={[
                                        styles.img,
                                        { height: this.state.imgHeight }
                                    ]}
                                    source={require("../../App/assets/icons/personalize.png")}
                                />
                                <Text style={styles.text}>个性化设置</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Animated.View>
                <Dialog
                    visible={this.state.alertVisible}
                    dialogTitle={
                        <DialogTitle
                            title="提示"
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
                                color: "#808080",
                                fontSize: 14,
                                fontWeight: "normal"
                            }}
                            onPress={() => {
                                this.setState({ alertVisible: false });
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
                                this.setState({ alertVisible: false });
                                this.props.refreshClassTable();
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
                                    手动刷新课表会清除你此前对课表的添加和修改
                                </Text>
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    img: {
        width: 30,
        height: 30
    },
    text: {
        marginTop: 15,
        color: "#6a6a6a"
    }
});
