import React from 'react';
import {View, Text, Slider, StyleSheet} from "react-native";
import {gray} from "../utils/colors";


const TTSlider = ({max, unit, step, value, onChange}) => {
  return (
    <View style={styles.row}>
      <Slider value={value}
              style={{flex: 1}}
              minimumValue={0}
              maximumValue={max}
              step={step}
              onValueChange={onChange}/>
      <View style={styles.metricCounter}>
          <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
          <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
  );
};

export default TTSlider;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    metricCounter: {
        width: 85,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
