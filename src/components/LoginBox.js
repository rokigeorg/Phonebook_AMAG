/**
 * Created by georgrokita on 05.05.17.
 */

import React from 'react';
import{
    StyleSheet,
    View,
    Button,
    Image,
    Text,
    TextInput,
} from 'react-native';


export default class LoginBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    render() {
        return (
            <View style={styles.loginBox}>
                <View style={styles.imageContainer}>
                    <Image source={require('./../img/login_Img.png')} style={styles.image}/>
                </View>

                <View>
                    <Text style={styles.textField_1}>Login</Text>
                </View>

                <View style={styles.inputsWrapper}>
                    <Text style={styles.textField_2}>Mitarbeiterkürzel</Text>

                    <View style={styles.textInputWrap}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="jb-1234"
                        />
                    </View>

                    <Text style={styles.textField_2}>Password</Text>
                    <View style={styles.textInputWrap}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="*****"
                            secureTextEntry={true}
                        />
                    </View>
                </View>

            </View>
        );
    }

}


const styles = StyleSheet.create({
    loginBox: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    imageContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        maxWidth: 200,
        maxHeight: 100,
        marginVertical: 20,
    },
    image: {
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
        color: '#CCC',
        marginVertical: 5,
    },
    textInputWrap: {
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    }
});
