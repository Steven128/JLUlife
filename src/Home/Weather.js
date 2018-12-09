import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Global from "../Global";

export default class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {}

    render() {
        var year = new Date().toJSON().substring(0, 4);
        var month = new Date().toJSON().substring(5, 7);
        var day = new Date().toJSON().substring(8, 10);
        var weekDay = "日一二三四五六".charAt(new Date().getDay());
        return (
            <View>
                <View>
                    <Text style={[styles.text]}>
                        今天是{year}年{month}月{day}日 星期{weekDay}
                    </Text>
                    <Text style={[styles.text]}>
                        农历 {Global.tips.lunarCalendar}
                    </Text>
                </View>
                <Text style={[styles.subTitle]}>天气</Text>
                <View>
                    <Text style={[styles.text]}>
                        <Text style={{ fontSize: 36, fontWeight: "300" }}>
                            {Global.tips.weatherInfo.temp}℃{" "}
                        </Text>
                        {Global.tips.weatherInfo.weather}{" "}
                        {Global.tips.weatherInfo.wd}
                        {Global.tips.weatherInfo.wdforce}
                    </Text>
                </View>
                <Text style={[styles.subTitle]}>明日</Text>
                <View>
                    <Text style={[styles.text]}>
                        {Global.tips.tomorrowWeather.weather}{" "}
                        {Global.tips.tomorrowWeather.temp}{" "}
                        {Global.tips.tomorrowWeather.wind}
                    </Text>
                </View>
                <Text style={[styles.subTitle]}>空气</Text>
                <View>
                    <Text style={[styles.text]}>
                        {Global.tips.aqi.val} {Global.tips.aqi.lev}
                    </Text>
                    <Text style={[styles.text]}>{Global.tips.aqi.advc}</Text>
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
