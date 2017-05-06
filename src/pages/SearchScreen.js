import React from 'react';
import{
    View,
    Button,
    AppRegistry,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';


export default class SearchScreen extends React.Component {
    static navigationOptions = {
        title: 'Suche',
        headerBackTitle: 'Back'
    };

    constructor(props){
        super(props);
        this.state = {
            searchMK:"",
            searchName:"",
            searchTel:""
        }
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.textField_2}>Mitarbeiterkürzel</Text>

                <View
                    style={styles.textInputWrap}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="mm-1234"
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({searchMK:text})}
                    />
                </View>

                <Text style={styles.textField_2}>Name</Text>
                <View
                    style={styles.textInputWrap}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Max Muster"
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({searchName:text})}
                    />
                </View>

                <Text style={styles.textField_2}>Telefonnummer</Text>
                <View
                    style={styles.textInputWrap}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="0123-456789"
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({searchTel:text})}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20
    },
    textInputWrap: {
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    },
    textInput: {
        fontSize: 20,
        height: 50,

    },
    textField_2: {
        fontSize: 10,
        color: 'gray',
        marginVertical: 5,
    },
});