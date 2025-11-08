import React, { useState, useRef, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    ScrollView,
    Keyboard 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 💡 Cần Type cho Route Param (Email được truyền từ VerifyEmailScreen)
type OTPScreenRouteParams = {
    email: string;
};
type OTPScreenRouteProp = RouteProp<{ OTP: OTPScreenRouteParams }, "OTP">;

const OTP_LENGTH = 6; 

export default function OTPScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const route = useRoute<OTPScreenRouteProp>();
    
    const userEmail = route.params?.email || 'your.email@example.com';
    
    const [otpCode, setOtpCode] = useState(new Array(OTP_LENGTH).fill('')); 
    const [inputCode, setInputCode] = useState(''); // State ẩn để bắt đầu nhập liệu
    const inputRef = useRef<TextInput>(null); 

    // Mở bàn phím tự động khi màn hình tải
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleCodeChange = (value: string) => {
        // Chỉ chấp nhận số và giới hạn độ dài
        const cleanValue = value.replace(/[^0-9]/g, '').slice(0, OTP_LENGTH);
        setInputCode(cleanValue);
        
        // Cập nhật mảng hiển thị (Ví dụ: ['1', '2', '', '', '', ''])
        const newOtp = cleanValue.split('');
        const paddedOtp = [
            ...newOtp, 
            ...new Array(OTP_LENGTH - newOtp.length).fill('')
        ];
        setOtpCode(paddedOtp);

        // Nếu mã đã đủ 6 chữ số, ẩn bàn phím
        if (cleanValue.length === OTP_LENGTH) {
            Keyboard.dismiss();
        }
    };
    
    const handleVerify = () => {
        const fullCode = inputCode; 
        if (fullCode.length === OTP_LENGTH) {
            console.log(`Verifying code: ${fullCode}`);
            
            // 💡 CHUYỂN SANG MÀN HÌNH ĐẶT LẠI MẬT KHẨU
            // Route 'ResetPassword' đã được đăng ký trong AuthStack
            (navigation as any).navigate('ResetPassword'); 
            
        } else {
            alert('Please enter the full 6-digit code.');
        }
    };
    
    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.fullContainer}> 
            
            {/* 1. HEADER */}
            <View style={[styles.header, { paddingTop: insets.top || 10 }]}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.screenTitle}>Verify your email address</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* 2. VĂN BẢN HƯỚNG DẪN */}
                <Text style={styles.instructionText}>
                    Enter your OTP code here.
                </Text>
                
                {/* 💡 INPUT NHẬP LIỆU ẨN (Để bắt đầu nhập) */}
                <TextInput
                    ref={inputRef}
                    style={styles.hiddenInput}
                    value={inputCode}
                    onChangeText={handleCodeChange}
                    keyboardType="number-pad"
                    maxLength={OTP_LENGTH}
                    autoFocus={true} 
                    caretHidden={true} 
                />

                {/* 3. KHU VỰC HIỂN THỊ CÁC Ô MÃ CODE */}
                <View style={styles.otpContainer}>
                    {otpCode.map((digit, index) => {
                        return (
                            <TouchableOpacity 
                                key={index} 
                                style={[
                                    styles.otpBox, 
                                    index === inputCode.length && styles.otpBoxFocused // Tô màu ô hiện tại
                                ]}
                                onPress={() => inputRef.current?.focus()} // Nhấn vào ô thì focus vào input ẩn
                            >
                                <Text style={styles.otpText}>
                                    {digit}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                
                {/* 4. RESEND LINK */}
                <Text style={styles.resendContainer}>
                    Didn't receive the OTP? 
                    <Text style={styles.resendLink}> Resend.</Text>
                </Text>


                {/* 5. VERIFY BUTTON */}
                <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
                    <Text style={styles.confirmButtonText}>Verify</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    fullContainer: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'white', 
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: { padding: 5, marginRight: 10 },
    screenTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a', flex: 1, textAlign: 'center', marginRight: 24, },
    
    scrollContent: { paddingHorizontal: 30, paddingTop: 30, },
    instructionText: { fontSize: 16, color: '#333', marginBottom: 40, lineHeight: 24, textAlign: 'center' },

    // 💡 STYLES CHO OTP
    hiddenInput: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0, 
        zIndex: 100, 
        height: 100, // Chiều cao hợp lý để bàn phím hoạt động
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
        marginTop: 10,
    },
    otpBox: {
        width: 45, 
        height: 55,
        backgroundColor: '#f7f7f7',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
    },
    otpBoxFocused: {
        borderColor: '#00C4CC', 
        borderWidth: 2,
    },
    otpText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    resendContainer: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginBottom: 40,
    },
    resendLink: {
        color: '#00C4CC',
        fontWeight: 'bold',
    },
    // NÚT VERIFY
    verifyButton: {
        width: '100%',
        backgroundColor: '#00C4CC',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});