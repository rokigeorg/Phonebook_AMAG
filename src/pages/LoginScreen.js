import React from 'react';
import{
    StyleSheet,
    View,
    Button,
    Image,
    Text,
} from 'react-native';

import LoginBox from './../components/LoginBox';

export default class LoginScreen extends React.Component {

    static navigationOptions = {
        title: 'Login',
    };

    constructor(props) {
        super(props);
    }

    onButtonPress(){
        
    }
    
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.imageContainer}>
                    <Image source={require('./../img/logoAmag.png')} style={styles.image}/>
                </View>

                <LoginBox />

                <View style={styles.btnWrap}>
                    <Button
                        onPress={() => navigate('Search')}
                        title="Login"
                        color="#000"
                    />
                </View>

            </View>
        );
        const {navigate} = this.props.navigation;
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
        marginVertical:25,
        alignItems: 'center',
        justifyContent:'flex-end',
    },
});
