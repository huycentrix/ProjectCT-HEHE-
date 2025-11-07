import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PlaceCard from "../components/PlaceCard";
import ReviewCard from "../components/ReviewCard";
import RouteInput from "../components/RouteInput";

const { width } = Dimensions.get("window");

const BenThanh = require("../assets/benthanh.jpg");
const Landmark81 = require("../assets/landmark81.jpg");
const NotreDame = require("../assets/notredame.jpg");

const RECOMMENDED_PLACES = [
  { title: "Ben Thanh Market", distance: "3.5 Km", time: "12 min", image: BenThanh, rating: 4 },
  { title: "Landmark 81", distance: "4.5 Km", time: "17 min", image: Landmark81, rating: 5 },
  { title: "Notre Dame Cathedral", distance: "10 Km", time: "25 min", image: NotreDame, rating: 4 },
];

const MOCK_REVIEWS = [
  {
    name: "Sarah Johnson",
    date: "Aug 23, 2023",
    comment:
      "Absolutely loved the food! The flavors were so vibrant and the presentation was top-notch. Can't wait to order again!",
    rating: 5,
  },
  {
    name: "Michael B.",
    date: "Sep 15, 2023",
    comment: "Great route planning features! Saved me time during rush hour.",
    rating: 4,
  },
  {
    name: "Nguyễn Văn A",
    date: "Oct 01, 2023",
    comment: "Ứng dụng chạy mượt mà, giao diện đẹp. Rất hài lòng.",
    rating: 5,
  },
];

export default function SmartRouteScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
      ]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Smart Route</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* INPUT ZONE */}
        <View style={styles.routeInputWrapper}>
          <RouteInput />
        </View>

        {/* PROMO BANNERS */}
        <View style={styles.bannerWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            contentContainerStyle={styles.bannerScroll}
          >
            <View style={[styles.bannerCard, { backgroundColor: "#FFC78A" }]}>
              <Text style={styles.bannerTitle}>Let's Take The</Text>
              <Text style={styles.bannerTitle}>First Time Booking</Text>
              <Text style={styles.bannerSubtitle}>And Save Up To</Text>
              <Text style={styles.bannerDiscount}>10%</Text>
            </View>

            <View style={[styles.bannerCard, { backgroundColor: "#7DD1B6" }]}>
              <Text style={styles.bannerTitle}>Exclusive Offer</Text>
              <Text style={styles.bannerSubtitle}>
                Get 50% off on your next trip!
              </Text>
            </View>
          </ScrollView>
        </View>

        {/* RECOMMENDED PLACES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Nearby Places</Text>
          {RECOMMENDED_PLACES.map((place, i) => (
            <View key={i} style={styles.placeCardWrapper}>
              <PlaceCard
                title={place.title}
                distance={place.distance}
                time={place.time}
                image={place.image}
                isListItem={true}
              />
            </View>
          ))}
        </View>

        {/* REVIEWS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Happy Clients Say</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.reviewCardList}
          >
            {MOCK_REVIEWS.map((review, i) => (
              <ReviewCard
                key={i}
                name={review.name}
                date={review.date}
                comment={review.comment}
                rating={review.rating}
              />
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    elevation: 2,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
    marginRight: 24,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  routeInputWrapper: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  bannerWrapper: {
    marginVertical: 10,
  },
  bannerScroll: {
    paddingHorizontal: 20,
  },
  bannerCard: {
    width: width - 40,
    borderRadius: 16,
    padding: 20,
    marginRight: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    lineHeight: 22,
  },
  bannerSubtitle: {
    fontSize: 14,
    marginTop: 8,
    color: "#333",
  },
  bannerDiscount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#D82921",
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 20,
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
    color: "#222",
  },
  viewAllText: {
    color: "#00AAEF",
    fontWeight: "600",
  },
  placeCardWrapper: {
    marginBottom: 15,
  },
  reviewCardList: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});
