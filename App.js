import React from 'react';
import{
    View,
    Button,
    AppRegistry,
    Text,
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import LoginScreen from './src/pages/LoginScreen'
import SearchScreen from './src/pages/SearchScreen'
import ResultsScreen from './src/pages/ResultsScreen'
import DetailsScreen from './src/pages/DetailsScreen'


const SimpleApp = StackNavigator({
    Login: {screen: LoginScreen},
    Search: {screen: SearchScreen},
    Results: {screen: ResultsScreen},
    Details: {screen: DetailsScreen}
}, {
    initialRouteName: 'Login',
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
