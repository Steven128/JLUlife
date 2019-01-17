import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    ToastAndroid,
    Platform
} from "react-native";
import Global from "../Global";
import AppStorage from "../AppStorage";

export default class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            getWeather: false,
            weatherData: {},
            getAqi: false,
            aqiData: {}
        };
    }
    componentDidMount() {
        if (JSON.stringify(Global.tips) != "{}") {
            if (Global.tips.weatherData != undefined) {
                this.setState({
                    weatherData: Global.tips.weatherData,
                    getWeather: true
                });
            }
            if (Global.tips.aqiData != undefined) {
                this.setState({
                    aqiData: Global.tips.aqiData,
                    getAqi: true
                });
            }
        } else {
            AppStorage._load("tips", res => {
                if (res.message == "success") {
                    var timestamp = parseInt(new Date().getTime() / 1000);
                    var lastUpdate =
                        new Date(
                            res.content.weatherData.update.replace(/-/g, "/")
                        ).getTime() / 1000;
                    if (
                        Math.floor((timestamp - lastUpdate) / 3600) >= 20 &&
                        new Date().toISOString().substring(5, 10) !=
                            this.state.weatherData.update.substring(5, 10)
                    ) {
                        this.refreshTips();
                    } else {
                        if (res.content.weatherData != undefined) {
                            if (
                                JSON.stringify(res.content.weatherData) != "{}"
                            ) {
                                Global.tips.weatherData =
                                    res.content.weatherData;
                                this.setState({
                                    weatherData: res.content.weatherData,
                                    getWeather: true
                                });
                            }
                        }
                        if (res.content.aqiData != undefined) {
                            if (JSON.stringify(res.content.aqiData) != "{}") {
                                Global.tips.aqiData = res.content.aqiData;
                                this.setState({
                                    aqiData: res.content.aqiData,
                                    getAqi: true
                                });
                            }
                        }
                    }
                } else {
                    this.refreshTips();
                }
            });
        }
    }

    refreshTips() {
        this.getWeather(res => {
            if (res.message == "success") {
                ToastAndroid.show("天气已刷新", ToastAndroid.SHORT);
                if (Global.tips.aqiData != undefined) {
                    AppStorage._save("tips", Global.tips);
                }
            }
        });
        this.getAqi(res => {
            if (res.message == "success") {
                ToastAndroid.show("天气已刷新", ToastAndroid.SHORT);
                if (Global.tips.weatherData != undefined) {
                    AppStorage._save("tips", Global.tips);
                }
            }
        });
    }

    getWeather(callback) {
        var key =
            Platform.OS == "ios"
                ? "da8986c14bb24a9389c545501a54a588"
                : "8fd99ea8b58746cbb5ac6cea16ca2b09";
        fetch(
            "https://free-api.heweather.net/s6/weather?location=" +
                Global.settings.weather.city +
                "&key=" +
                key,
            {
                method: "GET"
            }
        )
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.HeWeather6[0].status != "ok") {
                    callback({ message: "error" });
                    return;
                }
                var weatherData = {
                    now: {},
                    tomorrow: {},
                    lifestyle: {},
                    update: "",
                    location: ""
                };
                weatherData.now.tmp = responseJson.HeWeather6[0].now.tmp;
                weatherData.now.fl = responseJson.HeWeather6[0].now.fl;
                weatherData.now.cond_txt =
                    responseJson.HeWeather6[0].now.cond_txt;
                weatherData.now.wind_dir =
                    responseJson.HeWeather6[0].now.wind_dir;
                weatherData.now.wind_sc =
                    responseJson.HeWeather6[0].now.wind_sc;
                weatherData.tomorrow.tmp_max =
                    responseJson.HeWeather6[0].daily_forecast[0].tmp_max;
                weatherData.tomorrow.tmp_min =
                    responseJson.HeWeather6[0].daily_forecast[0].tmp_min;
                weatherData.tomorrow.cond_txt_d =
                    responseJson.HeWeather6[0].daily_forecast[0].cond_txt_d;
                weatherData.tomorrow.cond_txt_n =
                    responseJson.HeWeather6[0].daily_forecast[0].cond_txt_n;
                weatherData.tomorrow.wind_dir =
                    responseJson.HeWeather6[0].daily_forecast[0].wind_dir;
                weatherData.tomorrow.wind_sc =
                    responseJson.HeWeather6[0].daily_forecast[0].wind_sc;
                weatherData.lifestyle.brf =
                    responseJson.HeWeather6[0].lifestyle[0].brf;
                weatherData.lifestyle.txt =
                    responseJson.HeWeather6[0].lifestyle[0].txt;
                weatherData.update = responseJson.HeWeather6[0].update.loc;
                weatherData.location =
                    responseJson.HeWeather6[0].basic.location;
                Global.tips.weatherData = weatherData;
                this.setState({
                    weatherData: weatherData,
                    getWeather: true
                });
                callback({ message: "success" });
            })
            .catch(err => {
                callback({ message: "error" });
            });
    }

    getAqi(callback) {
        var key =
            Platform.OS == "ios"
                ? "da8986c14bb24a9389c545501a54a588"
                : "8fd99ea8b58746cbb5ac6cea16ca2b09";
        fetch(
            "https://free-api.heweather.net/s6/air/now?location=" +
                Global.settings.weather.city +
                "&key=" +
                key,
            {
                method: "GET"
            }
        )
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.HeWeather6[0].status != "ok") {
                    callback({ message: "error" });
                    return;
                }
                var aqiData = {};
                aqiData.aqi = responseJson.HeWeather6[0].air_now_city.aqi;
                aqiData.qlty = responseJson.HeWeather6[0].air_now_city.qlty;
                Global.tips.aqiData = aqiData;
                this.setState({
                    aqiData: aqiData,
                    getAqi: true
                });
                callback({ message: "success" });
            })
            .catch(err => {
                callback({ message: "error" });
            });
    }

    render() {
        if (!this.state.getWeather && this.state.getAqi) {
            return (
                <View>
                    <Text style={styles.text}>{"玩命加载中 >.<"}</Text>
                </View>
            );
        } else
            return (
                <View>
                    {this.state.getWeather ? (
                        <View>
                            <Text style={[styles.subTitle]}>现在</Text>
                            <View>
                                <Text style={[styles.text]}>
                                    <Text
                                        style={{
                                            fontSize: 36,
                                            fontWeight: "300"
                                        }}
                                    >
                                        {this.state.weatherData.now.tmp}℃{" "}
                                    </Text>
                                    {this.state.weatherData.now.cond_txt}{" "}
                                    {this.state.weatherData.now.wind_dir}
                                    {this.state.weatherData.now.wind_sc}级
                                </Text>
                                <Text style={[styles.text]}>
                                    体感温度 {this.state.weatherData.now.fl}℃
                                </Text>
                            </View>
                        </View>
                    ) : null}
                    {this.state.getWeather ? (
                        <View>
                            <Text style={[styles.subTitle]}>明日</Text>
                            <View>
                                <Text style={[styles.text]}>
                                    白天{" "}
                                    {this.state.weatherData.tomorrow.cond_txt_d}{" "}
                                    夜间{" "}
                                    {this.state.weatherData.tomorrow.cond_txt_n}
                                </Text>
                                <Text style={[styles.text]}>
                                    {this.state.weatherData.tomorrow.tmp_min}℃ ~{" "}
                                    {this.state.weatherData.tomorrow.tmp_max}℃{" "}
                                    {this.state.weatherData.tomorrow.wind_dir}
                                    {this.state.weatherData.tomorrow.wind_sc}级
                                </Text>
                            </View>
                        </View>
                    ) : null}
                    {this.state.getAqi ? (
                        <View>
                            <Text style={[styles.subTitle]}>空气质量</Text>
                            <View>
                                <Text style={[styles.text]}>
                                    {this.state.aqiData.aqi}{" "}
                                    {this.state.aqiData.qlty}
                                </Text>
                            </View>
                        </View>
                    ) : null}
                    {this.state.getWeather ? (
                        <View>
                            <Text style={[styles.subTitle]}>温馨提示</Text>
                            <View>
                                <Text style={[styles.text]}>
                                    {this.state.weatherData.lifestyle.txt}
                                </Text>
                            </View>
                        </View>
                    ) : null}
                    <View
                        style={{
                            borderTopColor: "#eee",
                            borderTopWidth: 1,
                            marginTop: 20,
                            paddingTop: 10
                        }}
                    >
                        {this.state.getWeather ? (
                            <View>
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            paddingVertical: 0,
                                            textAlign: "right"
                                        }
                                    ]}
                                >
                                    上次更新时间：{" "}
                                    {new Date()
                                        .toISOString()
                                        .substring(5, 10) ==
                                    this.state.weatherData.update.substring(
                                        5,
                                        10
                                    )
                                        ? this.state.weatherData.update.substring(
                                              11,
                                              18
                                          )
                                        : this.state.weatherData.update
                                              .substring(5, 18)
                                              .replace("-", "月")
                                              .replace(" ", "日 ")}
                                </Text>
                            </View>
                        ) : null}
                        <View>
                            <Text
                                style={[
                                    styles.text,
                                    {
                                        fontSize: 16,
                                        textAlign: "right",
                                        paddingTop: 5
                                    }
                                ]}
                            >
                                {this.state.weatherData.location}
                                {"  "}
                                <TouchableWithoutFeedback
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            "WeatherSettings",
                                            { from: "Home" }
                                        )
                                    }
                                >
                                    <Text
                                        style={[
                                            styles.text,
                                            {
                                                fontSize: 14,
                                                color:
                                                    Global.settings.theme
                                                        .backgroundColor,
                                                textDecorationLine: "underline"
                                            }
                                        ]}
                                    >
                                        切换城市
                                    </Text>
                                </TouchableWithoutFeedback>
                            </Text>
                        </View>
                    </View>
                </View>
            );
    }
}

const styles = StyleSheet.create({
    subTitle: {
        color: "#555",
        paddingTop: 10,
        paddingBottom: 5,
        fontSize: 16
    },
    text: {
        color: "#888",
        paddingVertical: 1,
        paddingHorizontal: 15
    }
});
