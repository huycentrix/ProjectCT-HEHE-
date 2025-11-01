import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

type Props = {
  title: string;
  distance: string;
  time: string;
  image: any;
  // 💡 THÊM PROP NÀY: true nếu là Layout danh sách (SmartRouteScreen)
  isListItem?: boolean; 
};

export default function PlaceCard({ title, distance, time, image, isListItem = false }: Props) {
  
  // 💡 CHỌN STYLE DỰA TRÊN isListItem
  const cardStyle = isListItem ? listStyles : cardStyles; 
  
  // 💡 CHỌN LAYOUT JSX DỰA TRÊN isListItem
  const renderContent = () => {
    if (isListItem) {
      // LAYOUT B: List Item (Dùng cho SmartRouteScreen)
      return (
        <>
          <Image source={image} style={listStyles.image} />
          <View style={listStyles.infoWrapper}>
            <View style={listStyles.textContainer}>
              <Text style={listStyles.title}>{title}</Text>
              <Text style={listStyles.info}>{`${distance} | ${time}`}</Text>
            </View>
            <View style={listStyles.iconGroup}>
              <Ionicons name="bicycle" size={18} color="#00AAEF" style={{ marginRight: 10 }} />
              <View style={listStyles.addButton}>
                <Ionicons name="add" size={16} color="white" />
              </View>
            </View>
          </View>
        </>
      );
    } else {
      // LAYOUT A: Thẻ Cuộn Ngang (Dùng cho HomeScreen)
      return (
        <>
          <Image source={image} style={cardStyles.image} />
          <Text style={cardStyles.title}>{title}</Text>
          <Text style={cardStyles.info}>{`${distance} | ${time}`}</Text>
        </>
      );
    }
  };

  return (
    <View style={cardStyle.card}>
      {renderContent()}
    </View>
  );
}

// ----------------------------------------------------
// 💡 STYLESET 1: CARD (Dùng cho HomeScreen - Thẻ cuộn ngang)
// ----------------------------------------------------
const cardStyles = StyleSheet.create({
  card: {
    width: 150, // Chiều rộng CỐ ĐỊNH cho cuộn ngang
    marginRight: 15, // Khoảng cách giữa các thẻ
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 6,
  },
  info: {
    fontSize: 12,
    color: "#888",
  },
});

// ----------------------------------------------------
// 💡 STYLESET 2: LIST ITEM (Dùng cho SmartRouteScreen - Xếp dọc)
// ----------------------------------------------------
const listStyles = StyleSheet.create({
  card: {
    width: "100%", // Chiếm 100% chiều rộng
    flexDirection: 'row', // Sắp xếp ảnh và chữ ngang hàng
    alignItems: 'center',
  },
  image: {
    width: 80, 
    height: 80,
    borderRadius: 10,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10,
  },
  textContainer: {
    flex: 1, 
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
  },
  info: {
    fontSize: 13, 
    color: "#666",
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#00AAEF',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  }
});