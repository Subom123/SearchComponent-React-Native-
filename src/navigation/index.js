import react from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";

import SearchScreen from "../screens/SearchScreen";
import SavedScreen from "../screens/TvShowsScreen";
import { View, Text } from "react-native";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  function Homestack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Search"
      >
        {/* <Stack.Screen name="Hometab" component={HomeTab} /> */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen
          name="MovieDetailsScreen"
          component={MovieDetailsScreen}
        />
      </Stack.Navigator>
    );
  }

  function HomeTab() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Search"
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Homestack />
    </NavigationContainer>
  );
}
