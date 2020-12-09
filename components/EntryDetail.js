import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";

import MetricCard from "./MetricCard";
import TextButton from "./TextButton";
import { red, white } from "../utils/colors";
import { addEntry } from "../store/actions/actionCreators";
import { resetEntry } from "../utils/api";
import { getDailyReminderValue, timeToString } from "../utils/helpers";

class EntryDetail extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.metrics.length !== 0 && !nextProps.metrics.today;
  }

  reset = () => {
    const { reset, goBack, entryId } = this.props;
    reset();
    goBack();
    resetEntry(entryId);
  };

  render() {
    const { metrics } = this.props;
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <View style={{ padding: 10 }} />
        <TextButton
          onPress={this.reset}
          btnStyle={
            Platform.OS === "ios"
              ? styles.iosResetButton
              : styles.androidResetButton
          }
          style={{
            textAlign: "center",
            color: white,
            fontSize: 22,
          }}
        >
          Reset
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  iosResetButton: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
  },
  androidResetButton: {
    backgroundColor: red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  resetButtonText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
});

function mapStateToProps(state, { route }) {
  const { entryId } = route.params;
  return {
    entryId,
    metrics: state[entryId][0] || [],
  };
}

function mapDispatchToProps(dispatch, { route, navigation }) {
  const { entryId } = route.params;
  return {
    reset: () =>
      dispatch(
        addEntry({
          [entryId]: timeToString() === entryId ? getDailyReminderValue() : [],
        })
      ),
    goBack: () => navigation.goBack(),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
