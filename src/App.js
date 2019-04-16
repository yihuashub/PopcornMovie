import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore'
import MyApp from './views/Root'
//import HomeScreen from "./views/HomeScreen/index.js";

const store = configureStore()
export default class App extends Component<Props> {
    render(){
        return(
            <Provider store= {store}>
                <MyApp />
            </Provider>
        );
    }
}
