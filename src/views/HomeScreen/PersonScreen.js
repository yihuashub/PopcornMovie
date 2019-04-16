import React from "react";
import {AppRegistry, TouchableOpacity, ScrollView, View} from "react-native";
import { Image } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { WebView, Linking } from 'react-native';
import { withNavigation } from 'react-navigation';
import ReadMore from 'react-native-read-more-text';
import {
    Container,
    Header,
    Title,
    Button,
    Icon,
    Tabs,
    Tab,
    Right,
    Left,
    Body,
    Card,
    CardItem,
    Text,
    Content,
    Spinner,
    Thumbnail,
    List,ListItem
} from "native-base";
import axios from "axios";
import PersonInfoCard from './components/PersonInfoCard';
import ScrollCrew from './components/ScrollCrewCard'
import ProgressBar from '../_Global/ProgressBar/ProgressBar';
import styles from "./styles/PersonScreen";

const iconMore = (<Icon name="ios-arrow-down" size={60} color="#F5B642" style={styles.readMoreIcon}/>);
const iconLess = (<Icon name="ios-arrow-up" size={60} color="#F5B642" style={styles.readMoreIcon}/>);

class PersonScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            personDetails: [],
            cast:[],
            genresList:[],
            movie_credits: {
                cast:[],
                crew: [],
            },
            posters:[]
        }
    }
    componentDidMount() {
        const { navigation } = this.props;

        const personId = navigation.getParam('id','NO-ID');

        this.__getPersonDetail(personId);
    };


    _renderTruncatedFooter = (handlePress) => {
        return (
                <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
                    <View style={styles.readMore}>
                        {iconMore}
                    </View>
                </TouchableOpacity>
        );
    };

    _renderRevealedFooter = (handlePress) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
                <View style={styles.readMore}>
                    {iconLess}
                </View>
            </TouchableOpacity>
        );
    };


    __getPersonDetail(personId)
    {
        axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=4b0de8890a276146ec8b14bcf7c9db71&append_to_response=movie_credits`)
            .then(res => {
                const person_s = res.data;
                this.setState({personDetails: person_s});
                this.setState({movie_credits: person_s.movie_credits});
                this.setState({isLoading: false});
            })
            .catch( (error) => {
                console.log(error);
            })
    }

    _handleTextReady = () => {
    };

    render() {
        return (
            this.state.isLoading ?  <View style={styles.progressBar}><Spinner /></View> :
                <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() =>this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title> 演员详情</Title>
                    </Body>
                    <Right />
                </Header>
                    <Content style={{marginLeft:0,marginRight:0,backgroundColor:"#eaeaea"}}>
                    <PersonInfoCard key={this.state.personDetails.id} info={this.state.personDetails}/>
                    <Card>
                        <CardItem>
                            <Body>
                                <ReadMore
                                    numberOfLines={3}
                                    renderTruncatedFooter={this._renderTruncatedFooter}
                                    renderRevealedFooter={this._renderRevealedFooter}
                                    onReady={this._handleTextReady}>
                                    <Text>
                                        {this.state.personDetails.biography ? this.state.personDetails.biography : '暂无内容'}
                                    </Text>
                                </ReadMore>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Body>
                            <Text>知名作品</Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{paddingLeft:0,paddingRight:0}}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {this.state.movie_credits.cast.slice(0, 10).map(info => (
                                    <ScrollCrew key={info.id} info={info}/>
                                ))}
                            </ScrollView>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }

}
export default withNavigation(PersonScreen);
