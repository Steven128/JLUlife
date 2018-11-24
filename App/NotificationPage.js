import React, { Component } from "react";
import { View, Dimensions, ActivityIndicator } from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import NotificationInterface from "../src/NotificationInterface";
import NotificationView from "../src/NotificationView";

const { width, height } = Dimensions.get("window");
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {
            getOa: false,
            oaList: []
        };
    }

    componentDidMount() {
        NotificationInterface(1, res => {
            this.setState({
                oaList: res
            });
            this.setState({
                getOa: true
            });
        });
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    placement="left"
                    leftComponent={
                        <Button
                            title=""
                            icon={<EIcon name="menu" size={28} color="white" />}
                            clear
                            onPress={this.openDrawer}
                        />
                    }
                    centerComponent={{
                        text: "校内通知",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                />
                {this.state.getOa ? (
                    <NotificationView
                        oaList={this.state.oaList}
                        navigation={this.props.navigation}
                    />
                ) : (
                    <View
                        style={{
                            paddingVertical: height / 2 - 150,
                            backgroundColor: "transparent"
                        }}
                    >
                        <ActivityIndicator
                            style={{}}
                            size="large"
                            color="#2089dc"
                        />
                    </View>
                )}
            </View>
        );
    }
}
