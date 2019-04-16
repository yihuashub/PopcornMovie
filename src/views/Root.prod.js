
import React, { Component } from "react";

import HomeScreen from "./HomeScreen/index.js";
//import MainScreenNavigator from "./ChatScreen/index.js";
import SideBar from "./_Global/SideBar/SideBar.js";
import AboutUsScreen from './AboutUsScreen/index'
import { createDrawerNavigator,createAppContainer } from 'react-navigation'

const MyDrawerNavigator = createDrawerNavigator({
    Home:{
        screen: HomeScreen,
    },
    AboutUs: {
        screen: AboutUsScreen,
    },
},{
    initialRouteName: "Home",
    contentOptions: {
        activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
});

export default createAppContainer(MyDrawerNavigator);
