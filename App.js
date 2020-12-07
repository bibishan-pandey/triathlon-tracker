import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import AddEntry from "./components/AddEntry";


export default class App extends Component {

    handlePress = () => {
        alert('Button Clicked');
    };

    render() {
        return (
            <View style={styles.container}>
                <AddEntry/>

                {/*<TouchableHighlight style={styles.btn} onPress={this.handlePress} underlayColor={'#d4271b'}>*/}
                {/*  <Text style={styles.btnText}>Touchable</Text>*/}
                {/*</TouchableHighlight>*/}

                {/*<TouchableOpacity style={styles.btn} onPress={this.handlePress}>*/}
                {/*  <Text style={styles.btnText}>Touchable</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableWithoutFeedback onPress={this.handlePress}>*/}
                {/*  <View style={styles.btn}><Text style={styles.btnText}>Touchable</Text></View>*/}
                {/*</TouchableWithoutFeedback>*/}

                {/*<TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this.handlePress}>*/}
                {/*  <View style={styles.btn}><Text style={styles.btnText}>Touchable</Text></View>*/}
                {/*</TouchableNativeFeedback>*/}
            </View>
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
