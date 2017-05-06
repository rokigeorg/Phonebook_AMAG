import React from 'react';
import{
View,
Button,
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Detailansicht',
  };
  render() {
    return (
      <View>
        <Text>Dteails Page</Text>
      </View>
    );
  }
}
