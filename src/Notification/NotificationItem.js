import React, { Component } from "react";
import {
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Text
} from "react-native";
import Global from "../Global";

const { width, height } = Dimensions.get("window");

export default class NotificationItem extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        var title = [];
        if (this.props.toTop) {
            var redText = (
                <Text style={[styles.text, { color: "red" }]}>[置顶]</Text>
            );
            title.push(redText);
        }
        title.push(<Text style={styles.title}>{this.props.title}</Text>);
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate("Item", {
                        title: this.props.title,
                        href: this.props.href,
                        comeFrom: this.props.comeFrom,
                        time: this.props.time
                    });
                }}
            >
                <View style={styles.container}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {title}
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={[styles.text, { flex: 1 }]}>
                            {this.props.comeFrom}
                        </Text>
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
