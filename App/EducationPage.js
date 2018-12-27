/**
 * 教务通知页
 */
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Platform,
    SafeAreaView
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import ScrollableTabView, {
    ScrollableTabBar
} from "react-native-scrollable-tab-view";
import Global from "../src/Global";
import EduInfo from "../src/Education/EduInfo";
import EduAnnounce from "../src/Education/EduAnnounce";
import NoticeAnnounce from "../src/Education/NoticeAnnounce";
import ExamArrangement from "../src/Education/ExamArrangement";
import JobBriefing from "../src/Education/JobBriefing";
import TeachingExploration from "../src/Education/TeachingExploration";

const { width, height } = Dimensions.get("window");
export default class EducationPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {};
    }

    componentDidMount() {}

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
                            text: "教务通知",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                    />
                    <ScrollableTabView
                        style={{
                            backgroundColor: "#f5f5f5",
                            borderWidth: 0
                        }}
                        tabBarBackgroundColor={
                            Global.settings.theme.backgroundColor
                        }
                        tabBarActiveTextColor="#fff"
                        tabBarInactiveTextColor="#fff"
                        tabBarTextStyle={{
                            fontWeight: "normal",
                            fontSize: 14
                        }}
                        tabBarUnderlineStyle={{
                            height: 3,
                            backgroundColor: "#fff"
                        }}
                        // locked={true}
                        renderTabBar={() => <ScrollableTabBar style={{}} />}
                    >
                        <EduInfo
                            tabLabel="教学信息"
                            navigation={this.props.navigation}
                        />
                        <EduAnnounce
                            tabLabel="教学公示"
                            navigation={this.props.navigation}
                        />
                        <NoticeAnnounce
                            tabLabel="通知公告"
                            navigation={this.props.navigation}
                        />
                        <ExamArrangement
                            tabLabel="考试安排"
                            navigation={this.props.navigation}
                        />
                        <JobBriefing
                            tabLabel="工作简报"
                            navigation={this.props.navigation}
                        />
                        <TeachingExploration
                            tabLabel="教学探索"
                            navigation={this.props.navigation}
                        />
                    </ScrollableTabView>
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
