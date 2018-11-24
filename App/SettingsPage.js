import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import SettingItem from "../src/SettingItem";
const { width, height } = Dimensions.get("window");

export default class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = { language: "" };
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }
    componentDidMount() {}
    onPress(language) {
        alert(language);
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Header
                    placement="left"
                    leftComponent={
                        <Button
                            title=""
                            icon={<EIcon name="menu" size={28} color="white" />}
                            clear
                            onPress={this.openDrawer}
                        />
                    }
                    centerComponent={{
                        text: "设置",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                />
                <View
                    style={{
                        marginTop: 30,
                        borderTopWidth: 1,
                        borderTopColor: "#ccc"
                    }}
                >
                    <SettingItem
                        navigation={this.props.navigation}
                        title="关于 JLU Life"
                        nextPage="About"
                    />
                    <SettingItem
                        navigation={this.props.navigation}
                        title="隐私政策"
                        nextPage="Privacy"
                    />
                    <SettingItem
                        navigation={this.props.navigation}
                        title="问题反馈&amp;建议"
                        nextPage="FeedBack"
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee"
    }
});
