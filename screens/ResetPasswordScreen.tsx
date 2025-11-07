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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleChangePassword = () => {
        // 💡 Logic ĐỔI MẬT KHẨU THÀNH CÔNG:
        console.log(`Password changed. Navigating to Success Screen.`);
        
        // Chuyển sang màn hình xác nhận thành công
        (navigation as any).replace('ResetPasswordSuccess'); 
    };
    
    // Hàm xử lý nút Back
    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        // Sử dụng View để có thể tùy chỉnh paddingTop cho Header dễ dàng
        <View style={styles.fullContainer}> 
            
            {/* 1. HEADER (Nút Back và Tiêu đề) */}
            <View style={[styles.header, { paddingTop: insets.top || 10 }]}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.screenTitle}>Reset password</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* 2. VĂN BẢN HƯỚNG DẪN */}
                <Text style={styles.instructionText}>
                    Enter new password and confirm.
                </Text>

                {/* 3. INPUT FIELD (New Password) */}
                <View style={styles.inputGroup}>
                    <Ionicons name="key" size={20} color="#00C4CC" style={styles.icon} /> 
                    <TextInput 
                        style={styles.input} 
                        placeholder="••••••••" 
                        secureTextEntry={!isPasswordVisible}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <Ionicons 
                            name={isPasswordVisible ? "eye" : "eye-off"} 
                            size={20} 
                            color="#888" 
                        />
                    </TouchableOpacity>
                </View>

                {/* 4. INPUT FIELD (Confirm Password) */}
                <View style={styles.inputGroup}>
                    <Ionicons name="key" size={20} color="#00C4CC" style={styles.icon} /> 
                    <TextInput 
                        style={styles.input} 
                        placeholder="••••••••" 
                        secureTextEntry={!isPasswordVisible}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <Ionicons 
                            name={isPasswordVisible ? "eye" : "eye-off"} 
                            size={20} 
                            color="#888" 
                        />
                    </TouchableOpacity>
                </View>

                {/* 5. CHANGE PASSWORD BUTTON */}
                <TouchableOpacity style={styles.changeButton} onPress={handleChangePassword}>
                    <Text style={styles.changeButtonText}>Change Password</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    fullContainer: { 
        flex: 1,
        backgroundColor: '#fff',
    },
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
    backButton: {
        padding: 5,
        marginRight: 20,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    // 2. SCROLL CONTENT
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
    // 3. INPUTS
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 55,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        marginBottom: 20, 
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
    // 4. CHANGE BUTTON
    changeButton: {
        width: '100%',
        backgroundColor: '#00C4CC',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    changeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});