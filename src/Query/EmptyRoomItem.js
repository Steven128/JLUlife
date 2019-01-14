import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
    StyleSheet
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../Global";
import EmptyRoomPicker from "./EmptyRoomPicker";

const { width, height } = Dimensions.get("window");

export default class EmptyRoomItem extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", list: [] };
    }
    componentDidMount() {
        var list = [];
        for (var i in this.props.list) {
            list.push(this.props.list[i].name);
        }
        this.setState({ title: list[0], list: list });
    }

    renderButton(text, callback) {
        return (
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={callback.bind(this)}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "#888",
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 4,
                    marginBottom: 20
                }}
            >
                <Text>{text}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <View
                    style={{
                        flex: 1
                    }}
                >
                    {this.renderButton(this.props.title, () => {
                        this.EmptyRoomPicker.show();
                    })}
                    <EmptyRoomPicker
                        list={this.state.list}
                        ref={ref => (this.EmptyRoomPicker = ref)}
                        onPickerCancel={() => {}}
                        onPickerConfirm={value => {
                            this.setState({ title: value });
                        }}
                        itemHeight={50}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({});
