import React from "react";
import {AppRegistry, TouchableOpacity, ScrollView, View,Alert} from "react-native";
import { Image } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { WebView, Linking } from 'react-native';
import { withNavigation } from 'react-navigation';

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
    Badge,
    Spinner,
    Thumbnail,
    List,ListItem
} from "native-base";
import axios from "axios";
import YouTube from 'react-native-youtube'
import ScrollActor from './components/ScrollActorCard'
import InfoSection from './components/InfoSectionCard'
import ScrollPosters from './components/ScrollPostersCard';
import ScrollBackdrops from './components/ScrollBackdropsCard';
import styles from './styles/MovieScreen';
import ProgressBar from '../_Global/ProgressBar/ProgressBar';
import ReadMore from 'react-native-read-more-text';
import ScrollCrew from "./components/ScrollCrewCard";

const iconMore = (<Icon name="ios-arrow-down" size={60} color="#F5B642" style={styles.readMoreIcon}/>);
const iconLess = (<Icon name="ios-arrow-up" size={60} color="#F5B642" style={styles.readMoreIcon}/>);

const getNowPlaying = 'https://api.themoviedb.org/3/movie/now_playing';
const getUpComing = 'https://api.themoviedb.org/3/movie/upcoming';
class MovieListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            loadMore:false,
            headerTitle:'电影列表',
            page:2,
            type:null,
            totalPages:1,
            movieList: {
                results:[],
                total_results: 0,
                total_pages: 0
            },
            nowPlayingMovies: {
                results:[],
                total_results: 0,
                total_pages: 0
            },
            results:[]
        }
    }
    componentDidMount() {
        const { navigation } = this.props;
        const movieList = navigation.getParam('movieList','NO-movieDetails');
        const headerTitle = navigation.getParam('headerTitle','NO-headerTitle');
        const type = navigation.getParam('type','NO-listType');

        this.setState(
            {
                headerTitle:headerTitle,
                totalPages:movieList.total_pages,
                results:movieList.results,
                type:type,
                movieList:movieList
            });
    };


    _onScroll(event) {
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        console.log('offsetY-->' + y);
        console.log('height-->' + height);
        console.log('contentHeight-->' + contentHeight);
        if(y+height>=contentHeight-20){

            if(this.state.page < this.state.totalPages && !this.state.loadMore)
            {
                this.setState({
                    loadMore:true,
                    page:this.state.page + 1
                    },
                    ()=>{
                        this._makeRemoteRequest();
                    });
            }
        }
    }

    _makeRemoteRequest(){

        if (this.state.type === 'NOWPLAYING') {
            this._getNowPlayingMovies()
        }
        else if(this.state.type === 'UPCOMING')
        {
            this._getUpcomingMovies();
        }
    }

    _getNowPlayingMovies(){

        axios.get(`${getNowPlaying}?api_key=4b0de8890a276146ec8b14bcf7c9db71&page=${this.state.page}&language=zh-cn&region=US`)
            .then(res => {
                const nowPlayingMovies = res.data;
                //Alert.alert(res.data.page +" " +this.state.totalPages.toString());
                this.setState({
                    results:[...this.state.results,...nowPlayingMovies.results],
                    nowPlayingMovies:nowPlayingMovies,
                    loadMore:false
                });
            })
    }

    _getUpcomingMovies(){
        axios.get(`${getUpComing}?api_key=4b0de8890a276146ec8b14bcf7c9db71&page=${this.state.page}&language=zh-cn&region=US`)
            .then(res => {
                const nowPlayingMovies = res.data;
                //Alert.alert(res.data.page +" " +this.state.totalPages.toString());
                this.setState({
                    results:[...this.state.results,...nowPlayingMovies.results],
                    nowPlayingMovies:nowPlayingMovies,
                    loadMore:false
                });
            })
    }
    _renderLoadMore() {
        return (
            this.state.loadMore && <Spinner/>
        );
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() =>this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title> {this.state.headerTitle}</Title>
                    </Body>
                    <Right />
                </Header>
                <ScrollView
                        onScroll={this._onScroll.bind(this)}
                        scrollEventThrottle={50}
                    >
                    <List>
                        {this.state.results.map(info => (
                            <ListItem thumbnail key={info.id} onPress= {()=>this.props.navigation.navigate("MovieScreen",{id:info.id})}>
                                <Left>
                                    <Thumbnail square style={{height: 80}} source={{ uri: 'https://image.tmdb.org/t/p/w185/'+ info.poster_path }} />
                                </Left>
                                <Body>
                                <Text>{info.title}</Text>
                                <Text note numberOfLines={1}>{info.original_title}</Text>
                                </Body>
                                <Right>
                                    <Button transparent>
                                        <Text>View</Text>
                                    </Button>
                                </Right>
                            </ListItem>
                        ))}
                        {this._renderLoadMore()}
                    </List>
                </ScrollView>
            </Container>
        );
    }
}
export default withNavigation(MovieListScreen);
