import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import Global from "../Global";

export class FooterFailureComponent extends Component {
    render() {
        return (
            <View style={styles.footerContainer}>
                <Text
                    style={[
                        styles.footerText,
                        { color: Global.settings.theme.backgroundColor }
                    ]}
                >
                    {"我擦嘞，居然失败了 =.=!"}
                </Text>
            </View>
        );
    }
}

export class FooterEmptyDataComponent extends Component {
    render() {
        return (
            <View style={styles.footerContainer}>
                <Text
                    style={[
                        styles.footerText,
                        { color: Global.settings.theme.backgroundColor }
                    ]}
                >
                    {"—— 好像什么东西都没有 ——"}
                </Text>
            </View>
        );
    }
}

export class FooterRefreshingComponent extends Component {
    render() {
        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator
                    size="small"
                    color={Global.settings.theme.backgroundColor}
                />
                <Text
                    style={[
                        styles.footerText,
                        {
                            paddingLeft: 5,
                            color: Global.settings.theme.backgroundColor
                        }
                    ]}
                >
                    {"玩命加载中 >.<"}
                </Text>
            </View>
        );
    }
}

export class FooterNoMoreDataComponent extends Component {
    render() {
        return (
            <View style={styles.footerContainer}>
                <Text
                    style={[
                        styles.footerText,
                        { color: Global.settings.theme.backgroundColor }
                    ]}
                >
                    {"—— 我是有底线的 ——"}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f5f5f5"
    },
    footerText: {
        fontSize: 14,
        lineHeight: 18
    }
});
