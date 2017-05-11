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
        let {searchMK, searchName, searchTel} = this.state;
        let resultsArr = [];//TODO hier weiter machen

        let that = this;
        if (searchMK != "") {
            //requests the Mitarbeiterkürzel from REST interface
            console.log(this.state.searchMK);

            let queryMk = "initials == \""+searchMK+"\"";

            resultsArr = _obj.AMAGUser.getAMAGUsers(queryMk, {
                    onOk: (result)=> {
                        console.log("----*** searchMK");
                        console.log(result);
                        that.setState({resultsAOM: that.state.resultsAOM.push(result)}); //TODO
                        that.changeScreens(_obj,result);
                    },
                    onError: (err)=> {
                        console.log(err);
                    }
                }
            );

        }
        if (searchName != "") {
            //requests the Name from REST interface
            console.log(this.state.searchName);
            let queryBoth ;
            let namesArr = searchName.split(" ");

            if(namesArr.length >1){
                queryBoth = "firstName == \""+namesArr[0]+"\" OR lastName == \""+namesArr[1]+"\"";

            }else{
                queryBoth = "firstName == \""+namesArr[0]+"\" OR lastName == \""+namesArr[0]+"\"";
            }

            resultsArr = _obj.AMAGUser.getAMAGUsers(queryBoth, {
                    onOk: (result)=> {
                        console.log("----*** searchName");
                        console.log(result);
                        that.setState({resultsAOM: that.state.resultsAOM.push(result)});
                        that.changeScreens(_obj,that.state.resultsAOM); //TODO
                    },
                    onError: (err)=> {
                        console.log(err);
                    }
                }
            );
        }
        if (searchTel != "") {
            this.getUserByTel(searchTel, _obj, that)

        }

        return resultsArr;
        //return require('./../data/fbdata.json');
    }

    getUserByTel (searchTel, _obj, that) {
        let resultsArr = [];
        let queryTel = "telephone == \""+searchTel+"\"";

        resultsArr = _obj.AMAGUser.getAMAGUsers(queryTel, {
                onOk: (result)=> {
                    console.log("----*** searchTel");
                    console.log(result);
                    that.setState({resultsAOM: that.state.resultsAOM.push(result)}); //TODO
                    that.changeScreens(_obj,result);
                },
                onError: (err)=> {
                    console.log(err);
                }
            }
        );
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