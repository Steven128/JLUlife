import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    ToastAndroid,
    Platform
} from "react-native";
import Global from "../Global";
import { readMessage } from "../FetchInterface/MessageInterface";
import Toast from "react-native-easy-toast";

export default class MessageItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageId: ""
        };
    }
    componentDidMount() {
        this.setState({
            messageId: this.props.messageId
        });
    }

    changeToRead() {
        readMessage(this.state.messageId, res => {
            if (res.message == "success") {
                if (Platform.OS === "ios") {
                    if (this.refs.toast != undefined)
                        this.refs.toast.show("标为已读", 2000);
                } else {
                    ToastAndroid.show("标为已读", ToastAndroid.SHORT);
                }

                this.props.refreshList();
            } else {
                if (Platform.OS === "ios") {
                    if (this.refs.toast != undefined)
                        this.refs.toast.show("网络开小差啦~", 2000);
                } else {
                    ToastAndroid.show("网络开小差啦~", ToastAndroid.SHORT);
                }
            }
        });
    }

    render() {
        var date = this.props.message.dateCreate;
        var containerStyle = {
            paddingTop: 5,
            flexDirection: "row",
            borderBottomWidth: 0,
            borderBottomColor: "#eee",
            paddingBottom: 10
        };
        if (!this.props.isFooter) {
            containerStyle.borderBottomWidth = 1;
        }
        return (
            <View styles={{}}>
                <Toast ref="toast" />
                <Text style={[styles.text, { paddingTop: 10 }]}>
                    {this.props.message.body}
                </Text>
                <View style={containerStyle}>
                    <Text style={[styles.text, { flex: 1 }]}>
                        {date.substring(0, 4)}年{date.substring(5, 7)}月
                        {date.substring(8, 10)}日
                    </Text>
                    <TouchableWithoutFeedback
                        onPress={this.changeToRead.bind(this)}
                    >
                        <Text
                            style={[
                                styles.text,
                                {
                                    flex: 1,
                                    textAlign: "right",
                                    textDecorationLine: "underline",
                                    color: Global.settings.theme.backgroundColor
                                }
                            ]}
                        >
                            标为已读
                        </Text>
                    </TouchableWithoutFeedback>
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
        color: "#808080",
        paddingVertical: 1,
        paddingHorizontal: 15
    }
});
