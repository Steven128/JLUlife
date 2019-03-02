/**
 * 信息查询页
 */
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    StatusBar,
    Platform,
    SafeAreaView,
    ScrollView,
    FlatList,
    ActivityIndicator
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../../src/Global";
import {
    getAvgGpoint,
    getCreditStat,
    getEachYear,
    getEachLesson,
    getNotPassed
} from "../../src/FetchInterface/ScoreStatInterface";
import AvgGpointItem from "../../src/Score/AvgGpointItem";

const { width, height } = Dimensions.get("window");

export default class ScoreStatDetailPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {
            target: "",
            getGpoint: false,
            gpointData: {},
            getDataList: false,
            dataList: []
        };
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }
    componentDidMount() {
        var params = this.props.navigation.state.params;
        this.setState({ target: params.target });
        if (params.target == "ScoreGpoint") {
            getAvgGpoint(res => {
                if (res.message == "success") {
                    this.setState({
                        gpointData: res.content,
                        getGpoint: true
                    });
                }
            });
            getCreditStat(res => {
                console.log(res);
                if (res.message == "success") {
                    this.setState({
                        dataList: res.content,
                        getDataList: true
                    });
                }
            });
        } else if (params.target == "EachYear") {
            getEachYear(res => {
                if (res.message == "success") {
                    this.setState({
                        dataList: res.content,
                        getDataList: true
                    });
                }
            });
        } else if (params.target == "EachLesson") {
            getEachLesson(res => {
                if (res.message == "success") {
                    this.setState({
                        dataList: res.content,
                        getDataList: true
                    });
                }
            });
        } else if (params.target == "NotPassed") {
            getNotPassed(res => {
                if (res.message == "success") {
                    this.setState({
                        dataList: res.content,
                        getDataList: true
                    });
                }
            });
        }
    }

    convertType5(type5) {
        return type5 == 4160
            ? "必修课"
            : type5 == 4161
            ? "选修课"
            : type5 == 4162
            ? "限选课"
            : type5 == 4163
            ? "校选修课"
            : type5 == 4164
            ? "体育课"
            : null;
    }

    convertCourType2(courType2) {
        return courType2 == 3021
            ? "自然科学类"
            : courType2 == 3022
            ? "理工医综合类"
            : courType2 == 3023
            ? "历史与文化类"
            : courType2 == 3024
            ? "政治与法律类"
            : courType2 == 3025
            ? "艺术与体育类"
            : courType2 == 3026
            ? "哲学与社会类"
            : courType2 == 3027
            ? "经济与管理类"
            : courType2 == 3028
            ? "文学类"
            : courType2 == 3029
            ? "方法与技术类"
            : courType2 == 3030
            ? "文学与艺术类"
            : courType2 == 3031
            ? "哲学与社会学类"
            : courType2 == 3032
            ? "财经政法类"
            : courType2 == 3033
            ? "慕课"
            : courType2 == 3034
            ? "管理与行为科学"
            : courType2 == 3035
            ? "经济与社会发展"
            : courType2 == 3036
            ? "科学与技术"
            : courType2 == 3037
            ? "创新与创业"
            : courType2 == 3038
            ? "个性课程"
            : courType2 == 3039
            ? "卓越工程类"
            : courType2 == 3040
            ? "卓越医学类"
            : null;
    }

    render() {
        const { navigate } = this.props.navigation;
        var headerStyle = {
            borderBottomColor: Global.settings.theme.backgroundColor
        };
        if (Platform.OS == "ios") {
            headerStyle.paddingTop = 0;
            headerStyle.height = 44;
        }
        var sumCredit = 0;
        if (this.state.getGpoint) {
            for (var i in this.state.dataList) {
                sumCredit += this.state.dataList[i].sumCredit;
            }
        }
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: Global.settings.theme.backgroundColor
                }}
            >
                <StatusBar
                    backgroundColor={Global.settings.theme.backgroundColor}
                    barStyle="light-content"
                    translucent={false}
                />
                <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
                    <Header
                        containerStyle={headerStyle}
                        backgroundColor={Global.settings.theme.backgroundColor}
                        placement="left"
                        leftComponent={
                            <EIcon
                                name="chevron-left"
                                size={28}
                                color="#ffffff"
                                onPress={() => this.props.navigation.goBack()}
                            />
                        }
                        centerComponent={{
                            text: this.props.navigation.state.params.title,
                            style: { color: "#fff", fontSize: 16 }
                        }}
                    />
                    {this.state.getGpoint || this.state.getDataList ? (
                        <ScrollView
                            style={[styles.container]}
                            showsVerticalScrollIndicator={false}
                        >
                            {this.state.getGpoint ? (
                                <AvgGpointItem
                                    gpointData={this.state.gpointData}
                                />
                            ) : null}
                            {this.state.getDataList ? (
                                <View
                                    style={{
                                        backgroundColor:
                                            this.state.target == "ScoreGpoint"
                                                ? "transparent"
                                                : "#fff",
                                        paddingHorizontal:
                                            this.state.target == "ScoreGpoint"
                                                ? 0
                                                : 10
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: "#fff",
                                            margin:
                                                this.state.target ==
                                                "ScoreGpoint"
                                                    ? 10
                                                    : 0
                                        }}
                                    >
                                        {this.state.getGpoint ? (
                                            <View>
                                                <View
                                                    style={{
                                                        padding: 15
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            color: "#6a6a6a",
                                                            lineHeight: 24
                                                        }}
                                                    >
                                                        获得总学分：{" "}
                                                        <Text
                                                            style={{
                                                                color:
                                                                    Global
                                                                        .settings
                                                                        .theme
                                                                        .backgroundColor,
                                                                fontSize: 22,
                                                                lineHeight: 26
                                                            }}
                                                        >
                                                            {sumCredit}
                                                        </Text>
                                                    </Text>
                                                    <View
                                                        style={{ height: 10 }}
                                                    />
                                                </View>
                                            </View>
                                        ) : null}
                                        <FlatList
                                            data={this.state.dataList}
                                            showsVerticalScrollIndicator={false}
                                            ListEmptyComponent={
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        paddingHorizontal: 30,
                                                        paddingVertical: 15,
                                                        backgroundColor:
                                                            "transparent"
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            color: "#808080",
                                                            lineHeight: 20
                                                        }}
                                                    >
                                                        好像什么东西都没有ヽ(ー_ー)ノ
                                                    </Text>
                                                </View>
                                            }
                                            ListHeaderComponent={
                                                this.state.target ==
                                                "ScoreGpoint" ? (
                                                    <View
                                                        style={[
                                                            styles.row,
                                                            {
                                                                paddingVertical: 10,
                                                                marginHorizontal: 15
                                                            }
                                                        ]}
                                                    >
                                                        <Text
                                                            style={styles.item}
                                                        >
                                                            课程性质
                                                        </Text>
                                                        <Text
                                                            style={styles.item}
                                                        >
                                                            校选修课类别
                                                        </Text>
                                                        <Text
                                                            style={styles.item}
                                                        >
                                                            获得学分
                                                        </Text>
                                                    </View>
                                                ) : this.state.target ==
                                                  "EachYear" ? (
                                                    <View
                                                        style={[
                                                            styles.row,
                                                            {
                                                                paddingVertical: 10
                                                            }
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 2 }
                                                            ]}
                                                        >
                                                            学期
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 2 }
                                                            ]}
                                                        >
                                                            课程名称
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1.5 }
                                                            ]}
                                                        >
                                                            课程性质
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 0.5 }
                                                            ]}
                                                        >
                                                            学分
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            成绩
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 0.5 }
                                                            ]}
                                                        >
                                                            绩点
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            是否重修
                                                        </Text>
                                                    </View>
                                                ) : this.state.target ==
                                                  "EachLesson" ? (
                                                    <View
                                                        style={[
                                                            styles.row,
                                                            {
                                                                paddingVertical: 10
                                                            }
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 2 }
                                                            ]}
                                                        >
                                                            首次上课学期
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 2 }
                                                            ]}
                                                        >
                                                            课程名称
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1.5 }
                                                            ]}
                                                        >
                                                            课程性质
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 0.5 }
                                                            ]}
                                                        >
                                                            学分
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            通过成绩
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            通过绩点
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            最高成绩
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            最高绩点
                                                        </Text>
                                                    </View>
                                                ) : this.state.target ==
                                                  "NotPassed" ? (
                                                    <View
                                                        style={[
                                                            styles.row,
                                                            {
                                                                paddingVertical: 10
                                                            }
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 2 }
                                                            ]}
                                                        >
                                                            首次上课学期
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 2 }
                                                            ]}
                                                        >
                                                            课程名称
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1.5 }
                                                            ]}
                                                        >
                                                            课程类型
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            学分
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            首次成绩
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            最高成绩
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            学习次数
                                                        </Text>
                                                    </View>
                                                ) : null
                                            }
                                            renderItem={({ item }) =>
                                                this.state.target ==
                                                "ScoreGpoint" ? (
                                                    <View
                                                        style={[
                                                            styles.row,
                                                            {
                                                                marginHorizontal: 15,
                                                                borderBottomColor:
                                                                    "#f5f5f5"
                                                            }
                                                        ]}
                                                    >
                                                        <Text
                                                            style={styles.item}
                                                        >
                                                            {this.convertType5(
                                                                item.type5
                                                            )}
                                                        </Text>
                                                        <Text
                                                            style={styles.item}
                                                        >
                                                            {this.convertCourType2(
                                                                item.courType2
                                                            )}
                                                        </Text>
                                                        <Text
                                                            style={styles.item}
                                                        >
                                                            {item.sumCredit}
                                                        </Text>
                                                    </View>
                                                ) : this.state.target ==
                                                  "EachYear" ? (
                                                    <View
                                                        style={[
                                                            styles.row,
                                                            {
                                                                borderBottomColor:
                                                                    "#f5f5f5"
                                                            }
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 2 }
                                                            ]}
                                                        >
                                                            {
                                                                item
                                                                    .teachingTerm
                                                                    .termName
                                                            }
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 2 }
                                                            ]}
                                                        >
                                                            {
                                                                item.course
                                                                    .courName
                                                            }
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1.5 }
                                                            ]}
                                                        >
                                                            {this.convertType5(
                                                                item.type5
                                                            )}
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 0.5 }
                                                            ]}
                                                        >
                                                            {item.credit}
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            {item.score}
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 0.5 }
                                                            ]}
                                                        >
                                                            {item.gpoint}
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            {item.isReselect ==
                                                            "Y"
                                                                ? "是"
                                                                : item.isReselect ==
                                                                  "N"
                                                                ? "否"
                                                                : null}
                                                        </Text>
                                                    </View>
                                                ) : this.state.target ==
                                                  "EachLesson" ? (
                                                    <View
                                                        style={[
                                                            styles.row,
                                                            {
                                                                borderBottomColor:
                                                                    "#f5f5f5"
                                                            }
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 2 }
                                                            ]}
                                                        >
                                                            {
                                                                item.firstTerm
                                                                    .termName
                                                            }
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 2 }
                                                            ]}
                                                        >
                                                            {
                                                                item.course
                                                                    .courName
                                                            }
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1.5 }
                                                            ]}
                                                        >
                                                            {this.convertType5(
                                                                item.type5
                                                            )}
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            {item.credit}
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            {item.firstScoreNum}
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            {item.firstGpoint}
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            {item.bestScoreNum}
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            {item.bestGpoint}
                                                        </Text>
                                                    </View>
                                                ) : this.state.target ==
                                                  "NotPassed" ? (
                                                    <View
                                                        style={[
                                                            styles.row,
                                                            {
                                                                borderBottomColor:
                                                                    "#f5f5f5"
                                                            }
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 2 }
                                                            ]}
                                                        >
                                                            {
                                                                item.firstTerm
                                                                    .termName
                                                            }
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 2 }
                                                            ]}
                                                        >
                                                            {
                                                                item.course
                                                                    .courName
                                                            }
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1.5 }
                                                            ]}
                                                        >
                                                            {this.convertType5(
                                                                item.type5
                                                            )}
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            {item.credit}
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            {item.firstScoreNum}
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            {item.bestScoreNum}
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.item,
                                                                { flex: 1 }
                                                            ]}
                                                        >
                                                            {item.studyCnt}
                                                        </Text>
                                                    </View>
                                                ) : null
                                            }
                                        />
                                        <View style={{ height: 10 }} />
                                    </View>
                                </View>
                            ) : null}
                        </ScrollView>
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                paddingVertical: height / 2 - 150
                            }}
                        >
                            <ActivityIndicator
                                style={{ flex: 1 }}
                                size="large"
                                color={Global.settings.theme.backgroundColor}
                            />
                        </View>
                    )}
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5"
    },
    row: {
        flexDirection: "row",
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        backgroundColor: "#ffffff"
    },
    item: {
        flex: 1,
        paddingHorizontal: 2.5,
        paddingVertical: 7.5,
        textAlign: "center",
        alignSelf: "center",
        justifyContent: "center",
        textAlignVertical: "center",
        color: "#808080",
        lineHeight: 18
    }
});
