import React from 'react';
import{
View,
Button,
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Suche',
  };
  render() {
    return (
      <View>
        <Text>Search Page</Text>
      </View>
    );
  }
}
