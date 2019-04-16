//
// import React, { Component } from "react";
// import { createStackNavigator } from 'react-navigation';
//
import HomeScreen from "./HomeScreen";
import MovieScreen from "./MovieScreen";
import SearchScreen from "./SearchScreen";
import PersonScreen from "./PersonScreen";
import VideoScreen from "./VideoScreen";
import MovieListScreen from "./MovieListScreen";
//
// export const Home = createStackNavigator(
//     {
//         Home: { screen: HomeScreen },
//         MovieScreen: { screen: MovieScreen },
//         MovieListScreen: { screen: MovieListScreen},
//         SearchScreen: { screen: SearchScreen },
//         PersonScreen: { screen: PersonScreen },
//         VideoScreen: { screen: VideoScreen },
//     },
//     {
//         initialRouteName: "Home",
//         headerMode: "none"
//
//     }
// );

import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";


const AppNavigator = createStackNavigator(
    {
        Home: { screen: HomeScreen },
        MovieScreen: { screen: MovieScreen },
        MovieListScreen: { screen: MovieListScreen},
        SearchScreen: { screen: SearchScreen },
        PersonScreen: { screen: PersonScreen },
        VideoScreen: { screen: VideoScreen },
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
    }
);

export default createAppContainer(AppNavigator);
