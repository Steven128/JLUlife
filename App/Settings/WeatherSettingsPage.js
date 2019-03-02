/**
 * 设置 -> 关于页
 */
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    StatusBar,
    Platform,
    SafeAreaView,
    ScrollView,
    Keyboard,
    BackHandler
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Feather";
import Global from "../../src/Global";
import DropDownPicker from "../../src/Components/DropdownPicker";
import AppStorage from "../../src/AppStorage";

const { width, height } = Dimensions.get("window");

var { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
export default class WeatherSettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            cityList: [],
            selectedIndex: 0,
            citySelected: { cid: "", location: "" }
        };
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.handleBackPress
        );
    }

    handleBackPress = () => {
        this.props.navigation.navigate(this.props.navigation.state.params.from);
        return true;
    };
    changeLocation(location) {
        this.setState({
            location: location
        });
        setTimeout(() => {
            this.getCityList();
        }, 50);
    }
    handleCityChange(index) {
        this.setState({
            selectedIndex: index,
            citySelected: {
                cid: this.state.cityList[index].cid,
                location: this.state.cityList[index].location
            },
            cityList: []
        });
        Keyboard.dismiss();
    }

    getCityList() {
        let url =
            "https://search.heweather.net/find?location=" +
            this.state.location +
            "&key=8fd99ea8b58746cbb5ac6cea16ca2b09&group=cn";
        fetch(url, {
            method: "GET"
        })
            .then(response => response.json())
            .then(responseJson => {
                var cityList = [];
                responseJson = responseJson.HeWeather6[0].basic;
                for (var i in responseJson) {
                    var single = {};
                    single.index = i;
                    single.cid = responseJson[i].cid;
                    single.location = responseJson[i].location;
                    single.admin_area = responseJson[i].admin_area;
                    cityList.push(single);
                }
                this.setState({
                    cityList: cityList
                });
            })
            .catch(err => {});
    }

    onSave() {
        if (
            this.refs.picker.getValue() == "" ||
            this.state.citySelected.location == "" ||
            this.refs.picker.getValue() != this.state.citySelected.location
        )
            return;
        Global.settings.weather.city = this.state.citySelected.cid;
        Global.settings.weather.name = this.state.citySelected.location;
        AppStorage._save("settings", Global.settings);
        this.props.navigation.navigate(
            this.props.navigation.state.params.from,
            {
                from: "WeatherSettings",
                name: this.state.citySelected.location
            }
        );
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
                <Header
                    containerStyle={headerStyle}
                    backgroundColor={Global.settings.theme.backgroundColor}
                    placement="left"
                    leftComponent={
                        <EIcon
                            name="chevron-left"
                            size={28}
                            color="#ffffff"
                            onPress={() =>
                                this.props.navigation.navigate(
                                    this.props.navigation.state.params.from
                                )
                            }
                        />
                    }
                    centerComponent={{
                        text: "天气城市设置",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                    rightComponent={
                        <Button
                            containerStyle={{
                                borderWidth: 1,
                                borderColor: "#ffffff",
                                borderRadius: 3
                            }}
                            titleStyle={{
                                fontSize: 12,
                                paddingHorizontal: 5,
                                paddingVertical: 4,
                                color: "#ffffff"
                            }}
                            title="保存"
                            type="outline"
                            onPress={this.onSave.bind(this)}
                        />
                    }
                />
                <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                    <View
                        style={{
                            position: "absolute",
                            top: 80,
                            paddingHorizontal: 15,
                            zIndex: 0
                        }}
                    >
                        <Text style={{ color: "#6a6a6a", lineHeight: 18 }}>
                            在输入框中输入你想要切换的城市，然后在列表中选择一个~
                        </Text>
                        <Text style={{ color: "#6a6a6a", lineHeight: 18 }}>
                            点击保存后生效哟~
                        </Text>
                    </View>
                    <DropDownPicker
                        cityList={this.state.cityList}
                        changeLocation={this.changeLocation.bind(this)}
                        selectItem={this.handleCityChange.bind(this)}
                        ref="picker"
                    />
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    item: {
        height: 80,
        textAlign: "left",
        justifyContent: "center",
        textAlignVertical: "center",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingHorizontal: 30
    }
});
