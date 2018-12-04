import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    WebView,
    StyleSheet,
    Linking,
    TouchableNativeFeedback
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Feather";
import Global from "../../src/Global";
const { width, height } = Dimensions.get("window");

var { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
export default class FeedBackPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {
            getOa: false,
            oaDetail: {},
            showTag: false
        };
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }
    goToGithub() {
        Linking.openURL("https://github.com/Steven128/JLUlife");
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Header
                    containerStyle={{
                        borderBottomColor: Global.settings.theme.backgroundColor
                    }}
                    backgroundColor={Global.settings.theme.backgroundColor}
                    placement="left"
                    leftComponent={
                        <Button
                            title=""
                            icon={
                                <EIcon
                                    name="chevron-left"
                                    size={28}
                                    color="white"
                                />
                            }
                            clear
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    centerComponent={{
                        text: "问题反馈&建议",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                />
                <View style={styles.main}>
                    <Text style={[styles.text]}>
                        问题反馈及建议，或合作意向，请发邮件至
                    </Text>
                    <Text style={[styles.text]}>Steven128@outlook.com</Text>
                    <Text style={{ height: 30 }} />
                    <Text style={[styles.text]}>
                        本项目开源，欢迎Star或Fork
                    </Text>
                    <TouchableNativeFeedback
                        onPress={this.goToGithub.bind(this)}
                    >
                        <Text
                            style={[
                                styles.text,
                                styles.link,
                                {
                                    color: Global.settings.theme.backgroundColor,
                                    textDecorationColor:
                                        Global.settings.theme.backgroundColor
                                }
                            ]}
                        >
                            https://github.com/Steven128/JLUlife
                        </Text>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    main: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50
    },
    text: {
        color: "#777",
        lineHeight: 24,
        fontWeight: "100"
    },
    title: {
        fontSize: 18,
        paddingBottom: 5
    },
    link: {
        textDecorationLine: "underline",
        textDecorationStyle: "solid"
    }
});
