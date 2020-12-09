import React, { Component } from "react";
import { StyleSheet, View, Platform, StatusBar } from "react-native";
import Constants from "expo-constants";

import { createStore } from "redux";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { FontAwesome, Ionicons } from "@expo/vector-icons";

import reducers from "./store/reducers";
import { gray, purple, white } from "./utils/colors";

import AddEntry from "./components/AddEntry";
import History from "./components/History";
import EntryDetail from "./components/EntryDetail";
import Live from "./components/Live";

const store = createStore(reducers);
const Tab =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const TriathlonStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const NavTab = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: Platform.OS === "ios" ? purple : white,
      style: {
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    }}
    navigationOptions={{
      header: null,
    }}
  >
    <Tab.Screen
      name="History"
      component={History}
      options={{
        tabBarLabel: "History",
        tabBarIcon: ({ focused, size, color }) => (
          <Ionicons name="ios-bookmarks" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="AddEntry"
      component={AddEntry}
      options={{
        tabBarLabel: "Add Entry",
        tabBarIcon: ({ focused, size, color }) => (
          <FontAwesome name="plus-square" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Live"
      component={Live}
      options={{
        tabBarLabel: "Live",
        tabBarIcon: ({ focused, size, color }) => (
          <Ionicons name="ios-speedometer" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const NavStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Triathlon Tracker"
      component={NavTab}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
      }}
    />
    <Stack.Screen
      name="Entry Detail"
      component={EntryDetail}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
      }}
    />
  </Stack.Navigator>
);

export default class App extends Component {
  handlePress = () => {
    alert("Button Clicked");
  };

  render() {
    return (
      <Provider store={store}>
        <TriathlonStatusBar
          backgroundColor={purple}
          barStyle={"light-content"}
        />
        <View style={styles.container}>
          <NavigationContainer>
            <NavStack />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
