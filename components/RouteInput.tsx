import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 💡 Props được thêm vào để quản lý state và event (Tùy chọn)
interface RouteInputProps {
  onCheckPress: () => void; // 💡 ĐÃ ĐỔI TỪ onSwap
  // Giữ lại các props quản lý text nếu cần
  fromText?: string;
  toText?: string;
  onFromChange?: (text: string) => void;
  onToChange?: (text: string) => void;
}

// Giả sử component nhận prop onCheckPress
const RouteInput: React.FC<RouteInputProps> = ({ onCheckPress }) => {

  // Giữ lại state tạm thời cho hiển thị nếu không truyền prop
  const [fromText, setFromText] = React.useState("Your Location");
  const [toText, setToText] = React.useState("Input Destination");

  return (
    <View style={styles.container}>
      {/* VÙNG NHẬP LIỆU */}
      <View style={styles.inputContainer}>
        {/* Ô NHẬP LIỆU 1: Your Location */}
        <TextInput
          style={[styles.input, styles.topInput]}
          placeholder="Your Location"
          placeholderTextColor="#888"
          value={fromText}
          onChangeText={setFromText}
        />
        
        {/* Đường gạch ngang và dấu chấm mô phỏng đường đi */}
        <View style={styles.separatorContainer}>
            <View style={styles.dot} />
            <View style={styles.dash} />
            <View style={styles.dot} />
        </View>

        {/* Ô NHẬP LIỆU 2: Input Destination */}
        <TextInput
          style={styles.input}
          placeholder="Input Destination"
          placeholderTextColor="#888"
          value={toText}
          onChangeText={setToText}
        />
      </View>

      {/* 💡 NÚT CHECKMARK MỚI */}
      <TouchableOpacity onPress={onCheckPress} style={styles.swapButton}>
        <Ionicons name="checkmark" size={24} color="white" /> {/* 💡 ĐÃ ĐỔI ICON */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    flex: 1, 
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3, 
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    marginRight: 10, 
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
  },
  topInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee', 
    marginBottom: 5,
    paddingBottom: 10,
  },
  separatorContainer: {
    position: 'absolute',
    left: 8,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00AEEF',
    marginVertical: 4,
  },
  dash: {
    width: 2,
    height: 30, 
    backgroundColor: '#bbb',
  },
  // NÚT CHECKMARK (Giữ nguyên style cũ)
  swapButton: {
    backgroundColor: '#00AEEF', 
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});

export default RouteInput;