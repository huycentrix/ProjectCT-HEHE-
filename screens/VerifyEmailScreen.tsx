import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Giả định email được truyền qua Route params từ ForgotPasswordScreen
type VerifyEmailRouteParams = {
    email: string;
};
type VerifyEmailRouteProp = RouteProp<{ VerifyEmail: VerifyEmailRouteParams }, "VerifyEmail">;


export default function VerifyEmailScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const route = useRoute<VerifyEmailRouteProp>();
    
    // Lấy email từ params
    const userEmail = route.params?.email || 'your.email@example.com';
    const [code, setCode] = useState('');

    const handleConfirm = () => {
        // 💡 Logic XÁC NHẬN EMAIL (Không cần nhập code ở màn hình này nữa)
        console.log(`Email confirmed. Sending code and navigating to OTP screen.`);
        
        // Sau khi gửi email thành công, chuyển sang màn hình nhập code
        (navigation as any).navigate('OTP', { email: userEmail }); 
    };
    
    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.fullContainer}> 
            
            {/* 1. HEADER (Nút Back và Tiêu đề) */}
            <View style={[styles.header, { paddingTop: insets.top || 10 }]}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.screenTitle}>Verify your email address</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* 2. VĂN BẢN HƯỚNG DẪN */}
                <Text style={styles.instructionText}>
                    We have sent a verification code to your email address [{userEmail}]
                </Text>

                {/* 3. INPUT FIELD (Hiển thị Email) */}
                <View style={styles.emailDisplayGroup}>
                    <Ionicons name="mail" size={20} color="#00C4CC" style={styles.icon} />
                    <Text style={styles.emailDisplayText}>{userEmail}</Text>
                </View>
                

                {/* 5. CONFIRM BUTTON */}
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>


            </ScrollView>
            {/* 💡 LƯU Ý: React Native sẽ tự động hiển thị bàn phím ảo bên dưới */}
        </View>
    );
}

const styles = StyleSheet.create({
    fullContainer: { flex: 1, backgroundColor: '#fff' },
    // 1. HEADER
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: 'white', 
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: { padding: 5, marginRight: 10, },
    screenTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a', flex: 1, textAlign: 'center', marginRight: 24, },
    // 2. SCROLL CONTENT
    scrollContent: { paddingHorizontal: 30, paddingTop: 30, },
    instructionText: { fontSize: 16, color: '#333', marginBottom: 30, lineHeight: 24, },
    // 3. EMAIL DISPLAY
    emailDisplayGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 55,
        borderRadius: 10,
        marginBottom: 20, 
        paddingHorizontal: 15,
        backgroundColor: '#f7f7f7',
    },
    emailDisplayText: { flex: 1, fontSize: 16, color: '#333' },
    icon: { marginRight: 10 },
    // 5. CONFIRM BUTTON
    confirmButton: {
        width: '100%',
        backgroundColor: '#00C4CC',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    confirmButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold', },
});