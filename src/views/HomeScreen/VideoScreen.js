import {NavigationActions, withNavigation} from "react-navigation";
import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    PixelRatio,
    Dimensions,
    Platform,
    Image
} from 'react-native';

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
    H2,
    Text,
    Content,
    Badge,
    Thumbnail,
    List,ListItem
} from "native-base";

import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import styles from './styles/VideoScreen'
class VideoScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadData: false,
            isReady: false,
            status: null,
            quality: null,
            error: null,
            isPlaying: true,
            isLooping: true,
            duration: 0,
            currentTime: 0,
            fullscreen: false,
            containerMounted: false,
            containerWidth: null,
            videosIndex:0,
            videosList: [],
            trailersList:[],
            youtubeVideos:[]
        };
    }
    componentDidMount() {
        const {navigation} = this.props;
        this.state.trailersList = navigation.getParam('trailersList', 'NO-LIST');
        this._ProcessVideos()
    };

    _ProcessVideos(){
        this.state.trailersList.map((video) => {
            this._retrieveYoutubeDetails(video.key);
            const youtube = this.state.youtubeVideos;
            youtube.push(video.key);
        });

        this._initIndex();
    }

    _retrieveYoutubeDetails(key) {
        axios.get(`https://www.googleapis.com/youtube/v3/videos/?id=${key}&key=AIzaSyBQmqz6VFfQhXDSQ-RSUzWtzF4OcBxwSZM&part=snippet`)
            .then(res => {
                const data = this.state.videosList;
                data.push(res.data.items[0]);
                this.setState({loadData:true});
            })
            .catch(error => {
                console.log(error); //eslint-disable-line
            });
    }

    _initIndex(){
        if(this.state.status == 'playing')
        {
            this._youTubeRef &&
            this._youTubeRef
                .videosIndex()
                .then(index => this.setState({ videosIndex: index }))
                .catch(errorMessage => this.setState({ error: errorMessage }));
        }
    }

    _renderBottom(i) {
        this.setState({ videosIndex: i });
        this._youTubeRef.playVideoAt(i);
    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container onLayout={({ nativeEvent: { layout: { width } } }) => {
                if (!this.state.containerMounted) this.setState({ containerMounted: true });
                if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
            }}>
                <Header>
                    <Left>
                        <Button transparent onPress={() =>this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title> 预告片</Title>
                    </Body>
                    <Right />
                </Header>
                <View>
                    {this.state.containerMounted && this.state.loadData ? (
                        <YouTube
                            ref={component => {
                                this._youTubeRef = component;
                            }}
                            // You must have an API Key for the player to load in Android
                            apiKey="AIzaSyBQmqz6VFfQhXDSQ-RSUzWtzF4OcBxwSZM"
                            // Un-comment one of videoId / videoIds / playlist.
                            // You can also edit these props while Hot-Loading in development mode to see how
                            // it affects the loaded native module
                            //videoId="ncw4ISEU5ik"
                            videoIds={this.state.youtubeVideos}
                            // playlistId="PLF797E961509B4EB5"
                            play={this.state.isPlaying}
                            loop={this.state.isLooping}
                            fullscreen={this.state.fullscreen}
                            controls={1}
                            style={[
                                { height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9)) },
                                styles.player,
                            ]}
                            onError={e => this.setState({ error: e.error })}
                            onReady={e => this.setState({ isReady: true })}
                            onChangeState={e => this.setState({ status: e.state })}
                            onChangeQuality={e => this.setState({ quality: e.quality })}
                            onChangeFullscreen={e => this.setState({ fullscreen: e.isFullscreen })}
                            onProgress={e => this.setState({ duration: e.duration, currentTime: e.currentTime })}
                        />
                    ) :(
                        <View
                            style={{
                                flexDirection: 'row',
                                height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9)),
                                backgroundColor: "black",
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text style={{color:"white"}}>视频加载中...</Text>
                        </View>
                        )}
                </View>
                <View style={styles.listHeaderTitle}><Text style={styles.listHeaderText}>视频列表</Text></View>
                <Content>
                    {/*<List>*/}
                        {/*{ this.state.videosList.map((movie,i) =>*/}
                            {/*<ListItem thumbnail transparent key={i} onPress={()=> this._renderBottom(i)}>*/}
                                {/*<Left>*/}
                                    {/*<Thumbnail square source={{ uri: `${movie.snippet.thumbnails.medium.url}` }} />*/}
                                {/*</Left>*/}
                                {/*<Body>*/}
                                {/*<Text>{movie.snippet.title}</Text>*/}
                                {/*</Body>*/}
                                {/*<Right>*/}
                                    {/*{this.state.videosIndex === i ? (iconPlay) : (iconPaus)}*/}
                                {/*</Right>*/}
                            {/*</ListItem>*/}
                        {/*)}*/}
                    {/*</List>*/}

                    <View style={styles.containers}>
                        {
                            this.state.loadData ?
                            this.state.videosList.map((item, index) => (
                                <TouchableOpacity key={index} onPress={()=> this._renderBottom(index)}>
                                    <View style={styles.thumbnailContainer}>
                                        {this.state.videosIndex === index ? (iconPaus) : (iconPlay)}
                                        <Image source={{ uri: `${item.snippet.thumbnails.medium.url}` }} style={styles.thumbnail} />
                                        <Text style={styles.title}>{item.snippet.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            )): <Text>加载中</Text>
                        }
                    </View>
                </Content>
    </Container>
        );
    }
}


const iconPlay = (<Icon name="ios-play" size={60} color="#F5B642" style={styles.icon}/>);
const iconPaus = (<Icon name="ios-pause" size={60} color="#F5B642" style={styles.icon}/>);
export default withNavigation(VideoScreen);
