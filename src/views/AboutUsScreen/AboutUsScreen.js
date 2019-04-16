import React, { Component } from 'react';
import {
    Container,
    Content,
    Text,
    Card,
    Header,
    Body,
    Button,
    Title,
    CardItem,
    List,
    ListItem,
    Thumbnail,
    Left,
    Right,
    Icon
} from 'native-base';

import {Image, PixelRatio, View} from "react-native";
import styles from "../_Global/SideBar/style";

class AboutUsScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            containerWidth: 1,
        };
    }
    render(){
        console.log(this.props.count);
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>关于爆米花电影</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={{backgroundColor:"#eaeaea"}} onLayout={({ nativeEvent: { layout: { width } } }) => {
                    if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
                }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9)),
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}>
                        <View>
                            <Image source={require("../../../assets/logo-kitchen-sink.png")} style={{height:85,width: this.state.containerWidth/1.60}} />
                            <View style={{
                                textAlign: 'center', // <-- the magic
                                fontWeight: 'bold',
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 27,
                                marginTop: 15,}}>
                                <Text note>PopcornMovie Beta 0.1</Text>
                            </View>
                        </View>
                    </View>


                    <List style={{ backgroundColor: "white", marginTop:20 }}>
                        <ListItem onPress={() => this.props.navigation.navigate("UserAgreementScreen")}>
                            <Left>
                                <Text>用户使用协议</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

export default (AboutUsScreen);
