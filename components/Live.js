import React, { Component } from "react";
import {
  ActivityIndicator,
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import { Foundation } from "@expo/vector-icons";
import { purple, red, white } from "../utils/colors";
import { calculateDirection } from "../utils/helpers";

class Live extends Component {
  state = {
    coords: null,
    status: null,
    direction: "",
    bounceValue: new Animated.Value(1),
  };

  componentDidMount() {
    Location.getPermissionsAsync()
      .then(({ status }) => {
        if (status === "granted") {
          return this.setLocation();
        }
        this.setState({ status });
      })
      .catch((error) => {
        console.warn("Error getting location permission: ", error);
        this.setState({ status: "undetermined" });
      });
  }

  setLocation = () => {
    Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 1,
        distanceInterval: 1,
      },
      ({ coords }) => {
        const newDirection = calculateDirection(coords.heading);
        const { direction, bounceValue } = this.state;
        if (newDirection !== direction) {
          Animated.sequence([
            Animated.timing(bounceValue, {
              duration: 200,
              toValue: 1.04,
            }),
            Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
          ]).start();
        }
        this.setState(() => ({
          coords,
          status: "granted",
          direction: newDirection,
        }));
      }
    );
  };

  askPermission = () => {
    Location.requestPermissionsAsync()
      .then(({ status }) => {
        if (status === "granted") {
          return this.setLocation();
        }
        this.setState({ status });
      })
      .catch((error) => {
        console.warn("Error getting location permission: ", error);
        this.setState({ status: "undetermined" });
      });
  };

  render() {
    const { status, coords, direction, bounceValue } = this.state;
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
          <Animated.Text
            style={[styles.direction, { transform: [{ scale: bounceValue }] }]}
          >
            {direction}
          </Animated.Text>
        </View>
        <View style={styles.metricContainer}>
          <View style={styles.metric}>
            <Text style={[styles.header, { color: white }]}>Altitude</Text>
            <Text style={[styles.subHeader, { color: white }]}>
              {coords && Math.round(coords.altitude * 3.2808)} feet
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={[styles.header, { color: white }]}>Speed</Text>
            <Text style={[styles.subHeader, { color: white }]}>
              {coords && Math.round(coords.speed * 2.2369)} MPH
            </Text>
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
    fontSize: 70,
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
