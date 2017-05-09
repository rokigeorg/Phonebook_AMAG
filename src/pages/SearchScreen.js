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
            searchTel: "",
            resultsAOM: []
        }
    }

    onButtonPress() {
        const {navigation} = this.props;
        const {state, setParams, navigate} = navigation;
        const {params} = state;

        //get the AOM
        let AOM = params.AOM;
        //send Request to server
        this.sendRequestsToServer(AOM);


    }

    sendMkQuery(_objAOM) {
        let {searchMK} = this.state;
        // query statement
        let queryMk = "initials == \"" + searchMK + "\"";

        _objAOM.AMAGUser.getAMAGUsers(queryMk, {
                onOk: (result)=> {
                    console.log("---- sendMkQuery onOk Callback ***");
                    console.log(result);
                    if (result == []) {
                        //if the server has not found anything
                        this.setState({searchMK: ""});
                    } else {

                        return result;
                    }
                },
                onError: (err)=> {
                    console.log("*** Error in sendMkQuery *****")
                    console.log(err);
                }
            }
        );
    }

    sendRequestWithSearchNameQuery(_objAOM) {
        //requests the Name from REST interface
        let {searchName} = this.state;
        let queryBoth;

        //build the query
        let namesArr = searchName.split(" ");

        if (namesArr.length > 1) {
            queryBoth = "firstName == \"" + namesArr[0] + "\" OR lastName == \"" + namesArr[1] + "\"";

        } else {
            queryBoth = "firstName == \"" + namesArr[0] + "\" OR lastName == \"" + namesArr[0] + "\"";
        }

        _objAOM.AMAGUser.getAMAGUsers(queryBoth, {
                onOk: (result)=> {
                    console.log("---- sendRequestWithSearchNameQuery onOk Callback ***");
                    console.log(result);
                    if (result == []) {
                        //if the server has not found anything
                        this.setState({searchName: ""});
                    } else {
                        //if the server has found stuff
                        return result;
                    }
                },
                onError: (err)=> {
                    console.log(err);
                }
            }
        );
    }

    sendRequestWithSearchNameQuery(_objAOM) {
        return [];
    }

    sendRequestsToServer(_obj) {
        let {searchMK, searchName, searchTel} = this.state;
        let resultsArr = [];//TODO hier weiter machen

        let that = this;
        if (searchMK != "") {
            //requests the Mitarbeiterkürzel from REST interface
            console.log(this.state.searchMK);

            resultsArr = this.sendMkQuery(_obj);
        }
        if (searchName != "") {
            resultsArr = this.sendRequestWithSearchNameQuery(_obj,)
        }
        if (searchTel != "") {
            //requests the Telefonnummer from REST interface
            console.log(this.state.searchTel);
            this.sendRequestWithSearchNameQuery()
        }
        if (searchMK != "" || searchName != "" || searchTel != "") {
            that.changeScreens(_obj, that.state.resultsAOM); //TODO
        }


    }

    changeScreens(ApiomatObj, resultArr) {
        const {navigation} = this.props;
        let {navigate} = navigation;
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

                <Text style={styles.textField_2}>Name</Text>
                <View
                    style={styles.textInputWrap}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Max Muster"
                        keyboardType="phone-pad"
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