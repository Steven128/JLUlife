import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    Easing
} from "react-native";
import AppStorage from "../AppStorage";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../Global";
const { width, height } = Dimensions.get("window");

export default class ClassTip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTip: false,
            transform: 100
        };
    }

    componentWillMount() {
        AppStorage._load("classTip@2.1", res => {
            if (res.message == "success") {
                if (res.content == true) {
                    this.setState({ showTip: true });
                }
            } else if (res.message == "error") {
                this.setState({ showTip: true });
            }
        });
        () => this.getLarger();
    }

    getLarger() {
        Animated.timing(this.state.transform, {
            toValue: 150,
            duration: 1500,
            easing: Easing.linear
        }).start();
    }
    getSmaller() {
        Animated.timing(this.state.transform, {
            toValue: 100,
            duration: 1500,
            easing: Easing.linear
        }).start();
    }

    circleAnimate() {
        this.getLarger();
    }

    render() {
        if (this.state.showTip == false) return null;
        else
            return (
                <View style={styles.tipWrap}>
                    <View
                        style={[
                            styles.tipWrap,
                            { backgroundColor: "#21252a", opacity: 0.3 }
                        ]}
                    />
                    <View style={styles.outerCircle}>
                        <View
                            style={[
                                styles.innerCircle,
                                {
                                    height: this.state.transform,
                                    width: this.state.transform,
                                    borderRadius: this.state.transform * 0.5
                                }
                            ]}
                        >
                            <EIcon
                                name={"chevron-down"}
                                size={28}
                                color={Global.settings.theme.backgroundColor}
                            />
                        </View>
                    </View>
                </View>
            );
    }
}

const styles = StyleSheet.create({
    tipWrap: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 999
    },
    outerCircle: {
        zIndex: 1000,
        alignItems: "center",
        justifyContent: "center",
        height: width * 1.4,
        width: width * 1.4,
        borderRadius: width * 0.7,
        backgroundColor: "red",
        position: "absolute",
        right: -width * 0.7 + 50,
        top: -width * 0.7 + 50
    },
    innerCircle: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        position: "relative"
    }
});
