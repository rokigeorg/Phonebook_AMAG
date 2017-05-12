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
            firstName: "",
            lastName: "",
            searchTel: "",
            resultsAOM:[]
        }
    }

    onButtonPress() {
        const {navigation} = this.props;
        const {state, setParams, navigate} = navigation;
        const {params} = state;

        //get the AOM
        let AOM = params.AOM;
        //send Request to server
        this.sendRequestToServer(AOM);


    }

    sendRequestToServer(_obj) {
        let {searchMK, firstName, lastName, searchTel} = this.state;
        let resultsArr = [];//TODO hier weiter machen

        let queryMk = ''
        let queryFirstName = ''
        let queryLastName = ''
        let queryTel = ''
        let that = this;
        if (searchMK != "") {
            queryMk = "userName == \""+searchMK+"\"";
        }
        if (firstName != '') {
            let queryOrFirstName = ''
            if (searchMK != "") {
                queryOrFirstName = ' and '
            }
            queryFirstName = queryOrFirstName + "givenName like \""+firstName+"\"";
        }
        if (lastName != '') {
            let queryOrLastName = ''
            if (searchMK != "" || firstName != "") {
                queryOrLastName = ' and '
            }
            queryLastName = queryOrLastName + "sn like \""+lastName+"\"";
        }
        if (searchTel != "") {
            let queryOrTel = ''
            if (searchMK != "" || firstName != "" || lastName != "") {
                queryOrTel = ' and '
            }
            let searchTelReplaced = searchTel.replace('+', '')
            queryTel = queryOrTel + "telephoneNumber like \""+searchTelReplaced+"\"";
        }
        let query = queryMk + queryFirstName + queryLastName + queryTel
        console.log('quuuuery', query)

        resultsArr = _obj.AMAGUser.getAMAGUsers(query, {
                onOk: (result)=> {
                    //that.setState({resultsAOM: that.state.resultsAOM.push(result)}); //TODO
                    that.changeScreens(_obj,result);
                },
                onError: (err)=> {
                    console.log(err);
                }
            }
        );

        return resultsArr

    }


    changeScreens(ApiomatObj, resultArr){
        const {navigation} = this.props;
        let { navigate} = navigation;
        //navigate to next screen
        //pass return values as para
        navigate('Results', {AOM: ApiomatObj, AMAGUsers: resultArr});
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
                        keyboardType="phone-pad"
                        onChangeText={(text) => this.setState({searchMK:text})}
                    />
                </View>

                <Text style={styles.textField_2}>Vorname</Text>
                <View
                    style={styles.textInputWrap}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Max"
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({firstName:text})}
                    />
                </View>

                <Text style={styles.textField_2}>Nachname</Text>
                <View
                    style={styles.textInputWrap}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Muster"
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({lastName:text})}
                    />
                </View>

                <Text style={styles.textField_2}>Telefonnummer</Text>
                <View
                    style={styles.textInputWrap}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="0123-456789"
                        autoCorrect={false}
                        keyboardType="numeric"
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