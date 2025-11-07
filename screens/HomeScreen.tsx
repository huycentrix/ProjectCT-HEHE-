import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import SearchBar from "../components/SearchBar";
import ServiceCard from "../components/ServiceCard";
import PlaceCard from "../components/PlaceCard";
import ReviewCard from "../components/ReviewCard";

const NotreDame = require("../assets/notredame.jpg");
const Landmark81 = require("../assets/landmark81.jpg");
const Palace = require("../assets/palace.jpg");

export default function HomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // 👈 Lấy giá trị vùng an toàn (notch, camera, gesture bar)

  const goToLocationSelect = () => navigation.navigate("LocationSelect" as never);
  const goToSmartRoute = () => navigation.navigate("SmartRoute" as never);

  return (
    <SafeAreaView
      edges={["top", "left", "right"]} // 👈 Bảo vệ nội dung khỏi bị che ở notch và 2 bên
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }} // 👈 tránh che bởi gesture bar ở dưới
      >
        {/* HEADER */}
        <View style={styles.headerArea}>
          {/* USER INFO */}
          <View style={styles.userInfoBar}>
            <View style={styles.profileSection}>
              <View style={styles.avatarPlaceholder} />
              <Text style={styles.userName}>Jordan Hebert</Text>
            </View>

            <View style={styles.actionIcons}>
              <Text style={styles.scText}>SC</Text>
              <Ionicons name="add-circle" size={24} color="#333" />
            </View>
          </View>

          {/* SEARCH BAR */}
          <View style={styles.searchBarWrapper}>
            <SearchBar onPress={goToLocationSelect} />
          </View>

          {/* BANNER */}
          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>Find The “Smartest” Route</Text>
            <Text style={styles.bannerSubtitle}>Save Time And Travel Smarter</Text>

            <TouchableOpacity style={styles.iconCircle} onPress={goToSmartRoute}>
              <Ionicons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>

            <View style={styles.dotContainer}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>

        {/* FEATURES */}
        <View style={[styles.section, { paddingHorizontal: 20 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Features</Text>
            <Text style={styles.viewAllText}>View all</Text>
          </View>

          <View style={styles.serviceRow}>
            <ServiceCard title="Smart Route" icon="navigate" onPress={goToSmartRoute} />
            <ServiceCard title="Planning" icon="calendar" onPress={() => {}} />
            <ServiceCard title="Weather Info" icon="cloud" onPress={() => {}} />
            <ServiceCard title="Traffic Alert" icon="warning" onPress={() => {}} />
          </View>
        </View>

        {/* RECOMMENDED */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { paddingHorizontal: 20 }]}>Recommended For You</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.placeCardList}
          >
            <PlaceCard title="Notre Dame Cathedral" distance="10 Km" time="25m" image={NotreDame} />
            <PlaceCard title="Landmark 81" distance="4.5 Km" time="17m" image={Landmark81} />
            <PlaceCard title="Independent Palace" distance="8 Km" time="20m" image={Palace} />
          </ScrollView>
        </View>

        {/* REVIEWS */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, { paddingHorizontal: 20 }]}>
            <Text style={styles.sectionTitle}>Our Happy Clients Say</Text>
            <Text style={styles.viewAllText}>View all</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.reviewCardList}
          >
            <ReviewCard name="Sarah Johnson" date="Aug 23, 2023" comment="Absolutely loved the food!..." rating={5} />
            <ReviewCard name="Michael B." date="Sep 10, 2023" comment="The smart route feature saved me so much time..." rating={4} />
            <ReviewCard name="Bell" date="Oct 01, 2023" comment="The app runs smoothly and has a nice interface..." rating={5} />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  headerArea: {
    backgroundColor: "#7DD1B6",
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  userInfoBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 15,
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 10,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E0F7FA",
    borderWidth: 1,
    borderColor: "#fff",
    marginRight: 10,
  },
  userName: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
  },
  actionIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  scText: {
    backgroundColor: "#00C4CC",
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 10,
  },
  searchBarWrapper: {
    paddingHorizontal: 20,
  },
  banner: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "transparent",
  },
  bannerTitle: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 30,
  },
  bannerSubtitle: {
    color: "black",
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 5,
  },
  iconCircle: {
    backgroundColor: "#FFC72C",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    opacity: 0.5,
  },
  activeDot: {
    opacity: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAllText: {
    color: "#00AAEF",
    fontWeight: "600",
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  placeCardList: {
    paddingHorizontal: 20,
  },
  reviewCardList: {
    paddingHorizontal: 20,
  },
});
