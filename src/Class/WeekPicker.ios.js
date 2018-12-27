import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Dimensions,
    Animated,
    Easing
} from "react-native";
import Global from "../Global";

const { width, height } = Dimensions.get("window");

export default class WeekPickerIOS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekList: [],
            currentWeek: 0,
            pickerOpen: false,
            pickerHeight: new Animated.Value(0)
        };
    }

    componentWillMount() {
        var weekList = [];
        for (var i = 0; i < Global.weekLength; i++) {
            weekList.push(i + 1);
        }
        this.setState({
            weekList: weekList,
            currentWeek: this.props.currentWeek
        });
    }

    handlePickerOpen() {
        this.refs.flatList.scrollToIndex({
            index: this.state.currentWeek - 1,
            viewPosition: 0.5
        });
        if (this.state.pickerOpen) {
            this.setState({ pickerOpen: false });
            Animated.timing(this.state.pickerHeight, {
                toValue: 0,
                duration: 300,
                easing: Easing.linear
            }).start();
        } else {
            this.setState({ pickerOpen: true });
            Animated.timing(this.state.pickerHeight, {
                toValue: 60,
                duration: 300,
                easing: Easing.linear
            }).start();
        }
    }

    changeWeek(week) {
        this.props.changeWeek(week);
        this.refs.flatList.scrollToIndex({
            index: week - 1,
            viewPosition: 0.5
        });
        this.setState({ pickerOpen: false, currentWeek: week });
        Animated.timing(this.state.pickerHeight, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear
        }).start();
    }

    closePicker() {
        if (this.state.pickerOpen) {
            this.setState({ pickerOpen: false });
            Animated.timing(this.state.pickerHeight, {
                toValue: 0,
                duration: 300,
                easing: Easing.linear
            }).start();
        }
    }

    isPickerOpen() {
        alert(this.state.pickerOpen);
        return this.state.pickerOpen;
    }

    render() {
        return (
            <Animated.View
                style={{
                    height: this.state.pickerHeight,
                    borderBottomWidth: 1,
                    borderBottomColor: Global.settings.theme.backgroundColor
                }}
            >
                {this.state.weekList.length == 0 ? null : (
                    <FlatList
                        style={{ flex: 1 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        indicatorStyle="white"
                        data={this.state.weekList}
                        renderItem={item => (
                            <TouchableOpacity
                                onPress={this.changeWeek.bind(this, item.item)}
                                key={item.item}
                            >
                                <View style={styles.weekWrap}>
                                    <Text
                                        style={[
                                            styles.weekText,
                                            {
                                                color:
                                                    Global.settings.theme
                                                        .backgroundColor
                                            }
                                        ]}
                                    >
                                        第{item.item}周
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        ref="flatList"
                    />
                )}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    weekWrap: {
        height: 60,
        width: 100,
        paddingHorizontal: 20,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlignVertical: "center"
    },
    weekText: {
        fontSize: 16
    }
});
