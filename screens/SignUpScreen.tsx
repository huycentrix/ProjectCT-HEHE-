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

// 💡 Component cho nút Đăng nhập xã hội (Tái sử dụng style từ SignIn)
const SocialButton: React.FC<{ icon: string; label: string; color: string }> = ({ icon, label, color }) => (
    <TouchableOpacity style={[styles.socialButton, { backgroundColor: color, borderColor: color }]}>
        <Ionicons name={icon as any} size={20} color="white" /> 
    </TouchableOpacity>
);

export default function SignUpScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    
    const [fullName, setFullName] = useState('Nguyen Van A');
    const [email, setEmail] = useState('abc@clc.fitus.edu.vn');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSignUp = () => {
        // 💡 Logic ĐĂNG KÝ THÀNH CÔNG: 
        console.log(`Attempting signup for: ${email}`);
        
        // 1. Sau khi đăng ký thành công, chuyển đến màn hình Đăng nhập (SignIn)
        // Dùng replace để ngăn người dùng nhấn nút back quay lại màn hình đăng ký.
        (navigation as any).replace('SignIn'); 
    };
    
    // Hàm xử lý nút Back (Cần thiết trong Auth Stack)
    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            
            {/* 1. HEADER (Nút Back và Tiêu đề) */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.screenTitle}>Sign Up</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* 2. INPUT FIELDS: Full Name */}
                <View style={styles.inputGroup}>
                    <Ionicons name="person" size={20} color="#00C4CC" style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Full Name" 
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>

                {/* 3. INPUT FIELDS: Email */}
                <View style={styles.inputGroup}>
                    <Ionicons name="mail" size={20} color="#00C4CC" style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Email Address" 
                        keyboardType="email-address" 
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Ionicons name="checkmark-circle" size={20} color="#00C4CC" />
                </View>

                {/* 4. INPUT FIELDS: Password */}
                <View style={styles.inputGroup}>
                    <Ionicons name="key" size={20} color="#00C4CC" style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Password" 
                        secureTextEntry={!isPasswordVisible}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <Ionicons 
                            name={isPasswordVisible ? "eye" : "eye-off"} 
                            size={20} 
                            color="#888" 
                        />
                    </TouchableOpacity>
                </View>
                
                {/* 5. INPUT FIELDS: Confirm Password */}
                <View style={styles.inputGroup}>
                    <Ionicons name="key" size={20} color="#00C4CC" style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Confirm Password" 
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

                {/* 6. SIGN UP BUTTON */}
                <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>

                {/* 7. SIGN IN LINK */}
                <View style={styles.signInContainer}>
                    <Text style={styles.signInText}>Already have an account? </Text>
                    
                    {/* 💡 SỬ DỤNG navigation.navigate('SignIn') */}
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn' as never)}>
                        <Text style={styles.signInLink}>Sign in.</Text>
                    </TouchableOpacity>
                </View>

                {/* 8. SOCIAL LOGIN BUTTONS */}
                <View style={styles.socialButtonsContainer}>
                    <SocialButton icon="logo-facebook" label="Facebook" color="#1877F2" />
                    <View style={{ width: 15 }} />
                    <SocialButton icon="logo-google" label="Google" color="#DD4B39" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // 1. HEADER
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    backButton: {
        padding: 5,
        marginRight: 20,
    },
    screenTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    // 2. SCROLL CONTENT
    scrollContent: {
        paddingHorizontal: 30,
        paddingBottom: 50,
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
        marginBottom: 15,
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
    // 4. SIGN UP BUTTON
    signUpButton: {
        width: '100%',
        backgroundColor: '#00C4CC',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    signUpButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // 5. SIGN IN LINK
    signInContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 30,
    },
    signInText: {
        color: '#666',
        fontSize: 15,
    },
    signInLink: {
        color: '#00C4CC',
        fontWeight: 'bold',
        fontSize: 15,
    },
    // 6. SOCIAL BUTTONS (Dùng lại style từ SignInScreen)
    socialButtonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    socialButton: {
        flex: 1,
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});