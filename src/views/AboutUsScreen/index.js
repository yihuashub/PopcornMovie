
import React, { Component } from "react";
import AboutUsScreen from "./AboutUsScreen";
import UserAgreementScreen from './UserAgreementScreen'

import { createStackNavigator, createAppContainer } from "react-navigation";


const AppNavigator = createStackNavigator(
    {
        AboutUsScreen: { screen: AboutUsScreen },
        UserAgreementScreen: { screen: UserAgreementScreen },
    },
    {
        initialRouteName: 'AboutUsScreen',
        headerMode: 'none',
    }
);

export default createAppContainer(AppNavigator);
