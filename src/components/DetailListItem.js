/**
 * Created by georgrokita on 08.05.17.
 */
/**
 * Created by georgrokita on 07.05.17.
 */
import React from 'react';
import{
    View,
    Button,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
} from 'react-native';


export default class DetailListItem extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.descWrap}>
                    <View style={styles.imageWrap}>
                        <Image
                            source={require('./../img/0_minus.png')}
                            style={styles.image}
                        />

                    </View>
                    <Text style={styles.TextField_1}> {this.props.describtion}</Text>
                </View>

                <View style={styles.infolWrap}>
                    <Text>{this.props.userDetail}</Text>

                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        flexDirection: 'row',
        marginBottom:20,
    },
    descWrap: {
        flex:1,
        flexDirection:'row',
        borderRightWidth: 1,
        borderRightColor: 'gray',
        height: 35,
        alignItems:'center',
    },
    infolWrap: {
        marginLeft: 10,
        width:"70%",
        paddingLeft:10,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    imageWrap:{
        flex: 1,
        height: 32,
        width: 32,
    },
    image: {
        flex: 1,
        height: 32,
        width: 32,
        resizeMode: 'contain',
        marginRight: 10,
    },
    TextField_1:{
        color:"gray",


    }
});