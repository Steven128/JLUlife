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
export default class QueryItemIOS extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <TouchableNativeFeedback
                onPress={() =>
                    this.props.navigation.navigate(this.props.nextPage)
                }
            >
                <View style={styles.container}>
                    <View style={{}}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#555",
                                paddingBottom: 10,
                                lineHeight: 20
                            }}
                        >
                            {this.props.title}
                        </Text>
                        <Text style={{ color: "#808080", lineHeight: 18 }}>
                            {this.props.subTitle}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        textAlign: "left",
        justifyContent: "center",
        textAlignVertical: "center",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingHorizontal: 30
    }
});
