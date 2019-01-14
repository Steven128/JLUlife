/**
 * 信息查询页
 */
import React, { Component } from "react";
import {
    View,
    Dimensions,
    StyleSheet,
    StatusBar,
    Platform,
    SafeAreaView
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../../src/Global";
import ScoreStatItem from "../../src/Score/ScoreStatItem";

const { width, height } = Dimensions.get("window");

export default class ScoreStatPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = { isOnline: Global.isOnline };
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }
    componentDidMount() {}

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
                <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
                    <Header
                        containerStyle={headerStyle}
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
                            text: "成绩综合查询",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                    />
                    <View style={styles.container}>
                        <ScoreStatItem
                            navigation={this.props.navigation}
                            title="学分绩点统计"
                            target="ScoreGpoint"
                        />
                        <ScoreStatItem
                            navigation={this.props.navigation}
                            title="历年成绩"
                            target="EachYear"
                        />
                        <ScoreStatItem
                            navigation={this.props.navigation}
                            title="历次课程成绩"
                            target="EachLesson"
                        />
                        <ScoreStatItem
                            navigation={this.props.navigation}
                            title="未通过成绩"
                            target="NotPassed"
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 20
    }
});
