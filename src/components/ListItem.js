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


export default class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {itemId: null};

    }

    _onPressButton(){
        //let id = this.props.item;
        let onPressItem = this.props.onPressItem;

        // call the onPressItem func from the FlatList Component
        onPressItem(this.props.item);
    }


    render() {
        let item = this.props.item;
        return (
        <TouchableHighlight onPress={()=>this._onPressButton(this)} >
            <View style={styles.wrapper}>
                <Text style={styles.textField_1}>{`${item.firstName} ${item.lastName}`}</Text>
                <View style={styles.tcWrap}>

                    <Text style={styles.textField_2}>{`${item.organization}`}</Text>

                    <View style={styles.iconsWrap}>
                        <Image source={require('./../img/home_icon.png')} style={styles.image}/>
                        <Image source={require('./../img/phone_icon.png')} style={styles.image}/>

                    </View>

                </View>
            </View>
        </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex:1,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        height: 65,
        marginLeft: 20,
        paddingVertical: 10,
        flexDirection: 'column',
    },
    tcWrap: {
        flexDirection: 'row',
        marginTop: 5,

    },
    iconsWrap: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 150,
        height:15,
    },
    textField_1: {
        fontSize: 15,
    },
    textField_2: {
        fontSize: 15,
    },
    image: {
        flex: 1,
        maxWidth: 25,
        maxHeight: 25,
        resizeMode: 'contain',
        marginRight: 25,
    }
});