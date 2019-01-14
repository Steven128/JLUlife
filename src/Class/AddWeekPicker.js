import React, { Component } from "react";

import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Platform,
    Dimensions,
    PixelRatio
} from "react-native";

import { BaseDialog, PickerView } from "react-native-pickers";
import Global from "../Global";

export default class AddWeekPicker extends BaseDialog {
    static defaultProps = {
        optionList: ["全周", "单周", "双周"],
        option: "全周",
        optionIndex: 0,
        weekBegin: 1,
        weekEnd: 21,

        removeSubviews: false,
        itemTextColor: 0x333333ff,
        itemSelectedColor: 0x1097d5ff,
        onPickerCancel: null,
        onPickerConfirm: null,

        confirmText: "确定",
        confirmTextSize: 14,
        confirmTextColor: "#333333",

        cancelText: "取消",
        cancelTextSize: 14,
        cancelTextColor: "#333333",

        itemHeight: 40
    };

    constructor(props) {
        super(props);
        this.state = {
            weekList: [],
            option: "全周",
            optionIndex: 0,
            weekBegin: 1,
            weekEnd: 21
        };
    }

    componentWillMount() {
        var weekList = [];
        for (var i = 1; i <= Global.weekLength; i++) {
            weekList.push(i);
        }
        this.setState({
            weekList: weekList,
            option: this.props.option,
            optionIndex: this.props.optionIndex,
            weekBegin: this.props.weekBegin,
            weekEnd: this.props.weekEnd
        });
    }

    _getContentPosition() {
        return { justifyContent: "flex-end", alignItems: "center" };
    }

    getOptionIndex(value) {
        for (var i in this.props.optionList) {
            if (value == this.props.optionList[i]) {
                return i;
            }
        }
        return -1;
    }

    renderContent() {
        return (
            <View
                style={{
                    width: this.mScreenWidth,
                    flexDirection: "row"
                }}
            >
                <PickerView
                    title=""
                    list={this.props.optionList}
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    onPickerSelected={toValue => {
                        this.setState({
                            option: toValue,
                            optionndex: this.getOptionIndex(toValue)
                        });
                    }}
                    selectedIndex={this.state.optionIndex}
                    fontSize={this.getSize(14)}
                    itemWidth={this.mScreenWidth / 3}
                    itemHeight={this.getSize(40)}
                />
                <PickerView
                    title="从第    周"
                    list={this.state.weekList}
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    onPickerSelected={toValue => {
                        this.setState({
                            weekBegin: toValue
                        });
                        if (toValue > this.state.weekEnd) {
                            this.setState({
                                weekEnd: toValue
                            });
                        }
                    }}
                    selectedIndex={this.state.weekBegin - 1}
                    fontSize={this.getSize(14)}
                    itemWidth={this.mScreenWidth / 3}
                    itemHeight={this.getSize(40)}
                />
                <PickerView
                    title="到第    周"
                    list={this.state.weekList}
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    onPickerSelected={toValue => {
                        this.setState({
                            weekEnd: toValue
                        });
                        if (toValue < this.state.weekBegin) {
                            this.setState({
                                weekBegin: toValue
                            });
                        }
                    }}
                    selectedIndex={this.state.weekEnd - 1}
                    fontSize={this.getSize(14)}
                    itemWidth={this.mScreenWidth / 3}
                    itemHeight={this.getSize(40)}
                />

                <View
                    style={{
                        width: this.mScreenWidth,
                        height: this.getSize(44),
                        backgroundColor: "#ffffff",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        position: "absolute",
                        top: 0
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => {
                            this.dismiss(
                                () =>
                                    this.props.onPickerCancel &&
                                    this.props.onPickerCancel({
                                        begin: this.state.classBegin,
                                        end: this.state.classEnd
                                    })
                            );
                        }}
                        style={{
                            width: this.getSize(60),
                            height: this.getSize(44),
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: this.props.cancelTextSize,
                                fontWeight: "400",
                                color: this.props.cancelTextColor
                            }}
                        >
                            {this.props.cancelText}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => {
                            this.dismiss(
                                () =>
                                    this.props.onPickerConfirm &&
                                    this.props.onPickerConfirm({
                                        option: this.state.option,
                                        begin: this.state.weekBegin,
                                        end: this.state.weekEnd
                                    })
                            );
                        }}
                        style={{
                            width: this.getSize(60),
                            height: this.getSize(44),
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: this.props.confirmTextSize,
                                fontWeight: "400",
                                color: this.props.confirmTextColor
                            }}
                        >
                            {this.props.confirmText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
