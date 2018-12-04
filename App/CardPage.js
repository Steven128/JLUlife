import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import ScrollableTabView, {
    ScrollableTabBar
} from "react-native-scrollable-tab-view";
import CardInfo from "../src/Card/CardInfo";
import CardRecords from "../src/Card/CardRecords";
import CardTransfer from "../src/Card/CardTransfer";
import CardPickup from "../src/Card/CardPickup";
import CardLoss from "../src/Card/CardLoss";
import Global from "../src/Global";

const { width, height } = Dimensions.get("window");
export default class CardPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = { isOnline: false };
    }

    componentWillReceiveProps() {
        this.setState({ isOnline: Global.card.isOnline });
    }

    componentDidMount() {
        this.setState({ isOnline: Global.card.isOnline });
        if (!Global.card.isOnline) {
            this.props.navigation.navigate("Login");
        }
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, backgroundColor: "#efefef" }}>
                <Header
                    containerStyle={{
                        borderBottomColor: Global.settings.theme.backgroundColor
                    }}
                    backgroundColor={Global.settings.theme.backgroundColor}
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
                        text: "一卡通",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                />
                <ScrollableTabView
                    style={{
                        backgroundColor: "#efefef",
                        borderWidth: 0
                    }}
                    tabBarBackgroundColor={
                        Global.settings.theme.backgroundColor
                    }
                    tabBarActiveTextColor="#fff"
                    tabBarInactiveTextColor="#fff"
                    tabBarTextStyle={{ fontWeight: "normal", fontSize: 14 }}
                    tabBarUnderlineStyle={{
                        height: 3,
                        backgroundColor: "#fff"
                    }}
                    renderTabBar={() => <ScrollableTabBar />}
                >
                    {this.state.isOnline ? (
                        <CardInfo
                            tabLabel="基本信息"
                            navigation={this.props.navigation}
                        />
                    ) : (
                        <View
                            tabLabel="基本信息"
                            navigation={this.props.navigation}
                        />
                    )}
                    {this.state.isOnline ? (
                        <CardRecords
                            tabLabel="消费流水"
                            navigation={this.props.navigation}
                        />
                    ) : (
                        <View
                            tabLabel="消费流水"
                            navigation={this.props.navigation}
                        />
                    )}
                    {this.state.isOnline ? (
                        <CardTransfer
                            tabLabel="转账充值"
                            navigation={this.props.navigation}
                        />
                    ) : (
                        <View
                            tabLabel="转账充值"
                            navigation={this.props.navigation}
                        />
                    )}
                    {this.state.isOnline ? (
                        <CardPickup
                            tabLabel="拾卡信息"
                            navigation={this.props.navigation}
                        />
                    ) : (
                        <View
                            tabLabel="拾卡信息"
                            navigation={this.props.navigation}
                        />
                    )}
                    {this.state.isOnline ? (
                        <CardLoss
                            tabLabel="校园卡挂失"
                            navigation={this.props.navigation}
                        />
                    ) : (
                        <View
                            tabLabel="校园卡挂失"
                            navigation={this.props.navigation}
                        />
                    )}
                </ScrollableTabView>
            </View>
        );
    }
}
