import React from 'react';
import{
View,
Button,
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';


export default class ResultsScreen extends React.Component {
  static navigationOptions = {
    title: 'Ergebnisliste',
  };
  render() {
    return (
      <View>
        <Text>Results Page</Text>
      </View>
    );
  }
}
