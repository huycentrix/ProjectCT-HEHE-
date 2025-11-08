// File: screens/ForgotPasswordScreen.tsx

import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView, 
    TextInput, 
    TouchableOpacity, 
    ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 💡 SỬ DỤNG HOOK NÀY

export default function ForgotPasswordScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets(); // 💡 LẤY GIÁ TRỊ VÙNG AN TOÀN
    const [code, setCode] = useState(''); 
    const [email, setEmail] = useState('abc@clc.fitus.edu.vn'); 

    const handleSend = () => {
        console.log(`Sending password reset link to: ${email}`);
        
        // 💡 CHUYỂN HƯỚNG TỚI MÀN HÌNH XÁC NHẬN VÀ TRUYỀN EMAIL QUA PARAMS
        (navigation as any).navigate('VerifyEmail', { email: email }); 
    };
    
    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        // 💡 THAY SafeAreaView BẰNG View (cho phép header tràn viền)
        <View style={styles.fullContainer}> 
            
            {/* 1. HEADER (Nút Back và Tiêu đề) */}
            <View style={[
                styles.header, 
                // 💡 ÁP DỤNG PADDING TOP DỰA TRÊN INSETS.TOP
                { paddingTop: insets.top || 10 } 
            ]}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.screenTitle}>Forgot password</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* 2. VĂN BẢN HƯỚNG DẪN */}
                <Text style={styles.instructionText}>
                    Please enter your email address. You will receive a link to create a new password via email.
                </Text>

                {/* 3. INPUT FIELD (Email) */}
                <View style={styles.inputGroup}>
                    <Ionicons name="mail" size={20} color="#00C4CC" style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Email Address" 
                        keyboardType="email-address" 
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* 4. SEND BUTTON */}
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    fullContainer: { // 💡 ĐẶT TÊN MỚI ĐỂ PHÂN BIỆT VỚI styles.container MẶC ĐỊNH
        flex: 1,
        backgroundColor: '#fff',
    },
    // 1. HEADER
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
        // 💡 BỎ borderBottomWidth VÀ borderBottomColor ĐỂ KHẮC PHỤC
        // borderBottomWidth: 1, 
        // borderBottomColor: '#eee',
    },
    backButton: {
        padding: 5,
        marginRight: 20,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    // ... (Giữ nguyên các styles khác)
    scrollContent: {
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    instructionText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 30,
        lineHeight: 24,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 55,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        marginBottom: 40, 
        paddingHorizontal: 15,
        backgroundColor: '#f7f7f7',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    sendButton: {
        width: '100%',
        backgroundColor: '#00C4CC',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    sendButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resendButton: {
        alignSelf: 'center',
    },
    resendButtonText: {
        color: '#00C4CC',
        fontWeight: '600',
    }
});