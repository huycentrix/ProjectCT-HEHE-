import React from "react";
// 💡 Cần import TouchableOpacity cho nút bấm (đã thêm vào trong các bước trước)
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"; 
import { Ionicons } from "@expo/vector-icons";

// 💡 ĐỊNH NGHĨA PROPS
type Props = {
onPress: () => void;
};

// 💡 SỬA ĐỂ NHẬN PROPS
export default function SearchBar({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      
      {/* KHÔNG DÙNG TextInput nữa */}
      <View style={styles.searchIconWrapper}>
        <Ionicons name="search" size={20} color="#00C4CC" /> 
      </View>
      
      {/* 💡 SỬ DỤNG Text thay vì TextInput để hiển thị placeholder */}
      <View style={styles.inputPlaceholder}>
          <Text style={styles.placeholderText}>Where to...?</Text>
      </View>
      
      <Ionicons name="location" size={20} color="#00AEEF" />
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    height: 50,
    paddingLeft: 0, 
    paddingRight: 12, 
    elevation: 4, 
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    // Margin/Padding sẽ được xử lý trong HomeScreen
  },
  searchIconWrapper: {
    backgroundColor: 'transparent', // Giữ màu nền trong suốt
    width: 50,
    height: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12, 
    borderBottomLeftRadius: 12, 
    marginRight: 8,
  },
  inputPlaceholder: { // View thay thế cho TextInput
    flex: 1,
    justifyContent: 'center',
  },
  placeholderText: {
      fontSize: 16,
      color: '#888',
  }
});