import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TextInput,
    Alert
} from "react-native";
import Dialog, {
    ScaleAnimation,
    DialogTitle,
    DialogButton,
    DialogContent
} from "react-native-popup-dialog";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import Global from "../../Global";
import CheckBox from "react-native-check-box";
import { evalWithAnswer } from "../../FetchInterface/EvaluationInterface";
import Toast from "react-native-easy-toast";

const { width, height } = Dimensions.get("window");

export default class EvaluationItemIOS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertVisible: false,
            alertText: "",
            evalItemId: "",
            dialogVisible: false,
            submitTapped: false,
            prob11: {
                index: 0,
                value: "A"
            },
            prob12: {
                index: 0,
                value: "A"
            },
            prob13: {
                index: 1,
                value: "N"
            },
            prob14: {
                index: 0,
                value: "A"
            },
            prob15: {
                index: 0,
                value: "A"
            },
            prob21: {
                index: 0,
                value: "A"
            },
            prob22: {
                index: 0,
                value: "A"
            },
            prob23: {
                index: 0,
                value: "A"
            },
            prob31: {
                index: 0,
                value: "A"
            },
            prob32: {
                index: 0,
                value: "A"
            },
            prob33: {
                index: 0,
                value: "A"
            },
            prob41: {
                index: 0,
                value: "A"
            },
            prob42: {
                index: 0,
                value: "A"
            },
            prob43: {
                index: 0,
                value: "A"
            },
            prob51: {
                index: 0,
                value: "A"
            },
            prob52: {
                index: 0,
                value: "A"
            },
            prob73: {
                index: 0,
                value: "Y"
            },
            sat6: {
                index: 0,
                value: "A"
            },
            mulsel71: {
                A: false,
                B: false,
                C: false,
                D: false,
                E: false,
                F: false,
                G: false,
                H: false,
                I: false,
                J: false,
                K: true
            },
            advice72: ""
        };
    }

    componentDidMount() {
        this.setState({
            evalItemId: this.props.evalItemId
        });
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                    this.props.hasEvaluated
                        ? null
                        : this.setState({ dialogVisible: true });
                    console.log(this.state.evalItemId);
                }}
            >
                <Toast ref="toast" />
                <View>
                    <View style={styles.container}>
                        <Text style={styles.title}>
                            {this.props.lessonName}
                        </Text>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                paddingBottom: 2
                            }}
                        >
                            <Text style={[styles.text, { flex: 1 }]}>
                                {this.props.teacherName}
                            </Text>
                            <Text style={[styles.text, { flex: 5 }]}>
                                {this.props.schoolName}
                            </Text>
                        </View>
                        {this.props.hasEvaluated ? (
                            <Text style={styles.text}>
                                {this.props.evalTime.replace("T", " ")}
                            </Text>
                        ) : null}
                        {this.props.hasEvaluated ? (
                            <Text style={styles.text}>
                                {this.props.evalTitle}
                            </Text>
                        ) : null}
                        <Text style={[styles.text, { paddingTop: 3 }]}>
                            {this.props.hasEvaluated ? "已完成" : "未完成"}
                        </Text>
                    </View>
                    <Dialog
                        visible={this.state.dialogVisible}
                        dialogTitle={
                            <DialogTitle
                                title={
                                    this.props.teacherName +
                                    " (" +
                                    this.props.schoolName +
                                    ")\n" +
                                    this.props.lessonName
                                }
                                align="left"
                                style={{
                                    backgroundColor: "#ffffff",
                                    borderBottomWidth: 0
                                }}
                                titleStyle={{
                                    fontSize: 14,
                                    color: "#6a6a6a",
                                    fontWeight: 500
                                }}
                            />
                        }
                        actions={[
                            <DialogButton
                                text="取消"
                                textStyle={{
                                    color: "#6a6a6a",
                                    fontSize: 14,
                                    fontWeight: "normal"
                                }}
                                onPress={() => {
                                    this.setState({ dialogVisible: false });
                                }}
                            />,
                            <DialogButton
                                text="提交"
                                textStyle={{
                                    color:
                                        Global.settings.theme.backgroundColor,
                                    fontSize: 14,
                                    fontWeight: "normal"
                                }}
                                disabled={this.state.submitTapped}
                                onPress={this.buttonTapped.bind(this)}
                            />
                        ]}
                        dialogAnimation={new ScaleAnimation()}
                        onTouchOutside={() => {
                            this.setState({ dialogVisible: false });
                        }}
                        width={0.9}
                        height={0.85}
                        containerStyle={styles.dialog}
                    >
                        <DialogContent style={{ flex: 1, paddingBottom: 0 }}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{
                                    height: height * 0.8 - 100
                                }}
                            >
                                <View style={styles.evalOuterWrap}>
                                    <Text style={styles.evalOuterTitle}>
                                        一、教师教学态度
                                    </Text>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            1.您感觉教师为授课做的准备工作是否充分？（可从教师备课、教案、多媒体课件、辅助教具、教学内容熟悉程度等方面综合考虑）
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob11.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob11: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    优
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    良
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    中
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    差
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            2.教师授课是否认真？是否引导学生树立正确的世界观、人生观和价值观？
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob12.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob12: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    优
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    良
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    中
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    差
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            3.是否有上课迟到、提前下课、缺课等情况?
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob13.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob13: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="Y"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    有
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="N"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    没有
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            4.是否严格要求学生，积极维持课堂纪律?
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob14.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob14: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    优
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    良
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    中
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    差
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            5.是否对作业、考核及学生提出的问题给予及时反馈？
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob15.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob15: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    优
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    良
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    中
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    差
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                </View>

                                <View style={styles.evalOuterWrap}>
                                    <Text style={styles.evalOuterTitle}>
                                        二、教师素质与能力
                                    </Text>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            1.教师语言表达是否清楚、流利?
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob21.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob21: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    优
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    良
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    中
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    差
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            2.教师讲课是否思路清晰、重点突出、层次分明?
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob22.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob22: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    优
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    良
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    中
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    差
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            3.您对该教师理论水平和教学能力的评价？
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob23.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob23: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    优
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    良
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    中
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    差
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                </View>

                                <View style={styles.evalOuterWrap}>
                                    <Text style={styles.evalOuterTitle}>
                                        三、教学内容
                                    </Text>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            1.教师是否明确讲述课程教学目标？
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob31.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob31: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    优
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    良
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    中
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    差
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            2.授课内容是否充实并与教学目标相对应，知识点及其之间的逻辑结构是否清晰？
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob32.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob32: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    优
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    良
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    中
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    差
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            3.授课内容是否结合实践，适当引入学科新知识、新成果？
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob33.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob33: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    优
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    良
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    中
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    差
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                </View>

                                <View style={styles.evalOuterWrap}>
                                    <Text style={styles.evalOuterTitle}>
                                        四、教学方法
                                    </Text>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            1.教师是否经常布置思考题及文献阅读，培养学生自主学习能力？
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob41.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob41: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    优
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    良
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    中
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    差
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            2.是否善于启发引导，与学生恰当互动，鼓励学生提问和质疑？
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob42.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob42: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    优
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    良
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    中
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    差
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            3.是否理论联系实际，注重学生能力的培养？
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob43.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob43: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    优
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    良
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    中
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    差
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                </View>

                                <View style={styles.evalOuterWrap}>
                                    <Text style={styles.evalOuterTitle}>
                                        五、教学效果
                                    </Text>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            1.讲课是否有吸引力，能激发学生学习兴趣？
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob51.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob51: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    优
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    良
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    中
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    差
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            2.通过该课程学习，您是否掌握了课程的主要知识和技能，达到教学目标？
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob52.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob52: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    优
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    良
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    中
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    差
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                </View>

                                <View style={styles.evalOuterWrap}>
                                    <Text style={styles.evalOuterTitle}>
                                        总评
                                    </Text>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            您对该教师的满意程度？
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            // style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.sat6.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    sat6: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="A"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    满意
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="B"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    基本满意
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="C"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    一般
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="D"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    不满意
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            您认为该教师在哪些方面存在问题或需要进一步提高？(可多选）
                                        </Text>
                                        <CheckBox
                                            style={{
                                                flex: 1,
                                                padding: 3
                                            }}
                                            checkBoxColor="#808080"
                                            checkedCheckBoxColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            onClick={() => {
                                                var newMulse171 = this.state
                                                    .mulsel71;
                                                newMulse171.A = !newMulse171.A;
                                                this.setState({
                                                    mulsel71: newMulse171
                                                });
                                            }}
                                            isChecked={this.state.mulsel71.A}
                                            rightText="教学态度"
                                        />
                                        <CheckBox
                                            style={{
                                                flex: 1,
                                                padding: 3
                                            }}
                                            checkBoxColor="#808080"
                                            checkedCheckBoxColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            onClick={() => {
                                                var newMulse171 = this.state
                                                    .mulsel71;
                                                newMulse171.B = !newMulse171.B;
                                                this.setState({
                                                    mulsel71: newMulse171
                                                });
                                            }}
                                            isChecked={this.state.mulsel71.B}
                                            rightText="照本宣科"
                                        />
                                        <CheckBox
                                            style={{
                                                flex: 1,
                                                padding: 3
                                            }}
                                            checkBoxColor="#808080"
                                            checkedCheckBoxColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            onClick={() => {
                                                var newMulse171 = this.state
                                                    .mulsel71;
                                                newMulse171.C = !newMulse171.C;
                                                this.setState({
                                                    mulsel71: newMulse171
                                                });
                                            }}
                                            isChecked={this.state.mulsel71.C}
                                            rightText="语言表达"
                                        />
                                        <CheckBox
                                            style={{
                                                flex: 1,
                                                padding: 3
                                            }}
                                            checkBoxColor="#808080"
                                            checkedCheckBoxColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            onClick={() => {
                                                var newMulse171 = this.state
                                                    .mulsel71;
                                                newMulse171.D = !newMulse171.D;
                                                this.setState({
                                                    mulsel71: newMulse171
                                                });
                                            }}
                                            isChecked={this.state.mulsel71.D}
                                            rightText="授课激情"
                                        />
                                        <CheckBox
                                            style={{
                                                flex: 1,
                                                padding: 3
                                            }}
                                            checkBoxColor="#808080"
                                            checkedCheckBoxColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            onClick={() => {
                                                var newMulse171 = this.state
                                                    .mulsel71;
                                                newMulse171.E = !newMulse171.E;
                                                this.setState({
                                                    mulsel71: newMulse171
                                                });
                                            }}
                                            isChecked={this.state.mulsel71.E}
                                            rightText="理论水平"
                                        />
                                        <CheckBox
                                            style={{
                                                flex: 1,
                                                padding: 3
                                            }}
                                            checkBoxColor="#808080"
                                            checkedCheckBoxColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            onClick={() => {
                                                var newMulse171 = this.state
                                                    .mulsel71;
                                                newMulse171.F = !newMulse171.F;
                                                this.setState({
                                                    mulsel71: newMulse171
                                                });
                                            }}
                                            isChecked={this.state.mulsel71.F}
                                            rightText="教学内容"
                                        />
                                        <CheckBox
                                            style={{
                                                flex: 1,
                                                padding: 3
                                            }}
                                            checkBoxColor="#808080"
                                            checkedCheckBoxColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            onClick={() => {
                                                var newMulse171 = this.state
                                                    .mulsel71;
                                                newMulse171.G = !newMulse171.G;
                                                this.setState({
                                                    mulsel71: newMulse171
                                                });
                                            }}
                                            isChecked={this.state.mulsel71.G}
                                            rightText="教学方法"
                                        />
                                        <CheckBox
                                            style={{
                                                flex: 1,
                                                padding: 3
                                            }}
                                            checkBoxColor="#808080"
                                            checkedCheckBoxColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            onClick={() => {
                                                var newMulse171 = this.state
                                                    .mulsel71;
                                                newMulse171.H = !newMulse171.H;
                                                this.setState({
                                                    mulsel71: newMulse171
                                                });
                                            }}
                                            isChecked={this.state.mulsel71.H}
                                            rightText="学生能力培养"
                                        />
                                        <CheckBox
                                            style={{
                                                flex: 1,
                                                padding: 3
                                            }}
                                            checkBoxColor="#808080"
                                            checkedCheckBoxColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            onClick={() => {
                                                var newMulse171 = this.state
                                                    .mulsel71;
                                                newMulse171.I = !newMulse171.I;
                                                this.setState({
                                                    mulsel71: newMulse171
                                                });
                                            }}
                                            isChecked={this.state.mulsel71.I}
                                            rightText="问题反馈"
                                        />
                                        <CheckBox
                                            style={{
                                                flex: 1,
                                                padding: 3
                                            }}
                                            checkBoxColor="#808080"
                                            checkedCheckBoxColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            onClick={() => {
                                                var newMulse171 = this.state
                                                    .mulsel71;
                                                newMulse171.J = !newMulse171.J;
                                                this.setState({
                                                    mulsel71: newMulse171
                                                });
                                            }}
                                            isChecked={this.state.mulsel71.J}
                                            rightText="考试方式方法改革"
                                        />
                                        <CheckBox
                                            style={{
                                                flex: 1,
                                                padding: 3
                                            }}
                                            checkBoxColor="#808080"
                                            checkedCheckBoxColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            onClick={() => {
                                                var newMulse171 = this.state
                                                    .mulsel71;
                                                newMulse171.K = !newMulse171.K;
                                                this.setState({
                                                    mulsel71: newMulse171
                                                });
                                            }}
                                            isChecked={this.state.mulsel71.K}
                                            rightText="挺好的，非常满意"
                                        />
                                    </View>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            您对教师和课程有何建议？（选填）
                                        </Text>
                                        <TextInput
                                            style={{
                                                textAlignVertical: "top",
                                                borderColor: "#ccc",
                                                borderWidth: 1,
                                                borderRadius: 5
                                            }}
                                            editable={true}
                                            multiline
                                            numberOfLines={5}
                                            value={this.state.advice72}
                                            onChangeText={value => {
                                                this.setState({
                                                    advice72: value
                                                });
                                            }}
                                        />
                                    </View>
                                    <View style={styles.evalGroup}>
                                        <Text style={styles.evalTitle}>
                                            您会向学弟、学妹推荐该教师的课程吗？
                                        </Text>
                                        <RadioGroup
                                            color="#808080"
                                            activeColor={
                                                Global.settings.theme
                                                    .backgroundColor
                                            }
                                            size={15}
                                            style={styles.radioGruop}
                                            selectedIndex={
                                                this.state.prob73.index
                                            }
                                            onSelect={(index, value) => {
                                                this.setState({
                                                    prob73: {
                                                        index: index,
                                                        value: value
                                                    }
                                                });
                                            }}
                                        >
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="Y"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    会
                                                </Text>
                                            </RadioButton>
                                            <RadioButton
                                                style={styles.radioButton}
                                                value="N"
                                            >
                                                <Text style={{ flex: 1 }}>
                                                    不会
                                                </Text>
                                            </RadioButton>
                                        </RadioGroup>
                                    </View>
                                </View>
                            </ScrollView>
                        </DialogContent>
                    </Dialog>
                </View>
                <Dialog
                    visible={this.state.alertVisible}
                    dialogTitle={
                        <DialogTitle
                            title="出错啦"
                            style={{
                                backgroundColor: "#ffffff"
                            }}
                            titleStyle={{
                                color: "#6a6a6a",
                                fontWeight: 500
                            }}
                        />
                    }
                    actions={[
                        <DialogButton
                            text="知道啦"
                            textStyle={{
                                color: Global.settings.theme.backgroundColor,
                                fontSize: 14,
                                fontWeight: "normal"
                            }}
                            onPress={() => {
                                this.setState({ alertVisible: false });
                            }}
                        />
                    ]}
                    width={0.75}
                    height={0.45 * (width / height)}
                    containerStyle={styles.dialog}
                >
                    <DialogContent style={{ flex: 1, paddingBottom: 0 }}>
                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    paddingVertical: 10,
                                    alignItems: "center",
                                    flex: 1
                                }}
                            >
                                <Text style={{ flex: 1, color: "#6a6a6a" }}>
                                    {this.state.alertText}
                                </Text>
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>
            </TouchableOpacity>
        );
    }
    buttonTapped() {
        this.setState({
            submitTapped: true
        });
        var answers = {};
        answers.prob11 = this.state.prob11.value;
        answers.prob12 = this.state.prob12.value;
        answers.prob13 = this.state.prob13.value;
        answers.prob14 = this.state.prob14.value;
        answers.prob15 = this.state.prob15.value;
        answers.prob21 = this.state.prob21.value;
        answers.prob22 = this.state.prob22.value;
        answers.prob23 = this.state.prob23.value;
        answers.prob31 = this.state.prob31.value;
        answers.prob32 = this.state.prob32.value;
        answers.prob33 = this.state.prob33.value;
        answers.prob41 = this.state.prob41.value;
        answers.prob42 = this.state.prob42.value;
        answers.prob43 = this.state.prob43.value;
        answers.prob51 = this.state.prob51.value;
        answers.prob52 = this.state.prob52.value;
        answers.prob73 = this.state.prob73.value;
        answers.sat6 = this.state.sat6.value;
        var mulse171 = "";
        if (this.state.mulsel71.A) mulse171 += "A";
        if (this.state.mulsel71.B) mulse171 += "B";
        if (this.state.mulsel71.C) mulse171 += "C";
        if (this.state.mulsel71.D) mulse171 += "D";
        if (this.state.mulsel71.E) mulse171 += "E";
        if (this.state.mulsel71.F) mulse171 += "F";
        if (this.state.mulsel71.G) mulse171 += "G";
        if (this.state.mulsel71.H) mulse171 += "H";
        if (this.state.mulsel71.I) mulse171 += "I";
        if (this.state.mulsel71.J) mulse171 += "J";
        if (this.state.mulsel71.K) mulse171 += "K";
        answers.mulse171 = mulse171;
        answers.advice72 = this.state.advice72;
        evalWithAnswer(
            {
                guidelineId: 120,
                evalItemId: this.state.evalItemId,
                answers: {
                    prob11: "A",
                    prob12: "A",
                    prob13: "N",
                    prob14: "A",
                    prob15: "A",
                    prob21: "A",
                    prob22: "A",
                    prob23: "A",
                    prob31: "A",
                    prob32: "A",
                    prob33: "A",
                    prob41: "A",
                    prob42: "A",
                    prob43: "A",
                    prob51: "A",
                    prob52: "A",
                    sat6: "A",
                    mulsel71: "AK",
                    advice72: "",
                    prob73: "Y"
                },
                clicks: {
                    _boot_: 0,
                    prob11: 9641,
                    prob12: 14808,
                    prob13: 18801,
                    prob14: 28249,
                    prob15: 31641,
                    prob21: 37225,
                    prob22: 38497,
                    prob23: 40170,
                    prob31: 42129,
                    prob32: 44162,
                    prob33: 45337,
                    prob41: 51345,
                    prob42: 52522,
                    prob43: 53729,
                    prob51: 55306,
                    prob52: 60449,
                    sat6: 61657,
                    mulsel71: 47767259,
                    prob73: 79145
                }
            },
            this.state.evalItemId,
            res => {
                if (res.message == "success") {
                    if (res.content.errno == 0) {
                        if (this.refs.toast != undefined)
                            this.refs.toast.show("评价成功", 5000);
                        this.setState({
                            submitTapped: false,
                            dialogVisible: false
                        });
                        this.props.refreshList();
                    } else {
                        this.setState({
                            dialogVisible: false,
                            alertText: res.content.msg,
                            alertVisible: true,
                            submitTapped: false
                        });
                        this.props.refreshList();
                    }
                }
            }
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    title: {
        color: "#808080",
        fontSize: 14,
        fontWeight: "normal",
        paddingBottom: 5
    },
    text: {
        color: "#808080",
        fontSize: 12
    },
    evalOuterWrap: {
        paddingVertical: 5
    },
    evalOuterTitle: {
        fontSize: 16
    },
    evalGroup: {
        paddingVertical: 5
    },
    evalTitle: {
        color: "#808080"
    },
    radioGruop: { flexDirection: "row" },
    radioButton: {
        flex: 1
    }
});
