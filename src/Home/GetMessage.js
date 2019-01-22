import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    FlatList,
    ToastAndroid
} from "react-native";
import Global from "../Global";
import AppStorage from "../AppStorage";
import { getMessage } from "../FetchInterface/MessageInterface";
import MessageItem from "./MessageItem";
import Toast from "react-native-easy-toast";

export default class GetMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            getMessage: false,
            messageList: []
        };
    }
    componentDidMount() {
        getMessage(res => {
            if (res.message == "success") {
                this.setState({
                    messageList: res.content,
                    getMessage: true
                });
            }
        });
    }

    refreshList() {
        this.setState({
            messageList: [],
            getMessage: false
        });
        getMessage(res => {
            if (res.message == "success") {
                this.setState({
                    messageList: res.content,
                    getMessage: true
                });
            } else {
                this.props.handleOffline();
            }
        });
    }
    render() {
        return this.state.getMessage ? (
            <View>
                <Toast ref="toast" />
                <Text
                    style={{
                        color: "#555",
                        fontSize: 18,
                        paddingBottom: 15
                    }}
                >
                    消息通知
                </Text>
                {this.state.messageList.length == 0 ? (
                    <View>
                        <Text style={styles.text}>
                            并没有什么通知┐(￣ー￣)┌
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={this.state.messageList.slice(
                            0,
                            this.state.messageList.length - 1
                        )}
                        renderItem={({ item }) => (
                            <MessageItem
                                messageId={item.msgInboxId}
                                message={item.message}
                                isFooter={false}
                                refreshList={this.refreshList.bind(this)}
                            />
                        )}
                        ListFooterComponent={
                            <MessageItem
                                messageId={
                                    this.state.messageList[
                                        this.state.messageList.length - 1
                                    ].msgInboxId
                                }
                                message={
                                    this.state.messageList[
                                        this.state.messageList.length - 1
                                    ].message
                                }
                                isFooter={true}
                                refreshList={this.refreshList.bind(this)}
                            />
                        }
                    />
                )}
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
                    <Text style={styles.text}>消息加载中 (・｀ω´・)</Text>
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
