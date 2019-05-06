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
//import styles from "../_Global/SideBar/style";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {articleActions} from "../../actions/article.actions";

class AboutUsScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            containerWidth: 1,
        };
    }


    static propTypes = {
        selectedArticlesTag: PropTypes.string.isRequired,
        selectedArticlesOffset: PropTypes.number.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired,
        starredRepos: PropTypes.array.isRequired,
        getTags: PropTypes.array.isRequired,
        totalCount: PropTypes.number.isRequired
    }


    componentDidMount() {

        const {dispatch, selectedArticlesTag, selectedArticlesOffset} = this.props
        // dispatch(fetchPostsIfNeeded(selectedArticlesTag))
        dispatch(articleActions.loadArticles(selectedArticlesTag, selectedArticlesOffset))
        dispatch(articleActions.loadArticleTags())
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedArticlesTag !== prevProps.selectedArticlesTag) {
            const {dispatch, selectedArticlesTag,} = this.props
            dispatch(articleActions.selectArticlesOffset(0))
            dispatch(articleActions.loadArticles(selectedArticlesTag, 0))
        }
        if (this.props.selectedArticlesOffset !== prevProps.selectedArticlesOffset) {
            const {dispatch, selectedArticlesTag, selectedArticlesOffset} = this.props
            dispatch(articleActions.loadArticles(selectedArticlesTag, selectedArticlesOffset))
        }
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


function mapStateToProps(state) {

    const {
        selectedArticlesTag,
        selectedArticlesOffset,
        pagination: {postsByTag},
        entities: {articlesTags, articles},
    } = state || {
        selectedArticlesTag: 'all',
        selectedArticlesOffset: 0
    }

    const {
        isFetching,
        ids,
        totalCount,
    } = postsByTag[selectedArticlesTag] || {
        isFetching: true,
        ids: [],
        totalCount: 1,
    }

    const getTags = articlesTags || []

    const starredRepos = ids.map(id => articles[id])
    return {
        selectedArticlesTag,
        selectedArticlesOffset,
        isFetching,
        starredRepos,
        getTags,
        totalCount,
    }
}

export default connect(mapStateToProps)(AboutUsScreen)

