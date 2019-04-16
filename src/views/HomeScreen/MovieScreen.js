import React from "react";
import {AppRegistry, TouchableOpacity, ScrollView, View} from "react-native";
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

const iconMore = (<Icon name="ios-arrow-down" size={60} color="#F5B642" style={styles.readMoreIcon}/>);
const iconLess = (<Icon name="ios-arrow-up" size={60} color="#F5B642" style={styles.readMoreIcon}/>);


class MovieScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            isLoadingStatus1:true,
            isLoadingStatus2:true,
            movieDetails: [],
            cast:[],
            trailer:[],
            genresList:[],
            images: {
                backdrops:[],
                posters: [],
            },
            posters:[]
        }
    }
    componentDidMount() {

        //const movieId = '335983';

        const { navigation } = this.props;

        const movieId = navigation.getParam('id','NO-ID');

        this.__getMovieDetial(movieId);
        this.__getImagesAndTrailer(movieId);

    };

    __getMovieDetial(movieId)
    {
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=4b0de8890a276146ec8b14bcf7c9db71&append_to_response=credits&language=zh-CN`)
            .then(res => {
                const movie_s = res.data;
                this.setState({movieDetails: movie_s});
                this.setState({genresList: movie_s.genres});
                this.setState({cast: res.data.credits.cast});
                this.setState({isLoadingStatus1:false});
            })
            .catch( (error) => {
                console.log(error);
            })
    }


    __getImagesAndTrailer(movieId){
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=4b0de8890a276146ec8b14bcf7c9db71&append_to_response=images,videos`)
            .then(res => {
                const trailers = res.data.videos.results;
                const images = res.data.images;
                if(trailers.length>0){this.setState({trailers: trailers});}
                this.setState({images: images});
                this.setState({isLoadingStatus2:false});
            })
            .catch( (error) => {
                console.log(error);
            })
    };


    _changeLoadingStatus(){

        if(!this.state.isLoadingStatus1 && !this.state.isLoadingStatus2)
        {
            return false;
        }

        return true;
    }

    _viewMovie = () => {
        Linking.canOpenURL("https://www.cineplex.com/search-2015?search-query="+this.state.movieDetails.original_title).then(supported => {
            if (supported) {
                Linking.openURL("https://www.cineplex.com/search-2015?search-query="+this.state.movieDetails.original_title);
            } else {
                console.log("Don't know how to open URI: " + this.state.movieDetails.original_title);
            }
        });
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

    _handleTextReady = () => {
    };

    render() {
        return (
            this._changeLoadingStatus() ? <View style={styles.progressBar}><Spinner /></View> :
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() =>this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title> 电影详情</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={{marginLeft:0,marginRight:0,backgroundColor:"#eaeaea"}}>
                    <InfoSection trailers= {this.state.trailers} props={this.props} key={this.state.movieDetails.id} info={this.state.movieDetails} genresList={this.state.genresList} viewMovie={this._viewMovie} />
                    <Card>
                        <CardItem>
                            <Body>
                            <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}>
                                <Text>
                                    {this.state.movieDetails.overview ? this.state.movieDetails.overview : '暂无内容'}
                                </Text>
                            </ReadMore>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Body>
                            <Text>演职人员</Text>
                            </Body>
                            {/*<Right>*/}
                                {/*<Text note>全部></Text>*/}
                            {/*</Right>*/}
                        </CardItem>
                        <CardItem style={{paddingLeft:0,paddingRight:0}}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                { this.state.cast.slice(0, 10).map(actor => (
                                    <ScrollActor key={actor.id} info={actor}/>
                                ))}
                            </ScrollView>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Body>
                            <Text>海报</Text>
                            </Body>
                            {/*<Right>*/}
                                {/*<Text note>全部></Text>*/}
                            {/*</Right>*/}
                        </CardItem>
                        <CardItem style={{paddingLeft:0,paddingRight:0}}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                { this.state.images.posters.map(posters => (
                                    <ScrollPosters key={posters.file_path} info={posters}/>
                                ))}
                            </ScrollView>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Body>
                            <Text>剧照</Text>
                            </Body>
                            {/*<Right>*/}
                                {/*<Text note>全部></Text>*/}
                            {/*</Right>*/}
                        </CardItem>
                        <CardItem style={{paddingLeft:0,paddingRight:0}}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingLeft:15}}>
                                { this.state.images.backdrops.map(posters => (
                                    <ScrollBackdrops key={posters.file_path} info={posters}/>
                                ))}
                            </ScrollView>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}
export default withNavigation(MovieScreen);
