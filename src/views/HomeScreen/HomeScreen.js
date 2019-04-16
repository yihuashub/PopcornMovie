import React from "react";
import {
    AppRegistry,
    Alert,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView, PixelRatio,
} from "react-native";

import {
    Spinner,
    Text,
    Container,
    Card,
    CardItem,
    Body,
    Content,
    Header,
    Icon,
    Title,
    Button,
    H1, List, ListItem,Thumbnail,Left, Right
} from "native-base";
import axios from 'axios'
import Swiper from 'react-native-swiper'
import styles from './styles/HomeScreen';
import ProgressBar from '../_Global/ProgressBar/ProgressBar';


import {NavigationActions, StackNavigator} from "react-navigation";
import MovieScreen from "./MovieScreen.js";
import SearchScreen from "./SearchScreen.js";
import ScrollMovie from './components/ScrollMovieCard';


const renderPagination = (index, total, context) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={{ color: 'grey' }}>
                <Text style={styles.paginationText}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoadingStatus1:true,
            isLoadingStatus2:true,
            containerWidth: null,
            nowPlayingMovies: {
                results:[],
                page: 0,
                total_results: 0,
                dates: {
                    maximum: "",
                    minimum: ""
                },
                total_pages: 0
            },
            upcomingMovies: {
                results:[],
                page: 0,
                total_results: 0,
                dates: {
                    maximum: "",
                    minimum: ""
                },
                total_pages: 0
            },
        }
    }
    componentDidMount() {
        this._getNowPlayingMovies();
        this._getUpcomingMovies();

        // if (this.props.navigation.state.params !== undefined) {
        //     Alert.alert("USER found", this.props.navigation.state.params.name);
        // }
    };

    _getNowPlayingMovies(){
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=4b0de8890a276146ec8b14bcf7c9db71&page=1&language=zh-cn&region=US`)
            .then(res => {
                const nowPlayingMovies = res.data;
                this.setState({nowPlayingMovies: nowPlayingMovies});
                this.setState({isLoadingStatus1:false});
            })
    }

    _getUpcomingMovies(){
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=4b0de8890a276146ec8b14bcf7c9db71&page=1&language=zh-cn&region=US`)
            .then(res => {
                const upcomingMovies = res.data;
                this.setState({upcomingMovies: upcomingMovies});
                this.setState({isLoadingStatus2:false});
            })
    }
    _viewMovie(movieId) {
        this.props.navigator.showModal({
            screen: 'movieapp.Movie',
            passProps: {
                movieId
            },
            backButtonHidden: true,
            navigatorButtons: {
                rightButtons: [
                    {
                        id: 'close',
                    }
                ]
            }
        });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                    <Title> 时下热门</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate("SearchScreen")}>
                            <Icon name='search' />
                        </Button>
                    </Right>
                </Header>
                <Content style={{marginLeft:0,marginRight:0,backgroundColor:"#eaeaea"}} onLayout={({ nativeEvent: { layout: { width } } }) => {
                    if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
                }}>
                    <Swiper
                        style={styles.wrapper}
                        renderPagination={renderPagination}
                        autoplay
                        autoplayTimeout={4}
                        showsPagination={false}
                        height={PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9)) }
                        loop
                    >
                        <View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
                            <Image style={styles.image} source={{uri:'https://image.tmdb.org/t/p/w185/eXaam4pV8cQFcS3eklTVbViayhC.jpg'}} />
                        </View>
                        <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
                            <Image style={styles.image} source={{uri:'https://image.tmdb.org/t/p/w185/eXaam4pV8cQFcS3eklTVbViayhC.jpg'}} />
                        </View>
                        <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
                            <Image style={styles.image} source={{uri:'https://image.tmdb.org/t/p/w185/eXaam4pV8cQFcS3eklTVbViayhC.jpg'}} />
                        </View>
                        <View style={styles.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
                            <Image style={styles.image} source={{uri:'https://image.tmdb.org/t/p/w185/eXaam4pV8cQFcS3eklTVbViayhC.jpg'}} />
                        </View>
                    </Swiper>
                    <View>
                        <Card>
                            <CardItem header>
                                <Body>
                                <Text>正在热映</Text>
                                </Body>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => { this.props.navigation.navigate({
                                    routeName: 'MovieListScreen',
                                    params: { movieList:this.state.nowPlayingMovies,headerTitle:'正在热映',type:'NOWPLAYING'},
                                    key: 'MovieList' + this.state.nowPlayingMovies.dates.maximum
                                })}}>
                                    <Right>
                                        <Text note>全部{this.state.nowPlayingMovies.total_results}部></Text>
                                    </Right>
                                </TouchableOpacity>
                            </CardItem>
                            <CardItem style={{paddingLeft:0,paddingRight:0}}>
                                {this.state.isLoadingStatus1 ? <View style={styles.progressBar}><Spinner /></View> : <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {this.state.nowPlayingMovies.results.slice(0, 10).map(info => (
                                        <ScrollMovie key={info.id} info={info}/>
                                    ))}
                                </ScrollView>}
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem header>
                                <Body>
                                <Text>即将上映</Text>
                                </Body>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => { this.props.navigation.navigate({
                                    routeName: 'MovieListScreen',
                                    params: { movieList:this.state.upcomingMovies,headerTitle:'即将上映',type:'UPCOMING' },
                                    key: 'MovieList' + this.state.upcomingMovies.dates.maximum
                                })}}>
                                    <Right>
                                        <Text note>全部{this.state.upcomingMovies.total_results}部></Text>
                                    </Right>
                                </TouchableOpacity>
                            </CardItem>
                            <CardItem style={{paddingLeft:0,paddingRight:0}}>
                                {this.state.isLoadingStatus2 ? <View style={styles.progressBar}><Spinner /></View> :<ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {this.state.upcomingMovies.results.slice(0, 10).map(info => (
                                        <ScrollMovie key={info.id} info={info}/>
                                        ))}
                                </ScrollView>}
                            </CardItem>
                        </Card>
                        {/*<Button*/}
                            {/*full*/}
                            {/*rounded*/}
                            {/*primary*/}
                            {/*style={{ marginTop: 10 }}*/}
                            {/*onPress={() => this.props.navigation.navigate("MovieScreen")}*/}
                        {/*>*/}
                            {/*<Text>Goto EditScreen One</Text>*/}
                        {/*</Button >*/}
                        {/*<List>*/}
                            {/*{ this.state.data.map((v,i) =>*/}
                                {/*<ListItem*/}
                                    {/*thumbnail*/}
                                    {/*key={i}*/}
                                    {/*onPress= {()=>this.props.navigation.navigate("MovieScreen",{*/}
                                        {/*id:v.id,*/}
                                    {/*})}*/}
                                {/*>*/}
                                    {/*<Left>*/}
                                        {/*<Thumbnail source={{ uri: 'https://image.tmdb.org/t/p/w185/'+ v.poster_path }} />*/}
                                    {/*</Left>*/}
                                    {/*<Body>*/}
                                    {/*<Text>{v.title}</Text>*/}
                                    {/*<Text>{v.original_title}</Text>*/}
                                    {/*<Text note numberOfLines={1}>{v.overview}</Text>*/}
                                    {/*</Body>*/}
                                    {/*<Right>*/}
                                        {/*<Button transparent*/}

                                        {/*>*/}
                                            {/*<Text>View</Text>*/}
                                        {/*</Button>*/}
                                    {/*</Right>*/}
                                {/*</ListItem>*/}
                            {/*)}*/}
                        {/*</List>*/}
                    </View>
                    <View style={{paddingTop:0}}/>
                </Content>
            </Container>
        );
    }
}
