import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import { purple, red, white } from "../utils/colors";

class Live extends Component {
  state = {
    coords: null,
    status: "granted",
    direction: "",
  };

  askPermission = () => {};

  render() {
    const { status, coords, direction } = this.state;
    if (status === null) return <ActivityIndicator style={{ marginTop: 30 }} />;
    if (status === "denied")
      return (
        <View style={styles.center}>
          <Foundation name={"alert"} size={50} color={red} />
          <Text style={{ color: red }}>
            Location services has been denied. Go to your settings to enable
            services.
          </Text>
        </View>
      );
    if (status === "undetermined")
      return (
        <View style={styles.center}>
          <Foundation name={"alert"} size={50} color={red} />
          <Text style={{ color: red }}>
            Please enable location services for this section.
          </Text>
          <TouchableOpacity onPress={this.askPermission} style={styles.button}>
            <Text style={styles.buttonText}>Enable</Text>
          </TouchableOpacity>
        </View>
      );
    return (
      <View style={styles.container}>
        <View style={styles.directionContainer}>
          <Text style={styles.header}>You are heading</Text>
          <Text style={styles.direction}>North</Text>
        </View>
        <View style={styles.metricContainer}>
          <View style={styles.metric}>
            <Text style={[styles.header, { color: white }]}>Altitude</Text>
            <Text style={[styles.subHeader, { color: white }]}>{200} feet</Text>
          </View>
          <View style={styles.metric}>
            <Text style={[styles.header, { color: white }]}>Speed</Text>
            <Text style={[styles.subHeader, { color: white }]}>{200} MPH</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Live;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    backgroundColor: purple,
    padding: 10,
    alignSelf: "center",
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: white,
    fontSize: 20,
  },
  directionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 35,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 25,
    marginTop: 5,
    textAlign: "center",
  },
  direction: {
    color: purple,
    fontSize: 120,
    textAlign: "center",
  },
  metricContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: purple,
  },
  metric: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});
