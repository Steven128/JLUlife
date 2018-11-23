import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Global from "./Global";
import AppStorage from "../src/AppStorage";

var classJson = [];

export default class GetMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            getMessage: false,
            messageList: []
        };
    }
    componentDidMount() {
        let url = "http:/10.60.65.8/ntms/siteMessages/get-message-in-box.do";
        fetch(url, {
            method: "POST",
            headers: {
                Accept:
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "zh-CN,zh;q=0.9",
                "Cache-Control": "max-age=0",
                Connection: "keep-alive",
                "Content-Type": "application/json",
                Cookie:
                    "loginPage=userLogin.jsp; pwdStrength=1; alu=" +
                    Global.loginInfo.j_username +
                    "; " +
                    Global.cookie,
                Host: "10.60.65.8",
                Origin: "http://10.60.65.8",
                Referer: "http://10.60.65.8/ntms/userLogin.jsp?reason=nologin"
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(responseJson => {
                responseJson = responseJson.items;
                this.setState({
                    messageList: responseJson,
                    getMessage: true
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        var items = [];
        if (this.state.getMessage) {
            for (var i = 0; i < this.state.messageList.length; i++) {
                var date = this.state.messageList[i].message.dateCreate;
                var single = (
                    <View
                        styles={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ccc"
                        }}
                    >
                        <Text style={styles.text}>
                            {this.state.messageList[i].message.body}
                        </Text>
                        <View style={{ paddingTop: 5, flexDirection: "row" }}>
                            <Text style={styles.text}>
                                {date.substring(0, 4)}年{date.substring(5, 7)}月
                                {date.substring(8, 10)}日
                            </Text>
                            <Text style={[styles.text, { textAlign: "right" }]}>
                                {this.state.messageList[i].hasReaded == "Y"
                                    ? "已读"
                                    : "未读"}
                            </Text>
                        </View>
                    </View>
                );
                items.push(single);
            }
        }
        return this.state.getMessage ? (
            <View>
                <Text
                    style={{
                        color: "#555",
                        fontSize: 18,
                        paddingBottom: 15
                    }}
                >
                    消息通知
                </Text>
                <View>{items}</View>
            </View>
        ) : (
            <View>
                <Text
                    style={{
                        color: "#555",
                        fontSize: 18,
                        paddingBottom: 15
                    }}
                >
                    消息通知
                </Text>
                <View>
                    <Text style={styles.text}>消息加载中...</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    subTitle: {
        color: "#555",
        paddingVertical: 5,
        fontSize: 16
    },
    text: {
        color: "#888",
        paddingVertical: 1,
        paddingHorizontal: 15
    }
});
