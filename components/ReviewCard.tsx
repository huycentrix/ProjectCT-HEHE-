import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

// Thêm prop 'rating' (từ 1 đến 5)
type Props = {
  name: string;
  date: string;
  comment: string;
  rating: number; 
};

// Component để hiển thị các ngôi sao rating
const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const name = i <= rating ? "star" : "star-outline"; 
    stars.push(
      <Ionicons key={i} name={name as any} size={14} color="#FFC72C" style={styles.star} />
    );
  }
  return <View style={styles.ratingContainer}>{stars}</View>;
};


export default function ReviewCard({ name, date, comment, rating }: Props) {
  return (
    <View style={styles.card}>
      
      <View style={styles.header}>
        {/* AVATAR */}
        <View style={styles.avatar} /> 
        
        <View style={styles.userInfo}>
          <Text style={styles.name}>{name}</Text>
          <StarRating rating={rating} />
        </View>

        {/* CONTAINER MỚI CHO DATE VÀ REPLY */}
        <View style={styles.dateAndReply}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.replyText}>Reply</Text>
        </View>
      </View>

      {/* COMMENT */}
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // Giữ nguyên các style card
    backgroundColor: "#fff",
    padding: 15, 
    borderRadius: 15, 
    marginRight: 15, 
    width: 300, 
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Căn chỉnh các mục con theo trên cùng
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F7FA',
    marginRight: 10,
    flexShrink: 0, // Không cho avatar bị co lại
  },
  userInfo: {
    // Chỉ chứa Tên và Rating
    flex: 1, // Chiếm không gian còn lại ở giữa
    justifyContent: 'center',
  },
  dateAndReply: {
    // Vị trí cố định bên phải
    alignItems: 'flex-end',
    flexShrink: 0, // Không cho container này bị co lại
  },
  name: {
    fontWeight: "700",
    fontSize: 15,
    color: '#333',
    marginBottom: 2, // Tạo khoảng cách với rating
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginBottom: 5, // Khoảng cách tới nút Reply
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 2,
  },
  replyText: {
    color: '#00AAEF',
    fontSize: 13,
    fontWeight: '600',
  },
  comment: {
    fontSize: 15, 
    lineHeight: 22,
    color: "#555",
  },
});