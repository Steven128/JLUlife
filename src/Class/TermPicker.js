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

export default class TermPicker extends BaseDialog {
    static defaultProps = {
        index: 0,

        removeSubviews: false,
        itemTextColor: 0x333333ff,
        itemSelectedColor: 0x1097d5ff,
        onPickerCancel: null,
        onPickerConfirm: null,

        confirmText: "确定",
        confirmTextSize: 14,
        confirmTextColor: Global.settings.theme.backgroundColor,

        cancelText: "取消",
        cancelTextSize: 14,
        cancelTextColor: "#333333",

        itemHeight: 40
    };

    constructor(props) {
        super(props);
        this.state = {
            currentTermId: Global.settings.class.currentTermId,
            index: parseInt(this.props.selectedIndex),
            termList: []
        };
    }

    componentWillMount() {
        var termList = [];
        for (var i in Global.terms) {
            termList.push(Global.terms[i].termName);
        }
        this.setState({ termList: termList });
    }

    _getContentPosition() {
        return { justifyContent: "flex-end", alignItems: "center" };
    }

    getIndex(value) {
        for (var i in this.state.termList) {
            if (value == this.state.termList[i]) {
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
                    list={this.state.termList}
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    onPickerSelected={toValue => {
                        this.setState({
                            index: this.getIndex(toValue)
                        });
                    }}
                    selectedIndex={this.state.index}
                    fontSize={this.getSize(14)}
                    itemWidth={this.mScreenWidth}
                    itemHeight={this.getSize(40)}
                    ref="picker"
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
                                        index: this.state.index
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
                                        index: this.state.index
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
