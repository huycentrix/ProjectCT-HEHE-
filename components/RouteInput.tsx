import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 💡 Props được thêm vào để quản lý trạng thái nhập liệu (Tùy chọn)
interface RouteInputProps {
  fromLocation: string;
  toLocation: string;
  onFromChange: (text: string) => void;
  onToChange: (text: string) => void;
  onSwap: () => void;
}

// Giả định component không nhận props để giữ sự đơn giản cho thiết kế UI
const RouteInput: React.FC = () => {
  // Thay thế props bằng state tạm thời nếu bạn muốn xem input hoạt động
  const [fromText, setFromText] = React.useState("Your Location");
  const [toText, setToText] = React.useState("");

  const handleSwap = () => {
    // Logic đảo vị trí (trong ứng dụng thực tế)
    console.log("Swapping locations...");
  };

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

      {/* NÚT ĐẢO VỊ TRÍ */}
      <TouchableOpacity onPress={handleSwap} style={styles.swapButton}>
        <Ionicons name="repeat" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    // Màu nền trắng cho cả container để kiểm soát layout dễ hơn
  },
  inputContainer: {
    flex: 1, // Chiếm phần lớn không gian
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3, // Tạo độ nổi bật
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    marginRight: 10, // Khoảng cách tới nút swap
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
  },
  topInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Đường kẻ mờ giữa hai input
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
    height: 30, // Chiều dài của đường gạch nối
    backgroundColor: '#bbb',
  },
  swapButton: {
    backgroundColor: '#00AEEF', // Màu xanh dương cho nút
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