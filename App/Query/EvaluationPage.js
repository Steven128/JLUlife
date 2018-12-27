/**
 * 信息查询 -> 图书馆查询页
 */
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableNativeFeedback,
    Platform,
    StatusBar,
    SafeAreaView,
    Alert,
    ScrollView
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Feather";
import Global from "../../src/Global";
import AppStorage from "../../src/AppStorage";
import ScrollableTabView, {
    ScrollableTabBar
} from "react-native-scrollable-tab-view";
import Blank from "../../src/Query/Evaluation/Blank";
import Done from "../../src/Query/Evaluation/Done";
import Dialog, {
    ScaleAnimation,
    DialogTitle,
    DialogButton,
    DialogContent
} from "react-native-popup-dialog";

const { width, height } = Dimensions.get("window");

var { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
export default class EvaluationPage extends Component {
    constructor(props) {
        super(props);
        this.state = { dialogVisible: false, selectedIndex: 0 };
    }

    componentDidMount() {
        if (!Global.isOnline) {
            Alert.alert(
                "提示",
                "登录后才能评教哟~",
                [
                    {
                        text: "知道啦",
                        onPress: () => this.props.navigation.navigate("Main")
                    }
                ],
                { cancelable: false }
            );
        } else {
            if (Global.settings.options.firstUseEval) {
                this.setState({
                    dialogVisible: true
                });
            }
        }
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
                            text: "教学评价",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                        rightComponent={
                            this.state.selectedIndex == 0 ? (
                                <Button
                                    containerStyle={{
                                        borderWidth: 1,
                                        borderColor: "#ffffff",
                                        borderRadius: 3
                                    }}
                                    titleStyle={{
                                        fontSize: 12,
                                        paddingHorizontal: 5,
                                        paddingVertical: 4
                                    }}
                                    title="一键教评"
                                    clear
                                    onPress={() => {
                                        this.refs.blankList.evalAll();
                                    }}
                                />
                            ) : null
                        }
                    />

                    <ScrollableTabView
                        onChangeTab={({ i, ref }) => {
                            this.setState({ selectedIndex: i });
                        }}
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
                        <Blank
                            ref="blankList"
                            tabLabel="未评记录"
                            navigation={this.props.navigation}
                        />
                        <Done
                            tabLabel="已评记录"
                            navigation={this.props.navigation}
                        />
                    </ScrollableTabView>
                </View>
                <Dialog
                    visible={this.state.dialogVisible}
                    dialogTitle={
                        <DialogTitle
                            title="使用提示"
                            align="left"
                            style={{
                                backgroundColor: "#ffffff"
                            }}
                            titleStyle={{ color: "#555", fontWeight: 500 }}
                        />
                    }
                    actions={[
                        <DialogButton
                            text="拒绝"
                            textStyle={{ color: "#808080" }}
                            onPress={() => {
                                this.setState({ dialogVisible: false });
                                this.props.navigation.goBack();
                            }}
                        />,
                        <DialogButton
                            text="同意"
                            textStyle={{
                                color: Global.settings.theme.backgroundColor
                            }}
                            onPress={() => {
                                Global.settings.options.firstUseEval = false;
                                AppStorage._save("settings", Global.settings);
                                this.setState({ dialogVisible: false });
                            }}
                        />
                    ]}
                    dialogAnimation={new ScaleAnimation()}
                    width={0.9}
                    height={0.65}
                    containerStyle={styles.dialog}
                >
                    <DialogContent style={{ flex: 1 }}>
                        <ScrollView
                            style={{ flex: 1 }}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ paddingVertical: 10 }}>
                                <Text style={{ fontSize: 16 }}>
                                    欢迎使用教学评价功能~
                                </Text>
                            </View>
                            <View style={{ paddingVertical: 10 }}>
                                <Text style={{ paddingVertical: 5 }}>
                                    • 点击未评记录中的每一项可对该项单独评价
                                </Text>
                                <Text style={{ paddingVertical: 5 }}>
                                    •
                                    点击一键教评可自动完成未评记录中剩余项的评价
                                </Text>
                                <Text style={{ paddingVertical: 5 }}>
                                    •
                                    使用一键评教功能将默认对所有选项好评，如不认可默认的评价内容，可点击每一项未评记录手动评价
                                </Text>
                                <Text style={{ paddingVertical: 5 }}>
                                    •
                                    此功能仅为方便大家，对日后因任何原因（如学校相关接口变动）造成的功能失效或其他问题不负责
                                </Text>
                            </View>
                        </ScrollView>
                    </DialogContent>
                </Dialog>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
