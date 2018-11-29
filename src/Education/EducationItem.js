import React, { Component } from "react";
import {
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    View,
    Text
} from "react-native";
import Global from "../Global";

const { width, height } = Dimensions.get("window");

export default class EducationItem extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate("Item", {
                        title: this.props.title,
                        href: this.props.href,
                        time: this.props.time
                    });
                }}
            >
                <View style={styles.container}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text
                            style={[
                                styles.text,
                                { flex: 1, textAlign: "right" }
                            ]}
                        >
                            {this.props.time}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    title: {
        color: "#888",
        fontSize: 16,
        fontWeight: "normal",
        paddingBottom: 10
    },
    text: {
        color: "#888",
        fontSize: 12
    }
});
