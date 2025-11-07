// File: navigation/types.ts

import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

// 💡 ROOT STACK PARAMS (Cần được Export ở đây hoặc OnboardingStack.tsx)
export type RootStackParamList = {
    OnboardingFlow: undefined; // Màn hình Onboarding
    MainAppFlow: undefined;    // Luồng chính (Bottom Tabs)
};

// 💡 TYPE CHO ONBOARDING SCREEN
export type OnboardingScreenProps = StackScreenProps<RootStackParamList, 'OnboardingFlow'>;


// (Bạn có thể thêm các types khác như HomeStackParamList ở đây sau)