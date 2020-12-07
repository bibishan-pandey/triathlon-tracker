import React, {Component} from 'react';
import {
    StyleSheet,
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
        backgroundColor: '#fff',
        paddingTop: 30,
    },
});
