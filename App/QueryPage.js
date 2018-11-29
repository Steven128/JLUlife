import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableNativeFeedback,
    Alert
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import Global from "../src/Global";
import QueryItem from "../src/Query/QueryItem";
const { width, height } = Dimensions.get("window");

export default class QueryPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = { isOnline: Global.isOnline };
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }
    componentDidMount() {}

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
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
                        text: "信息查询",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                />
                <View>
                    <QueryItem
                        navigation={this.props.navigation}
                        title="查空教室"
                        subTitle="没地方上自习？进来看看吧"
                        nextPage="EmptyRoom"
                    />
                    <QueryItem
                        navigation={this.props.navigation}
                        title="图书馆"
                        subTitle="馆藏查询"
                        nextPage="Library"
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    item: {
        height: 60,
        textAlign: "left",
        justifyContent: "center",
        textAlignVertical: "center",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingHorizontal: 30
    }
});
