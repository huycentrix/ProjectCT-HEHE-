// File: components/OnboardingItem.tsx (Đã sửa)

import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.5; // Chiếm 50% màn hình

interface OnboardingItemProps {
  item: {
    title: string;
    description: string;
    image: any;
  };
}

const OnboardingItem: React.FC<OnboardingItemProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      {/* 1. KHU VỰC ẢNH */}
      <View style={styles.imageWrapper}>
        {/* Ảnh chiếm toàn bộ phần trên và dùng resizeMode: contain */}
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>

      {/* 2. KHU VỰC NỘI DUNG (Nền trắng có bo góc) */}
      <View style={styles.contentWrapper}>
          <View style={styles.contentContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Container phải chiếm toàn bộ chiều rộng màn hình để pagingEnabled hoạt động
  container: {
    width: width, 
    flex: 1,
    backgroundColor: '#fff', 
  },
  
  // 💡 KHU VỰC ẢNH: Chiếm 50% màn hình và giữ nền màu xám/xanh
  imageWrapper: {
    height: height * 0.55, 
    width: '100%',
    backgroundColor: '#E5E5E5', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // 💡 Đặt zIndex thấp để khối nội dung nổi lên trên
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },

  // 💡 KHU VỰC NỘI DUNG BAO GỒM BO GÓC
  contentWrapper: {
    flex: 1, // Chiếm phần còn lại (khoảng 50%)
    backgroundColor: '#E5E5E5', // Nền màu xám xanh để đảm bảo góc dưới cùng cũng đồng bộ
    paddingTop: 0, // Padding trên đã được xử lý bởi bo góc
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white', 
    // 💡 BO GÓC PHÍA TRÊN
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    
    paddingHorizontal: 30,
    paddingTop: 30,
    // Thêm shadow để tạo độ nổi bật
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -5 }, // Shadow hướng lên
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    // 💡 Tăng padding bottom để tạo không gian cho bo góc dưới
    paddingBottom: 40, 
    backgroundColor: '#E5E5E5', // 💡 Dùng màu nền của nội dung
    alignItems: 'center',
    // 💡 THÊM BO GÓC DƯỚI CHO FOOTER (TÙY CHỌN)
    // Nếu bạn muốn toàn bộ khung nội dung dưới bo góc, bạn cần bo góc cho View bọc FlatList
  },
});

export default OnboardingItem;