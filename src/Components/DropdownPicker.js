import React, { Component } from "react";
import {
    Text,
    View,
    TextInput,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform
} from "react-native";
import Global from "../Global";
const { width, height } = Dimensions.get("window");
export default class DropDownPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ""
        };
    }

    getValue() {
        return this.state.value;
    }

    handleValueChange(value) {
        this.setState({
            value: value
        });
        this.props.changeLocation(value);
    }

    selectItem(index) {
        this.props.selectItem(index);
        this.setState({ value: this.props.cityList[index].location });
    }

    render() {
        return (
            <View>
                <View style={{ padding: 7.5, paddingBottom: 0 }}>
                    <TextInput
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: 3,
                            borderColor: Global.settings.theme.backgroundColor,
                            borderWidth: 1,
                            height: 45
                        }}
                        value={this.state.value}
                        onChangeText={this.handleValueChange.bind(this)}
                        autoFocus
                    />
                </View>
                <View style={{ paddingHorizontal: 7.5, borderRadius: 3 }}>
                    <FlatList
                        keyboardShouldPersistTaps="always"
                        style={{
                            maxHeight: height / 2,
                            borderColor: "#eeeeee",
                            borderWidth: 1,
                            position: "absolute",
                            width: width - 15,
                            marginHorizontal: 7.5,
                            zIndex: 100
                        }}
                        data={this.props.cityList}
                        renderItem={({ item }) => (
                            <PickerItem
                                index={item.index}
                                cid={item.cid}
                                location={item.location}
                                admin_area={item.admin_area}
                                selectItem={this.selectItem.bind(this)}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        );
    }
}

class PickerItem extends Component {
    render() {
        return Platform.OS == "ios" ? (
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                    this.props.selectItem(this.props.index);
                }}
            >
                <View
                    style={{
                        backgroundColor: "#ffffff",
                        paddingVertical: 15,
                        paddingHorizontal: 30
                    }}
                >
                    <Text style={{ color: "#6a6a6a", lineHeight: 18 }}>
                        {this.props.location} - {this.props.admin_area}
                    </Text>
                </View>
            </TouchableOpacity>
        ) : (
            <TouchableNativeFeedback
                onPress={() => {
                    this.props.selectItem(this.props.index);
                }}
            >
                <View
                    style={{
                        backgroundColor: "#ffffff",
                        paddingVertical: 15,
                        paddingHorizontal: 30
                    }}
                >
                    <Text style={{ color: "#6a6a6a", lineHeight: 18 }}>
                        {this.props.location} - {this.props.admin_area}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {}
});
