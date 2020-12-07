import React from 'react';
import {View, Text, Slider, StyleSheet} from "react-native";


const TTSlider = ({max, unit, step, value, onChange}) => {
  return (
    <View>
      <Slider value={value}
              minimumValue={0}
              maximumValue={max}
              step={step}
              onValueChange={onChange}/>
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
};

export default TTSlider;
