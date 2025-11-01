import React from "react";
// Đã thay View bằng TouchableOpacity
import { TouchableOpacity, Text, StyleSheet } from "react-native"; 
import { Ionicons } from "@expo/vector-icons";

// Định nghĩa Type cho tên icon
type IoniconsName = keyof typeof Ionicons.glyphMap;

type Props = {
  title: string;
  icon: IoniconsName;
  onPress: () => void; // THÊM PROP ONPRESS
};

export default function ServiceCard({ title, icon, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#00AAEF" />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    width: 80,
    height: 80,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    marginTop: 6,
    fontSize: 12,
    textAlign: "center",
    color: "#333",
  },
});