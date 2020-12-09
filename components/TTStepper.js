import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

import { gray, purple, white } from "../utils/colors";

const TTStepper = ({ max, unit, step, value, onIncrement, onDecrement }) => {
  return (
    <View style={[styles.row, { justifyContent: "space-between" }]}>
      {Platform.OS === "ios" ? (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.iosButton,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onPress={onDecrement}
          >
            <Entypo name={"minus"} size={30} color={purple} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iosButton,
              { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
            ]}
            onPress={onIncrement}
          >
            <Entypo name={"plus"} size={30} color={purple} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.androidButton} onPress={onDecrement}>
            <FontAwesome name={"minus"} size={30} color={white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.androidButton} onPress={onIncrement}>
            <FontAwesome name={"plus"} size={30} color={white} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.metricCounter}>
        <Text style={{ fontSize: 24, textAlign: "center" }}>{value}</Text>
        <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
      </View>
    </View>
  );
};

export default TTStepper;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  iosButton: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  androidButton: {
    backgroundColor: purple,
    borderRadius: 2,
    margin: 5,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
  metricCounter: {
    width: 85,
    justifyContent: "center",
    alignItems: "center",
  },
});
