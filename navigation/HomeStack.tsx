import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import SmartRouteScreen from '../screens/SmartRouteScreen';
import LocationSelectScreen from '../screens/LocationSelectScreen';

// Định nghĩa types cho Stack Navigator
export type HomeStackParamList = {
  HomeTab: undefined; // Tên màn hình Home trong Stack
  SmartRoute: undefined; // Tên màn hình Smart Route
  LocationSelect: undefined;
};

const HomeStack = createStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false, // Ẩn header mặc định
      }}
    >
      <HomeStack.Screen name="HomeTab" component={HomeScreen} />
      <HomeStack.Screen name="LocationSelect" component={LocationSelectScreen} />
      <HomeStack.Screen name="SmartRoute" component={SmartRouteScreen} />
    </HomeStack.Navigator>
  );
}