import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet } from 'react-native';

// --- Import Stack Navigator cho Tab Home ---
import HomeStackNavigator from './HomeStack'; 
// 💡 IMPORT MÀN HÌNH CHỌN VỊ TRÍ
import LocationSelectScreen from '../screens/LocationSelectScreen';

// --- Import / Định nghĩa các Màn hình cho các Tab khác ---
import SmartRouteScreen from '../screens/SmartRouteScreen'; // Đã dùng trong HomeStack
const MenuScreen = () => <View style={styles.center}><Text>Menu Screen</Text></View>;
const FavoriteScreen = () => <View style={styles.center}><Text>Favorite Screen</Text></View>;
const NotificationScreen = () => <View style={styles.center}><Text>Notification Screen</Text></View>;

// Định nghĩa Typescript cho các Route (Sử dụng cho toàn bộ App)
export type TabStackParamList = {
  Home: undefined;
  Menu: undefined;
  MyPlan: undefined;
  Favorite: undefined;
  Notification: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#00C4CC', 
        tabBarInactiveTintColor: '#888', 
        
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'MyPlan') {
            iconName = focused ? 'basket' : 'basket-outline';
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else {
            iconName = 'help-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: styles.tabBarLabel,
      })}
    >
      {/* SỬ DỤNG STACK NAVIGATOR CHO TAB HOME ĐỂ HỖ TRỢ CHUYỂN MÀN HÌNH */}
      <Tab.Screen name="Home" component={HomeStackNavigator} /> 
      {/* 2. MENU TAB: SỬ DỤNG LOCATION SELECT SCREEN */}
      <Tab.Screen 
          name="Menu" 
          component={LocationSelectScreen} 
          options={{ title: 'Search' }} // Đổi tên tab bar thành Search cho phù hợp
      />
      {/* Đặt SmartRouteScreen vào tab MyPlan (để thử nghiệm) */}
      <Tab.Screen name="MyPlan" component={SmartRouteScreen} options={{ title: 'My Plan' }} /> 
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  center: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
  },
  tabBar: {
    height: 70, 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute', 
    paddingBottom: 5,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: -5,
  }
});

export default AppNavigator;