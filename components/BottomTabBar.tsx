import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// Sử dụng Ionicons vì thiết kế của bạn đang dùng các icon này
import { Ionicons } from "@expo/vector-icons"; 

// Định nghĩa cấu trúc cho mỗi mục trong thanh điều hướng
interface TabItemProps {
  iconName: keyof typeof Ionicons.glyphMap; // Kiểu tên icon
  label: string;
  isActive: boolean;
  onPress: () => void; // Hàm xử lý khi nhấn
}

// Component cho mỗi icon và label
const TabItem: React.FC<TabItemProps> = ({ iconName, label, isActive, onPress }) => {
  const color = isActive ? "#00C4CC" : "#888"; // Màu xanh mint cho mục đang hoạt động

  // Trong thiết kế của bạn, icon Home có kiểu dáng 'Home' riêng biệt, 
  // nên ta sẽ dùng 'home' cho Home và các icon outline cho các tab khác để mô phỏng.
  let activeIconName = iconName;
  if (!isActive) {
      // Đối với các icon không hoạt động, thêm '-outline' để có viền mỏng hơn (nếu có trong Ionicons)
      activeIconName = `${iconName}-outline` as keyof typeof Ionicons.glyphMap;
  }
  if (label === 'Home' && isActive) {
      activeIconName = 'home'; // Icon Home (đầy đủ)
  }

  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress}>
      <Ionicons name={activeIconName} size={24} color={color} />
      <Text style={[styles.tabLabel, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

// Component chính
export default function BottomTabBar() {
  // 💡 LƯU Ý: Trong ứng dụng thực tế, bạn sẽ dùng React Navigation để quản lý state 'activeTab' này.
  // Ở đây, tôi đặt tạm 'Home' là active để mô phỏng thiết kế.
  const [activeTab, setActiveTab] = React.useState('Home'); 

  const tabs = [
    { name: "Home", icon: "home" },
    { name: "Menu", icon: "search" }, // Dùng icon search cho Menu
    { name: "My Plan", icon: "basket" }, // Dùng icon basket cho My Plan
    { name: "Favorite", icon: "heart" },
    { name: "Notification", icon: "notifications" },
  ];

  return (
    <View style={styles.tabBarContainer}>
      {tabs.map((tab) => (
        <TabItem
          key={tab.name}
          iconName={tab.icon as keyof typeof Ionicons.glyphMap}
          label={tab.name}
          isActive={activeTab === tab.name}
          onPress={() => setActiveTab(tab.name)} // Chỉ thay đổi state
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70, // Chiều cao của thanh bar
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // Style cho phần bo tròn và đổ bóng như trong hình
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10, // Shadow cho Android
    paddingHorizontal: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: '600',
  },
});