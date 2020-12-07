import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {connect} from 'react-redux';

import {getDailyReminderValue, getMetricMetaInfo, timeToString} from "../utils/helpers";

import TTSlider from "./TTSlider";
import TTStepper from "./TTStepper";
import DateHeader from "./DateHeader";
import TextButton from "./TextButton";
import {resetEntry, submitEntry} from "../utils/api";
import {addEntry} from "../store/actions/actionCreators";


const SubmitButton = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={styles.btnText}>Add Entries</Text>
        </TouchableOpacity>
    );
};


class AddEntry extends Component {

    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    }

    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric);
        this.setState((state) => {
            const count = state[metric] + step;
            return {
                ...state,
                [metric]: count > max ? max : count,
            };
        });
    };

    decrement = (metric) => {
        const {step} = getMetricMetaInfo(metric);
        this.setState((state) => {
            const count = state[metric] - step;
            return {
                ...state,
                [metric]: count < 0 ? 0 : count,
            };
        });
    };

    slide = (metric, value) => {
        this.setState(() => {
            return {
                [metric]: value,
            };
        });
    };

    submit = () => {
        const key = timeToString();
        const entry = this.state;

        // update redux
        this.props.dispatch(addEntry({
            [key]: entry,
        }));

        this.setState({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0,
        });

        // TODO: navigate to home

        // save to db (AsyncStorage)
        submitEntry({entry, key});

        // TODO: clear local notification
    };

    reset = () => {
        const key = timeToString();

        // update redux
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue(),
        }))

        // TODO: navigate to home

        // update db (AsyncStorage)
        resetEntry(key);
    };

    render() {
        const metaInfo = getMetricMetaInfo();

        if (this.props.alreadyLogged) {
            return (
                <View>
                    <Ionicons name={"ios-happy"} size={100} color={"black"}/>
                    <Text>You already logged your information for today.</Text>
                    <TextButton onPress={this.reset}>Reset</TextButton>
                </View>
            );
        }

        return (
            <View>
                <DateHeader date={(new Date()).toLocaleDateString()}/>

                {Object.keys(metaInfo).map((key) => {
                    const {getIcon, type, ...rest} = metaInfo[key];
                    const value = this.state[key];
                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider'
                                ? <TTSlider value={value}
                                            onChange={(value) => this.slide(key, value)}
                                            {...rest}/>
                                : <TTStepper value={value}
                                             onIncrement={() => this.increment(key)}
                                             onDecrement={() => this.decrement(key)}
                                             {...rest}/>}
                        </View>
                    );
                })}

                <SubmitButton onPress={this.submit}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const key = timeToString();
    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    };

}

export default connect(mapStateToProps)(AddEntry);


const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#e53224',
        marginTop: 10,
        marginBottom: 10,
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
