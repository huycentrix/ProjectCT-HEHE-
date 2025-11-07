import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import HomeScreen from "../screens/HomeScreen";
import SmartRouteScreen from "../screens/SmartRouteScreen";
import LocationSelectScreen from "../screens/LocationSelectScreen";
import ConfirmLocationScreen from "../screens/ConfirmLocationScreen"; // Giả định bạn đã tạo file này

// 🔹 Định nghĩa và EXPORT Type cho Stack Navigator
// EXPORT là RẤT QUAN TRỌNG để các màn hình con có thể sử dụng (ví dụ: LocationSelectScreen)
export type HomeStackParamList = {
  HomeTab: undefined; // Màn hình chính của Tab
  SmartRoute: undefined;
  LocationSelect: undefined;
  ConfirmLocation: {
    location: {
      latitude: number;
      longitude: number;
      address: string;
    };
  };
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
      {/* 💡 Flow: HOME -> LOCATION SELECT -> CONFIRM LOCATION -> SMART ROUTE */}
      <HomeStack.Screen name="LocationSelect" component={LocationSelectScreen} />
      <HomeStack.Screen name="ConfirmLocation" component={ConfirmLocationScreen} />
      <HomeStack.Screen name="SmartRoute" component={SmartRouteScreen} />
    </HomeStack.Navigator>
  );
}