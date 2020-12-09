import React, { Component } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";

class Live extends Component {
  state = {
    coords: null,
    status: null,
    direction: "",
  };

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
        <View>
          <Text>Undetermined</Text>
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

const styles = StyleSheet.create({});
