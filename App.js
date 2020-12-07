import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {createStore} from "redux";
import {Provider} from 'react-redux';

import reducers from './store/reducers';

import AddEntry from "./components/AddEntry";


const store = createStore(reducers);

export default class App extends Component {

    handlePress = () => {
        alert('Button Clicked');
    };

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <AddEntry/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        backgroundColor: '#e53224',
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#fff',
    },
});
