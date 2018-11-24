import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import Communications from "react-native-communications";
const { width, height } = Dimensions.get("window");

export default class SettingsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <TouchableOpacity
                onPress={() =>
                    this.props.navigation.navigate(this.props.nextPage)
                }
            >
                <View style={styles.container}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 9 }}>{this.props.title}</Text>
                        <EIcon
                            style={{ flex: 1 }}
                            name="chevron-thin-right"
                            size={18}
                            color="#555"
                        />
                    </View>
                </View>
            </TouchableOpacity>
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
        borderBottomColor: "#ccc",
        paddingHorizontal: 30
    }
});
