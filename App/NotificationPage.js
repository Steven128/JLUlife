/**
 * 校内通知页
 */
import React, { Component } from "react";
import {
    View,
    Dimensions,
    ActivityIndicator,
    StyleSheet,
    StatusBar,
    Platform,
    SafeAreaView
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import { getOaList } from "../src/FetchInterface/NotificationInterface";
import NotificationView from "../src/Notification/NotificationView";

const { width, height } = Dimensions.get("window");
export default class NotificationPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {
            getOa: false,
            oaList: []
        };
    }

    componentDidMount() {
        getOaList(1, res => {
            if (res.message == "success") {
                this.setState({
                    oaList: res.content,
                    getOa: true
                });
            }
        });
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }
    render() {
        const { navigate } = this.props.navigation;
        var headerStyle = {
            borderBottomColor: Global.settings.theme.backgroundColor
        };
        if (Platform.OS == "ios") {
            headerStyle.paddingTop = 0;
            headerStyle.height = 44;
        }
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: Global.settings.theme.backgroundColor
                }}
            >
                <StatusBar
                    backgroundColor={Global.settings.theme.backgroundColor}
                    barStyle="light-content"
                    translucent={false}
                />
                <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                    <Header
                        containerStyle={headerStyle}
                        backgroundColor={Global.settings.theme.backgroundColor}
                        placement="left"
                        leftComponent={
                            <Button
                                title=""
                                icon={
                                    <EIcon
                                        name="menu"
                                        size={28}
                                        color="white"
                                    />
                                }
                                clear
                                onPress={this.openDrawer}
                            />
                        }
                        centerComponent={{
                            text: "校内通知",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                        rightComponent={
                            <Button
                                buttonStyle={{
                                    borderColor: "#ffffff",
                                    // borderWidth: 1,
                                    borderRadius: 3,
                                    padding: 3
                                }}
                                title=""
                                icon={
                                    <EIcon
                                        name="magnifying-glass"
                                        size={22}
                                        color="white"
                                    />
                                }
                                clear
                                onPress={() => {
                                    this.props.navigation.navigate("Search");
                                }}
                            />
                        }
                    />
                    {this.state.getOa ? (
                        <NotificationView
                            oaList={this.state.oaList}
                            navigation={this.props.navigation}
                        />
                    ) : (
                        <View
                            style={{
                                paddingVertical: height / 2 - 150,
                                backgroundColor: "transparent"
                            }}
                        >
                            <ActivityIndicator
                                style={{}}
                                size="large"
                                color={Global.settings.theme.backgroundColor}
                            />
                        </View>
                    )}
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
