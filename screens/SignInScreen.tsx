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
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthStackParamList } from '../navigation/AuthStack'; 
// 💡 Cần import RootStackParamList để sử dụng reset (do nó là Root Navigator)
import { RootStackParamList } from '../App'; // Đảm bảo bạn export nó từ App.tsx

// 💡 1. ĐỊNH NGHĨA TYPE AN TOÀN CHO NAVIGATION
type SignInScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'SignIn'
>;

// 💡 Component cho nút Đăng nhập xã hội (Social Login Button)
const SocialButton: React.FC<{ icon: string; label: string; color: string }> = ({ icon, label, color }) => (
    // Sử dụng style mới 'coloredSocialButton'
    <TouchableOpacity style={[styles.socialButton, { backgroundColor: color, borderColor: color }]}>
        {/* Đặt màu icon là trắng cho Facebook/Google */}
        <Ionicons name={icon as any} size={20} color="white" /> 
        {/* Không hiển thị chữ, chỉ hiển thị icon */}
    </TouchableOpacity>
);

export default function SignInScreen() {
    const navigation = useNavigation<SignInScreenNavigationProp>();
    const insets = useSafeAreaInsets();
    
    const [email, setEmail] = useState('abc@clc.fitus.edu.vn');
    const [password, setPassword] = useState('.........');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = () => {
        // Cú pháp reset an toàn: chuyển sang RootStack.MainApp
        (navigation as any).reset({
            index: 0,
            routes: [{ name: 'MainApp' }], 
        });
    };
    


    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top ? 0 : 20 }]}>
            
            {/* 1. HEADER (Nút Back) */}
            <View style={styles.header}>

            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* 2. TIÊU ĐỀ */}
                <View style={styles.welcomeContainer}>
                    {/* 💡 SỬA LỖI CHE: Đã được xử lý ở container và header */}
                    <Text style={styles.title}>Welcome Back!</Text> 
                    <Text style={styles.subtitle}>Sign in to continue</Text>
                </View>

                {/* 3. INPUT FIELDS (Email) */}
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

                {/* 4. INPUT FIELDS (Password) */}
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
                
                {/* 5. REMEMBER ME / FORGOT PASSWORD */}
                <View style={styles.optionsContainer}>
                    <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.rememberMe}>
                        <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                            {rememberMe && <Ionicons name="checkmark" size={14} color="white" />}
                        </View>
                        <Text style={styles.rememberMeText}>Remember me</Text>
                    </TouchableOpacity>
                    
                    {/* 💡 SỬ DỤNG navigation.navigate('ForgotPassword') */}
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}> 
                        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>

                {/* 6. SIGN IN BUTTON */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Sign In</Text>
                </TouchableOpacity>

                {/* 7. SIGN UP LINK */}
                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don't have an account? </Text>
                    
                    {/* 💡 SỬ DỤNG navigation.navigate('SignUp') */}
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signUpLink}>Sign up.</Text>
                    </TouchableOpacity>
                </View>

                {/* 8. SOCIAL LOGIN BUTTONS */}
                <View style={styles.socialButtonsContainer}>
                    {/* Nút FACEBOOK */}
                    <SocialButton icon="logo-facebook" label="Facebook" color="#1877F2" />
                    <View style={{ width: 15 }} />
                    {/* Nút GOOGLE */}
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
    header: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        alignSelf: 'flex-start',
    },

    scrollContent: {
        paddingHorizontal: 30,
        paddingBottom: 50,
        alignItems: 'flex-start',
    },
    welcomeContainer: {
        width: '100%',
        marginBottom: 30,
        paddingLeft: 0, 
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    subtitle: {
        fontSize: 20,
        color: '#666',
        marginTop: 5,
    },
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
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#ccc',
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxActive: {
        backgroundColor: '#00C4CC',
        borderColor: '#00C4CC',
    },
    rememberMeText: {
        color: '#666',
        fontSize: 15,
    },
    forgotPasswordText: {
        color: '#00C4CC',
        fontWeight: '600',
        fontSize: 15,
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#00C4CC',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signUpContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 40,
    },
    signUpText: {
        color: '#666',
        fontSize: 15,
    },
    signUpLink: {
        color: '#00C4CC',
        fontWeight: 'bold',
        fontSize: 15,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    socialButton: {
        flex: 1,
        height: 55,
        // Loại bỏ border và nền cũ để sử dụng màu từ props
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});