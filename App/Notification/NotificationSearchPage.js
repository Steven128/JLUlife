/**
 * 校内通知页
 */
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    ActivityIndicator,
    StyleSheet,
    StatusBar,
    Platform,
    SafeAreaView,
    TextInput,
    TouchableOpacity
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../../src/Global";
import { searchOa } from "../../src/FetchInterface/NotificationInterface";
import SearchView from "../../src/Notification/SearchView";
import SearchTypePicker from "../../src/Notification/SearchTypePicker";

const { width, height } = Dimensions.get("window");
export default class NotificationSearchPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {
            searching: false,
            getOa: false,
            oaList: [],
            searchnr: "",
            searchlx: "标题"
        };
    }

    componentDidMount() {}

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }

    renderButton(text, callback) {
        return (
            <TouchableOpacity
                onPress={callback.bind(this)}
                style={{ flex: 1, padding: 10, paddingRight: 0 }}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: Global.settings.theme.backgroundColor,
                        borderWidth: 1,
                        paddingVertical: 8,
                        borderRadius: 3,
                        flexDirection: "row",
                        backgroundColor: "#fff",
                        overflow: "hidden"
                    }}
                >
                    <Text
                        style={{ flex: 1.5, paddingLeft: 10, color: "#6a6a6a" }}
                    >
                        {text}
                    </Text>
                    <EIcon
                        style={{ flex: 1 }}
                        size={18}
                        name="chevron-small-down"
                    />
                </View>
            </TouchableOpacity>
        );
    }

    buttonTapped() {
        if (this.state.searchnr == "") return false;
        this.setState({
            getOa: false,
            oaList: [],
            searching: true
        });
        var searchlx = 0;
        if (this.state.searchlx == "组织") searchlx = 1;
        else if (this.state.searchlx == "内容") searchlx = 2;
        else if (this.state.searchlx == "日期") searchlx = 3;
        searchOa(1, this.state.searchnr, searchlx, res => {
            if (res.message == "success") {
                this.setState({
                    oaList: res.content,
                    searching: false,
                    getOa: true
                });
            }
        });
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
        var searchlx = 0;
        if (this.state.searchlx == "组织") searchlx = 1;
        else if (this.state.searchlx == "内容") searchlx = 2;
        else if (this.state.searchlx == "日期") searchlx = 3;
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
                            text: "通知查询",
                            style: { color: "#fff", fontSize: 16 }
                        }}
                    />
                    <View style={{ flex: 1 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                backgroundColor: "#fff",
                                borderBottomColor: "#eee",
                                borderBottomWidth: 1
                            }}
                        >
                            {this.renderButton(this.state.searchlx, () => {
                                this.SearchTypePicker.show();
                            })}
                            <View
                                style={{
                                    flex: 4,
                                    padding: 10
                                }}
                            >
                                <TextInput
                                    style={{
                                        color: "#6a6a6a",
                                        borderColor:
                                            Global.settings.theme
                                                .backgroundColor,
                                        borderWidth: 1,
                                        paddingVertical:
                                            Platform.OS == "ios" ? 10 : 3.5,
                                        paddingHorizontal: 10,
                                        borderRadius: 3,
                                        backgroundColor: "#ffffff"
                                    }}
                                    onChangeText={value => {
                                        this.setState({
                                            searchnr: value
                                        });
                                    }}
                                    value={this.state.searchnr}
                                    onSubmitEditing={this.buttonTapped.bind(
                                        this
                                    )}
                                    placeholder="按回车键搜索"
                                />
                            </View>
                        </View>
                        <SearchTypePicker
                            ref={ref => (this.SearchTypePicker = ref)}
                            itemTextColor="#808080"
                            itemSelectedColor={
                                Global.settings.theme.backgroundColor
                            }
                            onPickerCancel={() => {}}
                            onPickerConfirm={value => {
                                this.setState({
                                    searchlx: value
                                });
                            }}
                            itemHeight={50}
                        />
                        {this.state.getOa ? (
                            <SearchView
                                oaList={this.state.oaList}
                                navigation={this.props.navigation}
                                searchnr={this.state.searchnr}
                                searchlx={searchlx}
                            />
                        ) : this.state.searching ? (
                            <View
                                style={{
                                    flex: 1,
                                    paddingVertical: height / 2 - 150,
                                    backgroundColor: "transparent"
                                }}
                            >
                                <ActivityIndicator
                                    size="large"
                                    color={
                                        Global.settings.theme.backgroundColor
                                    }
                                />
                            </View>
                        ) : null}
                    </View>
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
