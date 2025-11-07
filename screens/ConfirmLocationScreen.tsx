import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; 
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

// 💡 Cần định nghĩa type cho Root Navigator để useRoute hoạt động đúng
type ConfirmLocationRouteParams = {
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
};

type ConfirmLocationRouteProp = RouteProp<
  { ConfirmLocation: ConfirmLocationRouteParams },
  "ConfirmLocation"
>;


export default function ConfirmLocationScreen() {
  const route = useRoute<ConfirmLocationRouteProp>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { location } = route.params;

  const handleConfirm = () => {
    // 💡 Logic khi xác nhận: Lưu vị trí vào Context và chuyển màn hình
    console.log("Location confirmed:", location.address);
    // Quay lại màn hình trước đó (thường là LocationSelectScreen)
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      {/* 1. MAP VIEW */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker 
            coordinate={{ latitude: location.latitude, longitude: location.longitude }} 
            title="Your selected location" 
        />
      </MapView>
      
      {/* 💡 NÚT TRỞ VỀ (NỔI TRÊN BẢN ĐỒ) */}
      <SafeAreaView style={[styles.backButtonContainer, { marginTop: insets.top }]}>
        <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </SafeAreaView>


      {/* 2. ACTION PANEL (Nổi lên từ dưới) */}
      <View style={styles.actionPanel}>
        
        {/* THÔNG TIN ĐỊA ĐIỂM */}
        <View style={styles.infoBox}>
            {/* Sử dụng địa chỉ để hiển thị tên địa điểm */}
            <Text style={styles.title}>{location.address ? location.address.split(',')[0] : "Selected Location"}</Text>
            <Text style={styles.address}>{location.address || "Address not available."}</Text>
        </View>

        {/* 💡 PLACEHOLDER CHO PHƯƠNG TIỆN (Giữ lại để giữ layout) */}
         <View style={styles.vehiclePlaceholderContainer} /> 
        
        {/* 💡 NÚT XÁC NHẬN BỊ THIẾU */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Your Location</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f0f0' 
  },
  map: { 
    flex: 1 
  },
  
  // 💡 STYLE CHO NÚT TRỞ VỀ
  backButtonContainer: {
    position: 'absolute',
    left: 10,
    zIndex: 20,
    paddingTop: 10,
  },
  backButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  
  // 🔹 ACTION PANEL (Nổi lên từ dưới)
  actionPanel: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingBottom: 75, 
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  
  // 🔹 THÔNG TIN ĐỊA ĐIỂM
  infoBox: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: '#333',
  },
  address: {
      fontSize: 14,
      color: '#666',
  },
  
  // 💡 STYLE CHO PLACEHOLDER PHƯƠNG TIỆN (Đã thêm để giữ layout)
  vehiclePlaceholderContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
    height: 1, // Giảm chiều cao xuống 1px để chỉ còn 2 đường kẻ
  },
  
  // 🔹 NÚT XÁC NHẬN
  confirmButton: {
    backgroundColor: "#00C4CC", 
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    // 💡 THÊM marginVertical để đảm bảo nó không dính vào các đường kẻ
    marginTop: 10,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});