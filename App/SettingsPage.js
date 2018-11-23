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
                <SettingItem navigation={this.props.navigation} nextPage="About" />
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
