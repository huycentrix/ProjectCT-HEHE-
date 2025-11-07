import React, { useRef, useState } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Dimensions, 
  Text, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import OnboardingItem from '../components/OnboardingItem'; // Đảm bảo component này tồn tại
import { RootStackParamList } from '../App'; // Import type từ App.tsx

const ONBOARDING_KEY = '@hasCompletedOnboarding';
const { width } = Dimensions.get('window');

// Dữ liệu Mock cho 3 màn hình Onboarding
const slides = [
  {
    id: '1',
    title: 'Embark On Your Easy Adventure',
    description: 'Explore the world around you with precise location searching, personalized to your interests.',
    image: require('../assets/Onboarding1.png'), // Thay bằng ảnh thực tế
    buttonText: 'Continue',
  },
  {
    id: '2',
    title: 'Optimal Routes, Smart Decisions',
    description: 'Our proactive intelligence system helps you avoid traffic jams, bad weather, and all travel hassles.',
    image: require('../assets/Onboarding2.png'), // Thay bằng ảnh thực tế
    buttonText: 'Continue',
  },
  {
    id: '3',
    title: 'Craft Your Perfect Itinerary',
    description: 'Easily manage and arrange your journey, turning every destination into a part of a convenient plan.',
    image: require('../assets/Onboarding3.png'), // Thay bằng ảnh thực tế
    buttonText: 'Get Started',
  },
];

// Định nghĩa props cho màn hình Onboarding
type OnboardingScreenProps = StackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation } : any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList<any> | null>(null);

  // 💡 Logic lưu trạng thái và chuyển màn hình chính
  const skip = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      navigation.replace('Auth');
    } catch (e) {
      console.error('Failed to set onboarding status:', e);
      // Vẫn chuyển màn hình nếu AsyncStorage thất bại
      navigation.replace('Auth'); 
    }
  };

  // 💡 Logic chuyển đến slide tiếp theo hoặc Skip nếu là slide cuối
  const scrollToNext = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      skip();
      (navigation as any).replace('Auth');
    }
  };
  
  const currentItem = slides[currentIndex];

  // 💡 Cấu hình để theo dõi slide đang hiển thị
  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // 💡 Render các dấu chấm chỉ báo
  const renderDots = () => {
    return (
      <View style={styles.dotContainer}>
        {slides.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <View
              key={index.toString()}
              style={[
                styles.dot,
                isActive ? styles.activeDot : { backgroundColor: '#ccc' },
                isActive && { width: 25 }, // Kéo dài dot khi active
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Nút Skip */}
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={skip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Danh sách các Onboarding Item */}
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        onScrollToIndexFailed={() => {}} 
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        ref={slidesRef}
      />

      {/* Footer chứa Dots và Button */}
      <View style={styles.footer}>
        {renderDots()}
        <TouchableOpacity 
          style={styles.button} 
          onPress={scrollToNext}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{currentItem.buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: '#ccc',
  },
  activeDot: {
    backgroundColor: '#00C4CC', // Màu xanh mint chủ đạo
  },
  button: {
    backgroundColor: '#00C4CC', 
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 50 : 60, 
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#00C4CC',
    fontWeight: '600',
  }
});

export default OnboardingScreen;