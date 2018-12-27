import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Global from "../Global";

export default class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            getWeatherInfo: false,
            weatherInfo: {},
            getTomorrowWeather: false,
            tomorrowWeather: {},
            getLunarCalendar: false,
            lunarCalendar: "",
            getAqi: false,
            aqi: {}
        };
    }
    componentWillMount() {
        console.log("componentWillMount");
        if (Global.tips.weatherInfo == undefined) {
            console.log("getting weatherInfo");
            //获取今日天气
            let url = "http://api.help.bj.cn/apis/weather?id=101060101";
            fetch(url, {
                method: "GET"
            })
                .then(response => response.text())
                .then(responseJson => {
                    if (responseJson.status == 0) {
                        responseJson = responseJson.replace(/\r/g, "");
                        responseJson = responseJson.replace(/\n/g, "");
                        responseJson = JSON.parse(responseJson);
                        Global.tips.weatherInfo = responseJson;
                        this.setState({ getWeatherInfo: true });
                        console.log(Global.tips.weatherInfo);
                    }
                });
        } else {
            this.setState({
                weatherInfo: Global.tips.weatherInfo,
                getWeatherInfo: true
            });
        }
        if (Global.tips.tomorrowWeather == undefined) {
            console.log("getting tomorrowWeather");
            //获取明日天气
            url = "http://api.help.bj.cn/apis/weather2d?id=长春";
            fetch(url, {
                method: "GET"
            })
                .then(response => response.text())
                .then(responseJson => {
                    if (responseJson.status == 0) {
                        responseJson = responseJson.replace(/\r/g, "");
                        responseJson = responseJson.replace(/\n/g, "");
                        responseJson = JSON.parse(responseJson);
                        Global.tips.tomorrowWeather = responseJson.tomorrow;
                        this.setState({ getTomorrowWeather: true });
                        console.log(Global.tips.tomorrowWeather);
                    }
                });
        } else {
            this.setState({
                tomorrowWeather: Global.tips.tomorrowWeather,
                getTomorrowWeather: true
            });
        }
        if (Global.tips.lunarCalendar != undefined) {
            console.log("getting lunarCalendar");
            //获取农历
            url =
                "http://api.help.bj.cn/apis/nongli/?id=101060101&now=" +
                encodeURIComponent(new Date().toJSON);
            fetch(url, {
                method: "GET"
            })
                .then(response => response.text())
                .then(responseJson => {
                    if (responseJson.status == 0) {
                        responseJson = responseJson.replace(/\r/g, "");
                        responseJson = responseJson.replace(/\n/g, "");
                        responseJson = JSON.parse(responseJson);
                        Global.tips.lunarCalendar =
                            responseJson.data[16].val +
                            responseJson.data[21].val;
                        this.setState({ getLunarCalendar: true });
                        console.log(Global.tips.lunarCalendar);
                    }
                });
        } else {
            this.setState({
                lunarCalendar: Global.tips.lunarCalendar,
                getLunarCalendar: true
            });
        }
        if (Global.tips.aqi == undefined) {
            console.log("getting aqi");
            //获取空气质量
            url = "http://api.help.bj.cn/apis/aqi2?id=101060101";
            fetch(url, {
                method: "GET"
            })
                .then(response => response.text())
                .then(responseJson => {
                    if (responseJson.status == 0) {
                        responseJson = responseJson.replace(/\r/g, "");
                        responseJson = responseJson.replace(/\n/g, "");
                        responseJson = JSON.parse(responseJson);
                        Global.tips.aqi = responseJson;
                        this.setState({ getAqi: true });
                        console.log(Global.tips.aqi);
                    }
                })
                .catch(error => {
                    if (__DEV__) console.error(error);
                });
        } else {
            this.setState({
                aqi: Global.tips.aqi,
                getAqi: true
            });
        }
    }

    render() {
        var year = new Date().toJSON().substring(0, 4);
        var month = new Date().toJSON().substring(5, 7);
        var day = new Date().toJSON().substring(8, 10);
        var weekDay = "日一二三四五六".charAt(new Date().getDay());
        return this.state.getWeatherInfo &&
            this.state.getTomorrowWeather &&
            this.state.getLunarCalendar &&
            this.state.getAqi ? (
            <View>
                <View>
                    <Text style={[styles.text]}>
                        今天是{year}年{month}月{day}日 星期{weekDay}
                    </Text>
                    <Text style={[styles.text]}>
                        农历 {this.state.lunarCalendar}
                    </Text>
                </View>
                <Text style={[styles.subTitle]}>天气</Text>
                <View>
                    <Text style={[styles.text]}>
                        <Text style={{ fontSize: 36, fontWeight: "300" }}>
                            {Global.tips.weatherInfo.temp == undefined
                                ? null
                                : Global.tips.weatherInfo.temp}
                            ℃{" "}
                        </Text>
                        {Global.tips.weatherInfo.weather == undefined
                            ? null
                            : Global.tips.weatherInfo.weather}{" "}
                        {Global.tips.weatherInfo.wd == undefined
                            ? null
                            : Global.tips.weatherInfo.wd}
                        {Global.tips.weatherInfo.wdforce == undefined
                            ? null
                            : Global.tips.weatherInfo.wdforce}
                    </Text>
                </View>
                <Text style={[styles.subTitle]}>明日</Text>
                <View>
                    <Text style={[styles.text]}>
                        {Global.tips.tomorrowWeather.weather == undefined
                            ? null
                            : Global.tips.tomorrowWeather.weather}{" "}
                        {Global.tips.tomorrowWeather.temp == undefined
                            ? null
                            : Global.tips.tomorrowWeather.temp}{" "}
                        {Global.tips.tomorrowWeather.wind == undefined
                            ? null
                            : Global.tips.tomorrowWeather.wind}
                    </Text>
                </View>
                <Text style={[styles.subTitle]}>空气</Text>
                <View>
                    <Text style={[styles.text]}>
                        {Global.tips.aqi.val == undefined
                            ? null
                            : Global.tips.aqi.val}{" "}
                        {Global.tips.aqi.lev == undefined
                            ? null
                            : Global.tips.aqi.lev}
                    </Text>
                    <Text style={[styles.text]}>
                        {Global.tips.aqi.advc == undefined
                            ? null
                            : Global.tips.aqi.advc}
                    </Text>
                </View>
            </View>
        ) : (
            <Text
                style={{
                    color: "#888",
                    paddingLeft: 15
                }}
            >
                {"玩命加载中 >.<"}
            </Text>
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
