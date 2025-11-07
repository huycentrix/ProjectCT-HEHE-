import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PasswordResetSuccessScreen() {
    const navigation = useNavigation();

    const handleDone = () => {
        // 💡 Logic: Chuyển thẳng về màn hình đăng nhập (SignIn) và xóa lịch sử trước đó
        // Dùng replace để ngăn người dùng nhấn nút back quay lại màn hình success
        (navigation as any).replace('SignIn'); 
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                
                {/* 1. KHU VỰC ICON THÀNH CÔNG */}
                <View style={styles.iconBox}>
                    {/* Icon chìa khóa (Key) */}
                    <Ionicons name="key-outline" size={70} color="white" />
                </View>

                {/* 2. TIÊU ĐỀ VÀ MÔ TẢ */}
                <Text style={styles.title}>Your Password Has Been Reset!</Text>
                <Text style={styles.subtitle}>
                    Log in with your new password to continue your journey.
                </Text>

                {/* 3. NÚT XÁC NHẬN */}
                <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '85%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconBox: {
        width: 150,
        height: 150,
        borderRadius: 20,
        backgroundColor: '#E0F7FA', // Màu nền nhạt
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        // Tạo hiệu ứng chìa khóa nổi lên
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 50,
    },
    doneButton: {
        width: '100%',
        backgroundColor: '#00C4CC', // Màu xanh mint chủ đạo
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
    },
    doneButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});