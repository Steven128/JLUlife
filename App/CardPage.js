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
import EduInfo from "../src/Education/EduInfo";
import EduAnnounce from "../src/Education/EduAnnounce";
import NoticeAnnounce from "../src/Education/NoticeAnnounce";
import ExamArrangement from "../src/Education/ExamArrangement";
import JobBriefing from "../src/Education/JobBriefing";
import TeachingExploration from "../src/Education/TeachingExploration";
import Global from "../src/Global";

const { width, height } = Dimensions.get("window");
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {};
    }

    componentWillMount() {
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
            <View style={{ flex: 1 }}>
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
                        text: "一卡通",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                />
                <ScrollableTabView
                    style={{ backgroundColor: "#fff" }}
                    tabBarActiveTextColor="#2089dc"
                    tabBarInactiveTextColor="#454545"
                    tabBarTextStyle={{ fontWeight: "normal", fontSize: 14 }}
                    tabBarUnderlineStyle={{
                        height: 3,
                        backgroundColor: "#2089dc"
                    }}
                    locked={true}
                    renderTabBar={() => <ScrollableTabBar />}
                >
                    <View
                        tabLabel="基本信息"
                        navigation={this.props.navigation}
                    />
                    <View
                        tabLabel="消费流水"
                        navigation={this.props.navigation}
                    />
                    <View
                        tabLabel="转账充值"
                        navigation={this.props.navigation}
                    />
                    <View
                        tabLabel="拾卡信息"
                        navigation={this.props.navigation}
                    />
                </ScrollableTabView>
            </View>
        );
    }
}
