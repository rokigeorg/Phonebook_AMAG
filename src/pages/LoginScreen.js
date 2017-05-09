import React from 'react';
import{
    StyleSheet,
    View,
    Button,
    Image,
    Text,
    TextInput,
    Alert
} from 'react-native';

//let Apiomat = require('../lib/apiomat_RN/apiomat');
let Apiomat = require('../lib/apiomat_rn_03/apiomat');

export default class LoginScreen extends React.Component {

    static navigationOptions = {
        title: 'Login',
        headerBackTitle: 'Logout'
    };

    constructor(props) {
        super(props);
        Apiomat.Datastore.setIsReact(true);
        this.state = {
            username: "",
            password: "",
            loggedIn: false,
            sendRequest: false
        }
    }

    onButtonPress() {

        //change SendRequet State
        !this.state.sendRequest ? this.setState({sendRequest: true}) : console.log("sendRequest");

        //get the input values from TextInput
       // let usr = "glenn" + new Date().getMilliseconds();//this.state.username;
        //let pw = "secret";//this.state.password;

        let usr= this.state.username;
        let pw = this.state.password;


        //check the input -> send it to the server
        let user = new Apiomat.User();
        user.setUserName(usr);
        user.setPassword(pw);

        Apiomat.Datastore.configureWithCredentials(user);
        var that = this;
        let saveCB = {
            onOk: function () {
                //call redirect function
                that.setState({loggedIn: true});

                console.log('***************in CB LoggedIn ??? *****');
                console.log(that.state.loggedIn);

                // switch screens after successful LDAP check
                that.validLDAP(Apiomat);
            },
            onError: function (error) {
                console.log(error);
            }
        };
        //user.save(saveCB);
        user.loadMe(saveCB);
        console.log('***************LoggedIn ??? *****');
        console.log(this.state.loggedIn);
        /*
         let Apiomate = {
         name: "ApiomatObj",
         fct: ()=>console.log("Say hey"),
         data1:[]}
         ;

        let retrunFromServer = false;
        //handle the server return
        if (retrunFromServer) {
            this.setState({loggedIn: true});
            console.log("loggedIn:", this.state.loggedIn);

            // switch screens after successful LDAP check
            this.validLDAP(Apiomat);
        }
         */

    };


    validLDAP(_obj) {
        console.log("****** Herer*********")
        const {navigate} = this.props.navigation;
        navigate('Search', {AOM: _obj});
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.imageContainer}>
                    <Image source={require('./../img/logoAmag.png')} style={styles.image}/>
                </View>


                <View style={styles.loginBox}>
                    <View style={styles.imageContainer2}>
                        <Image source={require('./../img/login_Img.png')} style={styles.image2}/>
                    </View>

                    <View>
                        <Text style={styles.textField_1}>Login</Text>
                    </View>

                    <View style={styles.inputsWrapper}>
                        <Text style={styles.textField_2}>Mitarbeiterkürzel</Text>

                        <View
                            style={this.state.sendRequest? this.loggedIn?styles.textInputWrap:styles.textInputWrapErr : styles.textInputWrap}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="mm-1234"
                                onChangeText={(text) => this.setState({username:text})}
                                keyboardType="phone-pad"
                                autoCorrect={false}
                            />
                        </View>

                        <Text style={styles.textField_2}>Password</Text>
                        <View
                            style={this.state.sendRequest? this.loggedIn?styles.textInputWrap:styles.textInputWrapErr : styles.textInputWrap}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="*****"
                                secureTextEntry={true}
                                autoCorrect={false}
                                onChangeText={(text) => this.setState({password:text})}
                            />
                        </View>
                    </View>

                </View>

                <View style={styles.btnWrap}>
                    <Button
                        onPress={() => this.onButtonPress()}
                        title="Login"
                        color="#000"
                        value="Login"
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
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        maxWidth: 400,
        maxHeight: 100,
        marginVertical: 20,
    },
    image: {
        flex: 1,
        maxWidth: null,
        maxHeight: null,
        resizeMode: 'contain',
    },
    btnWrap: {
        marginVertical: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    loginBox: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    imageContainer2: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        maxWidth: 200,
        maxHeight: 100,
        marginVertical: 20,
    },
    image2: {
        width: 200,
        height: 75,
        resizeMode: 'contain'
    },
    inputsWrapper: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        marginHorizontal: 20,
        width: 300,
    },
    textInput: {
        fontSize: 20,
        height: 50,

    },
    textField_1: {
        fontSize: 25,
    },
    textField_2: {
        fontSize: 10,
        color: 'gray',
        marginVertical: 5,
    },
    textInputWrap: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    textInputWrapErr: {
        borderBottomWidth: 1,
        borderBottomColor: 'red',
    }
});
