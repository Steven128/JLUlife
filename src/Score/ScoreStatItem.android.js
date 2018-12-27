import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableNativeFeedback
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../Global";
const { width, height } = Dimensions.get("window");
export default class ScoreStatItemAndroid extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <TouchableNativeFeedback
                onPress={() =>
                    this.props.navigation.navigate("Detail", {
                        target: this.props.target,
                        title: this.props.title
                    })
                }
            >
                <View style={styles.container}>
                    <Text style={{ color: "#6a6a6a" }}>{this.props.title}</Text>
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
