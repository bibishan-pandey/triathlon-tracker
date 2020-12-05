import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import TTSlider from "./TTSlider";
import Stepper from "./Stepper";
import DateHeader from "./DateHeader";

import {getMetricMetaInfo, timeToString} from "../utils/helpers";


const SubmitButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnText}>Add Entries</Text>
    </TouchableOpacity>
  );
};


export default class AddEntry extends Component {

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

    // TODO: update redux

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    });

    // TODO: navigate to home
    // TODO: save to db
    // TODO: clear local notification
  };

  render() {
    const metaInfo = getMetricMetaInfo();
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
                : <Stepper value={value}
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

const styles = StyleSheet.create({
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
