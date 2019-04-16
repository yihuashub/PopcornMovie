import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge
} from "native-base";
import styles from "./style";

//const routes = ["Home", "Chat", "Profile", "Counter","Tabe"];
const drawerCover = require("../../../../assets/drawer-cover.png");
const drawerImage = require("../../../../assets/logo-kitchen-sink.png");
const datas = [
    {
        name: "时下热门",
        route: "Home",
        icon: "ios-home",
        bg: "#C5F442"
    },
    {
        name: "关于爆米花电影",
        route: "AboutUs",
        icon: "ios-bowtie",
        bg: "#477EEA",
    },
    // {
    //     name: "测试",
    //     route: "Counter",
    //     icon: "arrow-up",
    //     bg: "#477EEA",
    //     types: "11"
    // },
];

export default class SideBar extends React.Component {
    render() {
        return (
            <Container>
                <Content
                    bounces={false}
                    style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
                >
                    <Image source={drawerCover} style={styles.drawerCover} />
                    <Image square style={styles.drawerImage} source={drawerImage} />
                    <List
                        dataArray={datas}
                        renderRow={data =>
                            <ListItem
                                button
                                noBorder
                                onPress={() => this.props.navigation.navigate(data.route)}
                            >
                                <Left>
                                    <Icon
                                        active
                                        name={data.icon}
                                        style={{ color: "#777", fontSize: 26, width: 30 }}
                                    />
                                    <Text style={styles.text}>
                                        {data.name}
                                    </Text>
                                </Left>
                                {data.types &&
                                <Right style={{ flex: 1 }}>
                                    <Badge
                                        style={{
                                            borderRadius: 3,
                                            height: 25,
                                            width: 72,
                                            backgroundColor: data.bg
                                        }}
                                    >
                                        <Text
                                            style={styles.badgeText}
                                        >{`${data.types} Types`}</Text>
                                    </Badge>
                                </Right>}
                            </ListItem>}
                    />
                </Content>
            </Container>
        );
    }
}
