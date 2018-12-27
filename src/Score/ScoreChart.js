import React, { Component } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import Echarts from "native-echarts";
import Global from "../Global";

const { width, height } = Dimensions.get("window");
export class ScoreChart extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        var option = {
            title: {
                text: "成绩统计",
                x: "-5px",
                textStyle: {
                    fontWeight: "normal",
                    fontSize: 16,
                    color: "#555555"
                }
            },
            tooltip: {
                trigger: "axis",
                formatter: null,
                transitionDuration: 0.4,
                textStyle: {
                    color: "#555"
                },
                backgroundColor: "rgba(255,255,255,0.7)",
                borderColor: "rgba(0,0,0,0.5)",
                borderRadius: 2,
                borderWidth: 1,
                padding: 5
            },
            legend: {
                data: ["分数"]
            },
            calculable: true,
            xAxis: [
                {
                    type: "category",
                    data: [">90", "80-90", "70-80", "60-70", "<60"],
                    axisLine: {
                        linkStyle: {
                            color: "#808080"
                        }
                    },
                    axisTick: {
                        linkStyle: {
                            color: "#808080"
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#808080"
                        }
                    },
                    splitLine: {
                        linkStyle: {
                            color: "#ffffff"
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: "value",
                    boundaryGap: [0, 0.01],
                    axisLine: {
                        linkStyle: {
                            color: "#808080"
                        }
                    },
                    axisTick: {
                        linkStyle: {
                            color: "#808080"
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#808080"
                        }
                    },
                    splitLine: {
                        linkStyle: {
                            color: "#ffffff"
                        }
                    }
                }
            ],
            series: [
                {
                    type: "bar",
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var colorList = [
                                    "#fdad8b",
                                    "#6cc2e6",
                                    "#a0d462",
                                    "#ea98b5",
                                    "#b6a4db"
                                ];
                                return colorList[params.dataIndex];
                            }
                        }
                    },
                    data: [
                        this.props.scoreStat[0].percent.toFixed(2),
                        this.props.scoreStat[1].percent.toFixed(2),
                        this.props.scoreStat[2].percent.toFixed(2),
                        this.props.scoreStat[3].percent.toFixed(2),
                        this.props.scoreStat[4].percent.toFixed(2)
                    ],
                    markLine: {
                        itemStyle: {
                            emphasis: {
                                lineStyle: {
                                    color: Global.settings.theme.backgroundColor
                                }
                            }
                        }
                    }
                }
            ]
        };

        return (
            <View
                style={{
                    alignItems: "center",
                    height: 250
                }}
            >
                <Echarts option={option} height={250} width={width * 0.78} />
            </View>
        );
    }
}

export default ScoreChart;
