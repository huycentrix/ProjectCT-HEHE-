import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; 
import OnboardingScreen from '../screens/OnboardingScreen';
import AppNavigator from './AppNavigator'; 

// 💡 1. ĐỊNH NGHĨA ROOT STACK PARAM LIST (Cần thiết cho App.tsx)
export type RootStackParamList = {
    Onboarding: undefined;  // ĐÃ ĐỒNG BỘ TÊN VỚI APP.TSX
    MainApp: undefined;     // ĐÃ ĐỒNG BỘ TÊN VỚI APP.TSX
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName="Onboarding" // SỬ DỤNG TÊN MỚI
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* 💡 SỬ DỤNG CÚ PHÁP ĐƠN GIẢN: component={OnboardingScreen} */}
      <RootStack.Screen name="Onboarding" component={OnboardingScreen} /> 
      <RootStack.Screen name="MainApp" component={AppNavigator} /> 
    </RootStack.Navigator>
  );
}