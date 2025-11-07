import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen'; 
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'; // 💡 IMPORT MỚI
import ResetPasswordScreen from '../screens/ResetPasswordScreen'; // 💡 IMPORT MỚI
import PasswordResetSuccessScreen from '../screens/PasswordResetSuccessScreen'; // 💡 IMPORT MỚI

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined; // 💡 ĐÃ THÊM ROUTE MỚI
  ResetPassword: undefined;
  ResetPasswordSuccess: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      {/* 💡 ĐĂNG KÝ MÀN HÌNH QUÊN MẬT KHẨU */}
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> 
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <AuthStack.Screen name="ResetPasswordSuccess" component={PasswordResetSuccessScreen} />
    </AuthStack.Navigator>
  );
}