import React from "react";
import {AppRegistry, Alert, Modal, Image, StyleSheet, Platform, TouchableOpacity} from "react-native";

import {
    Spinner,
    Text,
    Item,
    View,
    Content,
    Container,
    Header,
    Title,
    Button,
    Icon,
    Left,
    InputGroup,
    Input,
    ListItem,
    List,
    Radio,
    CheckBox,
    Thumbnail,
    Card,
    CardItem,
    H3,
    Body, Right
} from "native-base";
import axios from "axios";
import styles from './styles/SearchScreen'

export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radio1 : true,
            check1: false,
            modalVisible: false,
            search: '',
            selectedItem: undefined,
            results: [],
        }
    }

    static navigationOptions = ({ navigation }) => ({

    });

    _configureTransition(transitionProps, prevTransitionProps) {
        return {
            // duration in milliseconds, default: 250
            duration: 500,
            // An easing function from `Easing`, default: Easing.inOut(Easing.ease)
            easing: Easing.bounce,
        }
    }

    setModalVisible(visible, x) {
        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
    }

    toggleCheck() {
        this.setState({
            check1 : !this.state.check1
        })
    }
    componentDidMount() {

        var that = this;
        //this.search();

    }

    search() {
        // Set loading to true when the search starts to display a Spinner

        if(this.state.search != '')
        {
            this.setState({
                loading: true
            });

            var that = this;
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4b0de8890a276146ec8b14bcf7c9db71&language=zh-CN&page=1&include_adult=false&query=${this.state.search}`)
                .then(res => {
                    that.setState({
                        results: res.data.results,
                        loading: false
                    });

                    return true;
                })
                .catch((error) => {

                    that.setState({
                        loading: false
                    });

                    console.error(error);
                });
        }
        else{
            alert("请正确输入电影名");
        }
    }

    _resetSearch(){
        this.setState(
            {
                search:'',
                results: []
            });
    }

    render() {
        var that = this;

        let button;

        if (this.state.search != '') {
            button =(
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._resetSearch()}}>
                  <Icon name="ios-close-circle" />
                </TouchableOpacity>);
        }

        return (
            <Container>
                <Header searchBar rounded>
                    <Item rounded>
                        <Icon name="ios-search" />
                        <Input autoFocus={true} value = {this.state.search} placeholder="请输入电影名" onChangeText={(text) => this.setState({search:text})} onSubmitEditing={()=>this.search()}/>
                        {button}
                    </Item>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Text>返回</Text>
                    </Button>
                </Header>
                <Content>
                    {this.state.loading? <Spinner /> : <List dataArray={this.state.results} renderRow={(item) =>
                        <ListItem style={{height:100}} thumbnail onPress= {()=>this.props.navigation.navigate("MovieScreen",{id:item.id})}>
                            <Left>
                                <Thumbnail square style={{height: 80}} source={{ uri: 'https://image.tmdb.org/t/p/w185/'+ item.poster_path }} />
                            </Left>
                            <Body style={{height:90}}>
                                <Text style={{fontWeight: '600'}}>{item.original_title}</Text>
                            </Body>
                        </ListItem>
                    } />}
                </Content>
            </Container>
        );
    }
}


