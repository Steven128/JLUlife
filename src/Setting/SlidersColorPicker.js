import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Platform,
    TouchableOpacity,
    StatusBar,
    ScrollView
} from "react-native";
import PropTypes from "prop-types";
import tinycolor from "tinycolor2";
import {
    HueSlider,
    SaturationSlider,
    LightnessSlider
} from "react-native-color";
import Global from "../Global";
const modes = {
    hex: {
        getString: color => tinycolor(color).toHexString(),
        label: "HEX"
    },
    hsl: {
        getString: color => tinycolor(color).toHslString(),
        label: "HSL"
    },
    hsv: {
        getString: color => tinycolor(color).toHsvString(),
        label: "HSV"
    },
    rgb: {
        getString: color => tinycolor(color).toRgbString(),
        label: "RGB"
    }
};

export class SlidersColorPicker extends Component {
    constructor(props) {
        super(props);
        const color = tinycolor(this.props.color).toHsl();
        const mode = tinycolor(this.props.mode).toHsl();
        this.state = {
            color,
            mode: "hex"
        };
    }

    updateHue = h => this.setState({ color: { ...this.state.color, h } });
    updateSaturation = s =>
        this.setState({ color: { ...this.state.color, s } });
    updateLightness = l => this.setState({ color: { ...this.state.color, l } });

    render() {
        const {
            visible,
            onOk,
            onCancel,
            okLabel,
            cancelLabel,
            colorMode
        } = this.props;
        const colorHex = tinycolor(this.state.color).toHexString();
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={onCancel}
                presentationStyle="formSheet"
            >
                <StatusBar
                    backgroundColor={Global.settings.theme.backgroundColor}
                    barStyle="light-content"
                    translucent={false}
                />
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                activeOpacity={0.75}
                                onPress={onCancel}
                            >
                                <Text style={styles.headerButton}>
                                    {cancelLabel}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.75}
                                onPress={() =>
                                    onOk(
                                        modes[this.props.returnMode].getString(
                                            this.state.color
                                        )
                                    )
                                }
                            >
                                <Text
                                    style={[
                                        styles.headerButton,
                                        {
                                            color: modes[
                                                this.props.returnMode
                                            ].getString(this.state.color)
                                        }
                                    ]}
                                >
                                    {okLabel}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.content}>
                            <View
                                style={{
                                    alignItems: "center",
                                    paddingVertical: 30
                                }}
                            >
                                <View
                                    style={[
                                        styles.colorPreview,
                                        { backgroundColor: colorHex }
                                    ]}
                                />
                            </View>
                            <View
                                style={{
                                    paddingHorizontal: 30,
                                    paddingVertical: 15
                                }}
                            >
                                <Text
                                    style={{
                                        lineHeight: 18
                                    }}
                                >
                                    温馨提示：
                                    为了保护视力，强烈建议不要使用亮瞎眼的主题色哦~
                                </Text>
                            </View>
                            <View style={styles.sliders}>
                                <HueSlider
                                    style={styles.sliderRow}
                                    gradientSteps={500}
                                    value={this.state.color.h}
                                    onValueChange={this.updateHue}
                                />
                                <SaturationSlider
                                    style={styles.sliderRow}
                                    gradientSteps={500}
                                    value={this.state.color.s}
                                    color={this.state.color}
                                    onValueChange={this.updateSaturation}
                                />
                                <LightnessSlider
                                    style={styles.sliderRow}
                                    gradientSteps={500}
                                    value={this.state.color.l}
                                    color={this.state.color}
                                    onValueChange={this.updateLightness}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        );
    }
}

export default SlidersColorPicker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "stretch",
        justifyContent: "center",
        marginTop: Platform.OS === "ios" ? 20 : 0
    },
    header: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        marginHorizontal: 16
    },
    // TODO: Bigger touch area
    headerButton: {
        lineHeight: 22,
        fontSize: 17,
        lineHeight: 21,
        ...Platform.select({
            android: {
                fontFamily: "sans-serif-medium"
            },
            ios: {
                fontWeight: "600",
                letterSpacing: -0.41
            }
        })
    },
    content: {
        flex: 1,
        marginHorizontal: 16
    },
    lightText: {
        lineHeight: 22,
        fontSize: 17,
        color: "#ffffff",
        ...Platform.select({
            android: {
                fontFamily: "sans-serif-medium"
            },
            ios: {
                fontWeight: "600",
                letterSpacing: -0.41
            }
        })
    },
    darkText: {
        lineHeight: 22,
        fontSize: 17,
        marginTop: 6,
        ...Platform.select({
            android: {
                fontFamily: "sans-serif-medium"
            },
            ios: {
                fontWeight: "600",
                letterSpacing: -0.41
            }
        })
    },
    colorPreview: {
        height: 100,
        width: 100,
        borderRadius: 50,
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    modesRow: {
        marginTop: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    mode: {
        paddingHorizontal: 6,
        paddingVertical: 1,
        marginRight: 16
    },
    modeActive: {
        backgroundColor: "black",
        borderRadius: 3
    },
    modeText: {
        lineHeight: 18,
        fontSize: 13,
        ...Platform.select({
            android: {
                fontFamily: "sans-serif"
            },
            ios: {
                fontWeight: "400",
                letterSpacing: -0.08
            }
        })
    },
    modeTextActive: {
        color: "#ffffff"
    },
    sliders: {
        marginTop: 16
    },
    sliderRow: {
        marginTop: 16
    },
    colorString: {
        marginTop: 32,
        borderBottomWidth: 2,
        borderColor: "#DDDDDD"
    },
    colorStringText: {
        lineHeight: 24,
        fontSize: 20,
        ...Platform.select({
            android: {
                fontFamily: "monospace"
            },
            ios: {
                fontFamily: "Courier New",
                fontWeight: "600",
                letterSpacing: 0.75
            }
        })
    }
});

SlidersColorPicker.propTypes = {
    visible: PropTypes.bool.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    okLabel: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    value: PropTypes.string
};

SlidersColorPicker.defaultProps = {
    okLabel: "Ok",
    cancelLabel: "Cancel",
    value: "#2089dc"
};
