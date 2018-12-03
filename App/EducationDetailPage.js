import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    WebView,
    StyleSheet,
    Linking,
    TouchableNativeFeedback
} from "react-native";
import { Header, Button } from "react-native-elements";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Feather";
import Global from "../src/Global";
const { width, height } = Dimensions.get("window");

var { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
export default class EducationDetailPage extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {
            getOa: false,
            oaDetail: {},
            showTag: false
        };
    }

    openDrawer() {
        // 打开抽屉式导航
        this.props.navigation.openDrawer();
    }

    showTag() {
        this.setState({
            showTag: true
        });
    }

    closeTag() {
        this.setState({
            showTag: false
        });
    }

    openBroser(href) {
        Linking.openURL(href).catch(err => {
            if (__DEV__) console.error("An error occurred", err);
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Header
                    placement="left"
                    leftComponent={
                        <Button
                            title=""
                            icon={
                                <EIcon
                                    name="chevron-left"
                                    size={28}
                                    color="white"
                                />
                            }
                            clear
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    centerComponent={{
                        text: "通知详情",
                        style: { color: "#fff", fontSize: 16 }
                    }}
                />
                <View style={styles.titleWrap}>
                    <Text style={styles.title}>
                        {this.props.navigation.state.params.title}
                    </Text>
                    <Text style={styles.subTitle}>
                        {this.props.navigation.state.params.time}
                    </Text>
                </View>
                <WebView
                    bounces={false}
                    scalesPageToFit={true}
                    source={{
                        uri: this.props.navigation.state.params.href
                    }}
                    automaticallyAdjustContentInsets={true}
                    injectedJavaScript={`document.querySelector('body').innerHTML=document.querySelector('.con_con').innerHTML;var list = document.querySelectorAll('span');for(var i=0;i<list.length;i++){list[i].style.fontSize='16px';list[i].style.lineHeight='24px';list[i].style.color='#454545'};document.querySelector('body').style.padding='15px';document.querySelector('body').style.paddingBottom='30px';window.scrollTo(0,0) `}
                    style={{
                        width: deviceWidth,
                        height: deviceHeight - 100
                    }}
                    startInLoadingState={true}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleWrap: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    title: {
        fontSize: 20,
        paddingBottom: 10
    },
    subTitle: {
        fontSize: 14,
        color: "#888",
        paddingTop: 5
    },
    tagContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100
    },
    tag: {
        width: 170,
        height: 70,
        position: "absolute",
        top: 30,
        right: 15,
        backgroundColor: "#fff",
        zIndex: 101,
        borderWidth: 1,
        borderColor: "#ccc",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlignVertical: "center"
    }
});
