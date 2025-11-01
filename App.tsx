import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

// 💡 1. IMPORT NavigationContainer từ gói React Navigation chính
import { NavigationContainer } from '@react-navigation/native';
// 💡 2. IMPORT AppNavigator (chứa Bottom Tab Navigator của bạn)
import AppNavigator from './navigation/AppNavigator'; 
// Đảm bảo bạn đã tạo file AppNavigator.tsx và HomeStack.tsx

export default function App() {
  return (
    // Đảm bảo View cha có flex: 1 để chiếm toàn bộ màn hình
    <View style={styles.container}> 
      
      {/* 💡 BỌC TOÀN BỘ ỨNG DỤNG BẰNG NAVIGATION CONTAINER */}
      <NavigationContainer>
        
        {/* RENDER APP NAVIGATOR (Component chính chứa các Tabs) */}
        <AppNavigator />
        
      </NavigationContainer>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Rất quan trọng để navigation hoạt động
    backgroundColor: '#f9f9f9', // Thêm màu nền cho container
  },
});