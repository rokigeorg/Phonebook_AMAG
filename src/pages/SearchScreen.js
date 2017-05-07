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

    constructor(props) {
        super(props);
        this.state = {
            searchMK: "",
            searchName: "",
            searchTel: ""
        }
    }

    onButtonPress() {
        const {navigation} = this.props;
        const {state, setParams, navigate} = navigation;
        const {params} = state;

        //get the AOM
        let AOM = params.AOM;
        //send Request to server
        let AMAGUsers = this.sendRequestToServer();
        //navigate to next screen
        //pass return values as para
        navigate('Results', {AOM: AOM, AMAGUser: AMAGUsers});

    }

    sendRequestToServer(_obj) {
        let {searchMK, searchName, searchTel} = this.state;

        if (searchMK != "") {
            //requests the Mitarbeiterkürzel from REST interface
            console.log(this.state.searchMK);
        }
        if (searchName != "") {
            //requests the Name from REST interface
            console.log(this.state.searchName);
        }
        if (searchTel != "") {
            //requests the Telefonnummer from REST interface
            console.log(this.state.searchTel);
        }

        return require('./../data/fbdata.json');
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

                <View style={styles.btnWrap}>
                    <Button
                        onPress={() => this.onButtonPress()}
                        title="Suche"
                        color="#000"
                        value="Suche"
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
        borderBottomColor: 'gray',
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
    btnWrap: {
        flex: 1,
        marginVertical: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});