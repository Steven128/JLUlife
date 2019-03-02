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

export default class ClassPicker extends BaseDialog {
    static defaultProps = {
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        selectedIndex: 0,

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
            classBegin: 1,
            classEnd: 1
        };
    }

    getClassList() {}

    _getContentPosition() {
        return { justifyContent: "flex-end", alignItems: "center" };
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
                    title="从第    节"
                    list={this.props.list}
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    onPickerSelected={toValue => {
                        this.setState({
                            classBegin: (toValue)
                        });
                        if (toValue > this.state.classEnd) {
                            this.setState({
                                classEnd: parseInt(toValue)
                            });
                        }
                        this.props.selectedIndex = toValue;
                    }}
                    selectedIndex={this.state.classBegin - 1}
                    fontSize={this.getSize(14)}
                    itemWidth={this.mScreenWidth / 2}
                    itemHeight={this.getSize(40)}
                />
                <PickerView
                    title="到第    节"
                    list={this.props.list}
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    onPickerSelected={toValue => {
                        this.setState({
                            classEnd: parseInt(toValue)
                        });
                        if (toValue < this.state.classBegin) {
                            this.setState({
                                classBegin: parseInt(toValue)
                            });
                        }
                        this.props.selectedIndex = toValue;
                    }}
                    selectedIndex={this.state.classEnd - 1}
                    fontSize={this.getSize(14)}
                    itemWidth={this.mScreenWidth / 2}
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
