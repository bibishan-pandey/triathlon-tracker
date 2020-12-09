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
    status: "undetermined",
    direction: "",
  };

  askPermission = () => {};

  render() {
    const { status, coords, direction } = this.state;
    if (status === null) return <ActivityIndicator style={{ marginTop: 30 }} />;
    if (status === "denied")
      return (
        <View>
          <Text>Denied!</Text>
        </View>
      );
    if (status === "undetermined")
      return (
        <View style={styles.center}>
          <Foundation name={"alert"} size={50} color={red} />
          <Text style={{ color: red }}>
            Please enable location services for this section
          </Text>
          <TouchableOpacity onPress={this.askPermission} style={styles.button}>
            <Text style={styles.buttonText}>Enable</Text>
          </TouchableOpacity>
        </View>
      );
    return (
      <View>
        <Text>Live View</Text>
        <Text>{JSON.stringify(this.state)}</Text>
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
});
