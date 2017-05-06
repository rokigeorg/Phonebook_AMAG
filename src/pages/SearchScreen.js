import React from 'react';
import{
    View,
    Button,
    AppRegistry,
    Text,
    StyleSheet,
} from 'react-native';


export default class SearchScreen extends React.Component {
    static navigationOptions = {
        title: 'Suche',
        headerBackTitle: 'Back'
    };

    render() {
        return (
            <View style={styles.wrapper}>
                <View
                    style={styles.textInputWrap}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="*****"
                        secureTextEntry={true}
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({password:text})}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20
    }
});