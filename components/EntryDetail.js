import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {connect} from 'react-redux';


class EntryDetail extends Component {
  render() {
      return (
          <View>
              <Text>Entry Detail - {this.props.route.params.entryId}</Text>
          </View>
      );
  }
}

export default EntryDetail;
