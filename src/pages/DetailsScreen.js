import React from 'react';
import{
    View,
    Button,
    Image,
    Text,
    StyleSheet,
} from 'react-native';

import DetailListItem from './../components/DetailListItem'

export default class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: 'Detailansicht',
    };

    render() {
        let {state} = this.props.navigation;
        let {params} = state;
        let {detailsAMAGUser} = params;

        let addressAmagUser = detailsAMAGUser.imWorkCity +" \n"+ detailsAMAGUser.imHomeTown;// + ", "
           // + detailsAMAGUser.addressZipcode+" " +detailsAMAGUser.addressCity;

        return (
            <View style={styles.wrapper}>

                <View style={styles.headerWrap}>
                    <Text style={styles.textField_1}>{`${detailsAMAGUser.givenName} ${detailsAMAGUser.sn}`}</Text>
                    <Text style={styles.textField_2}> {detailsAMAGUser.organization}</Text>

                    <View style={styles.touchIconWrap}>
                        <Image
                            source={require('./../img/0_home.png')}
                            style={styles.touchIcon}
                        />
                        <Image
                            source={require('./../img/0_phone.png')}
                            style={styles.touchIcon}
                        />
                    </View>
                </View>

                <View stlye={styles.infosWrap}>

                    <DetailListItem describtion="Telefon" userDetail={detailsAMAGUser.telephoneNumber}/>
                    <DetailListItem describtion="Mobil" userDetail={detailsAMAGUser.mobile}/>
                    <DetailListItem describtion="Mail" userDetail={detailsAMAGUser.mail}/>
                    <DetailListItem describtion="Adresse" userDetail={addressAmagUser}/>
                    <DetailListItem describtion="Kürzel" userDetail={detailsAMAGUser.userName}/>
                    <DetailListItem describtion="Sprache" userDetail={detailsAMAGUser.imLanguageDescription}/>
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
    headerWrap: {
        flex: 1,
        maxHeight: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:20,
    },
    touchIconWrap: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 64,
        width:300,
        justifyContent: 'center',
        alignContent: 'center',
    },
    infosWrap:{
        marginTop:50,
        flexDirection:'column',
        width:'100%',
    },
    touchIcon: {
        flex: 1,
        height: 64,
        width: 64,
        resizeMode: 'contain',
        marginHorizontal:10,
    },
    textField_1:{
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom:10,
    },
    textField_2:{
        fontSize: 20,
        marginBottom:10,
    }
});