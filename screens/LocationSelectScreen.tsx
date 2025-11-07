import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";
// Import HomeStackParamList từ file HomeStack.tsx vừa được sửa
import { HomeStackParamList } from "../navigation/HomeStack";

type LocationSelectScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'LocationSelect' // Màn hình hiện tại
>;

// 🔹 Nút hành động nhanh (Home, Work, Add Location)
const QuickActionButton: React.FC<{ label: string; isAdd?: boolean }> = ({
  label,
  isAdd,
}) => (
  <TouchableOpacity style={[styles.quickButton, isAdd && styles.addButton]}>
    <Text style={[styles.quickButtonText, isAdd && styles.addButtonText]}>
      {label}
    </Text>
    {isAdd && <Ionicons name="add" size={16} color="#fff" style={{ marginLeft: 6 }} />}
  </TouchableOpacity>
);

// 🔹 Item trong danh sách địa điểm gần đây
interface RecentItemProps {
  title: string;
  info: string;
  distance: string;
}
const RecentLocationItem: React.FC<RecentItemProps> = ({
  title,
  info,
  distance,
}) => (
  <View style={styles.recentItem}>
    <View style={styles.dotContainer}>
      <View style={styles.dot} />
    </View>
    <View style={styles.recentTextContent}>
      <Text style={styles.recentTitle}>{title}</Text>
      <Text style={styles.recentInfo}>
        {distance} km • {info}
      </Text>
    </View>
  </View>
);
// 🔹 Định nghĩa kiểu cho route
type RootStackParamList = {
  LocationSelect: undefined;
  ConfirmLocation: {
    location: {
      latitude: number;
      longitude: number;
      address: string;
    };
  };
};
export default function LocationSelectScreen() {
  const navigation = useNavigation<LocationSelectScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
      ]}
    >
      {/* 🔹 HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Select Location</Text>

        <TouchableOpacity>
          <Text style={styles.mapButtonText}>Set on Map</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 MAIN CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* INPUT ZONE */}
        <View style={styles.inputArea}>
          {/* ORIGIN */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Origin</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your Location"
              placeholderTextColor="#999"
              value="Your Location"
            />
            <TouchableOpacity style={styles.useCurrentButton}>
              <Text style={styles.useCurrentText}>Use current location</Text>
            </TouchableOpacity>
          </View>

          {/* CHECKMARK BUTTON */}
<TouchableOpacity
  style={styles.swapButton}
  onPress={() =>
    navigation.navigate("ConfirmLocation", {
      location: {
        latitude: 10.7619,
        longitude: 106.682852,
        address: "227, Nguyen Van Cu Street, W.4, D.5, Ho Chi Minh City",
      },
    })
  }
>
  <Ionicons name="checkmark" size={22} color="#fff" />
</TouchableOpacity>


          {/* DESTINATION */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Destination</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter destination"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* QUICK ACTIONS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActionsContainer}
        >
          <QuickActionButton label="Home" />
          <QuickActionButton label="Work" />
          <QuickActionButton label="Add location" isAdd />
          <QuickActionButton label="School" />
        </ScrollView>

        {/* RECENT LOCATIONS */}
        <View style={styles.recentSection}>
          <Text style={styles.recentSectionTitle}>Recent</Text>

          <RecentLocationItem
            title="Home"
            distance="1.4"
            info="227 Nguyễn Văn Cừ, P.4, Q.5, Hồ Chí Minh"
          />
          <RecentLocationItem
            title="Work"
            distance="2.5"
            info="268 Lý Thường Kiệt, P.14, Q.10, Hồ Chí Minh"
          />
          <RecentLocationItem
            title="Đại học Quốc Gia TP.HCM"
            distance="19"
            info="Khu phố 6, P.Linh Trung, TP.Thủ Đức, Hồ Chí Minh"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },

  // 🔹 HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    elevation: 2,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  mapButtonText: {
    color: "#00AAEF",
    fontWeight: "600",
  },

  // 🔹 INPUTS
  inputArea: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  inputGroup: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  inputLabel: {
    fontSize: 12,
    color: "#666",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  textInput: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: "#333",
  },
  useCurrentButton: {
    backgroundColor: "#E8F7F9",
    paddingVertical: 8,
    marginHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  useCurrentText: {
    color: "#00AEEF",
    fontWeight: "600",
  },
  swapButton: {
    backgroundColor: "#00AEEF",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 25,
    top: 155,
    zIndex: 10,
    elevation: 3,
  },

  // 🔹 QUICK ACTIONS
  quickActionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  quickButton: {
    backgroundColor: "#EDEDED",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  quickButtonText: {
    color: "#333",
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#00AAEF",
  },
  addButtonText: {
    color: "#fff",
  },

  // 🔹 RECENT LOCATIONS
  recentSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  recentSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222",
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dotContainer: {
    paddingTop: 5,
    marginRight: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00AAEF",
  },
  recentTextContent: {
    flex: 1,
  },
  recentTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  recentInfo: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
});
