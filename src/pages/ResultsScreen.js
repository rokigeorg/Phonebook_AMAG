import React from 'react';
import{
    View,
    Button,
    Text,
    StyleSheet,
    FlatList,
    ListView
} from 'react-native';

import {List} from 'react-native-elements';
import ListItem from './../components/ListItem'

export default class ResultsScreen extends React.Component {
    static navigationOptions = {
        title: 'Ergebnisliste',
    };

    constructor(props) {
        super(props);
    }

    _onPressItem = (_item) => {
        console.log("*******************");
        console.log(_item);
        console.log("*******************");
        let {navigate , state} = this.props.navigation;
        let {params} = state;
        let {AOM} = params;
        
        //change the screen to the detail view and pass the details to the screen
        navigate('Details', {AOM:AOM, detailsAMAGUser: _item});
        
    };

    render() {

        let {state} = this.props.navigation;
        let {params} = state;
        console.log("=============================================");
        console.log(params.AMAGUsers);
        return (<List style={styles.list}>
                <FlatList
                    data={params.AMAGUsers}
                    keyExtractor={item => item.data.id}
                    renderItem={({ item }) => (
                        <ListItem
                        item={item.data}
                        onPressItem={this._onPressItem}
                        />
                    )}
                />
            </List>
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20
    },
    list: {
        backgroundColor: '#e9e9ef'
    }
});