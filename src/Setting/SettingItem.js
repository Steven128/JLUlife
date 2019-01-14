import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../Global";
const { width, height } = Dimensions.get("window");

export default class SettingsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return Platform.OS === "ios" ? (
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={() =>
                    this.props.navigation.navigate(
                        this.props.nextPage,
                        this.props.params
                    )
                }
            >
                <View style={styles.container}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 9 }}>{this.props.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        ) : (
            <TouchableNativeFeedback
                onPress={() =>
                    this.props.navigation.navigate(
                        this.props.nextPage,
                        this.props.params
                    )
                }
            >
                <View style={styles.container}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 9 }}>{this.props.title}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        textAlign: "left",
        justifyContent: "center",
        textAlignVertical: "center",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingHorizontal: 30
    }
});
