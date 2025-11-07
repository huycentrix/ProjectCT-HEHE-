import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// 💡 CÁC FILE CẦN ĐẢM BẢO TỒN TẠI
import AppNavigator from './navigation/AppNavigator'; // Navigator chính (Bottom Tabs/Drawer)
import OnboardingScreen from './screens/OnboardingScreen'; // Màn hình Onboarding
import AuthNavigator from './navigation/AuthStack';

// =================================================================
// 1. ĐỊNH NGHĨA ROOT STACK VÀ LOGIC KIỂM TRA TRẠNG THÁI
// =================================================================

// Định nghĩa Types cho Root Stack (để typescript hoạt động)
// Export để các màn hình con có thể sử dụng (ví dụ: OnboardingScreen)
export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;     // 💡 ROUTE MỚI: Luồng Đăng nhập/Đăng ký
  MainApp: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

// Khóa AsyncStorage để lưu trạng thái
const ONBOARDING_KEY = '@hasCompletedOnboarding';

/**
 * RootNavigator là component quyết định luồng đi đầu tiên của ứng dụng.
 * Nó kiểm tra AsyncStorage và chọn hiển thị OnboardingScreen hoặc AppNavigator.
 */
function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('Onboarding');

  // useEffect(() => {
  //   const checkOnboardingStatus = async () => {
  //     try {
  //       const hasCompleted = await AsyncStorage.getItem(ONBOARDING_KEY);
  //       // Nếu đã hoàn thành, chuyển đến MainApp
  //       if (hasCompleted === 'true') {
  //         setInitialRoute('MainApp');
  //       }
  //     } catch (e) {
  //       console.error('Error checking onboarding status:', e);
  //     } finally {
  //       // Hoàn tất tải
  //       setIsLoading(false);
  //     }
  //   }; 
  //   checkOnboardingStatus();
  // }, []);

  useEffect(() => {
  // 💡 Tạm thời luôn hiển thị Onboarding để test
  setInitialRoute('Onboarding');
  setIsLoading(false);
}, []);
  if (isLoading) {
    // Hiển thị màn hình tải trong khi kiểm tra AsyncStorage
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00C4CC" />
      </View>
    );
  }

  return (
    <RootStack.Navigator
      // Sử dụng initialRoute đã được xác định từ AsyncStorage
      initialRouteName={initialRoute} 
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Ngăn người dùng thoát khỏi Onboarding bằng cử chỉ
      }}
    >
      <RootStack.Screen name="Onboarding" component={OnboardingScreen} /> 
      <RootStack.Screen name="Auth" component={AuthNavigator} />
      <RootStack.Screen name="MainApp" component={AppNavigator} /> 
    </RootStack.Navigator>
  );
}

// =================================================================
// 2. COMPONENT APP CHÍNH
// =================================================================

export default function App() {
  return (
    <View style={styles.container}> 
      
      {/* Bọc toàn bộ ứng dụng bằng NavigationContainer */}
      <NavigationContainer>
        {/* Render RootNavigator đã tích hợp logic Onboarding */}
        <RootNavigator />
      </NavigationContainer>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Rất quan trọng để navigation hoạt động
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});