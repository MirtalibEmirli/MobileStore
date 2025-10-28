import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { useMMKVBoolean } from "react-native-mmkv";
import StyledText from "../../components/StyledText";
import StyledView from "../../components/StyledView";
import Eye from "../../assets/icons/eye.svg";
import EyeOff from "../../assets/icons/Eyeoff.svg";
import api from "../../utils/api";
import { setToken, setRefreshToken} from "../../utils/store";
import { setIsAuthenticated} from "../../utils/store";
import DarkModeToggle from "../../components/DarkModeToggle";
import { useNavigation } from "@react-navigation/native";  // Ensure to import navigation
   
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [darkmode] = useMMKVBoolean("darkmode");
  const navigation = useNavigation();  // Corrected typo

  const handleInput = (text, field) => {
    setFormData((prev) => ({ ...prev, [field]: text }));
  };
  const handleLogin = async () => {
  try {
    const { data } = await api.post("/auth/login", formData);
    
    // Save with correct keys

    setToken(data.accessToken);
    setRefreshToken(data.refreshToken);

    setIsAuthenticated(true);
    
console.log('Stored accessToken:', storage.getString('accessToken'));
console.log('Stored refreshToken:', storage.getString('refreshToken'));
    
  } catch (error) {
    console.error("Login error:", error);
  }
};
  return (
    <StyledView>
      <View
        className={`flex-1 items-center ${darkmode ? "bg-[#1C1A22]" : "bg-[#F9F9F9]"}`}
      >
        <View className="w-full mt-24 px-6 items-center">
          <StyledText
            value="Sign in"
            className={`text-[33px] font-montserrat font-bold self-start mb-8 ${
              darkmode ? "text-white" : "text-black"
            }`}
          />

          {/* Email Input */}
          <TextInput
            placeholder="Email Address"
            placeholderTextColor={darkmode ? "#C9C9C9" : "#9CA3AF"}
            value={formData.email}
            onChangeText={(t) => handleInput(t, "email")}
            className={`font-montserrat h-[56px] w-[362px] pl-4 rounded-sm mb-4 ${
              darkmode ? "bg-[#342F3F] text-white" : "bg-[#F4F4F4] text-black"
            }`}
          />

          {/* Password Input */}
          <View className="w-[362px] relative">
            <TextInput
              placeholder="Password"
              placeholderTextColor={darkmode ? "#C9C9C9" : "#9CA3AF"}
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(t) => handleInput(t, "password")}
              className={`font-montserrat h-[56px] pl-4 pr-12 rounded-sm ${
                darkmode ? "bg-[#342F3F] text-white" : "bg-[#F4F4F4] text-black"
              }`}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((p) => !p)}
              className="absolute right-4 top-[16px]"
            >
              {showPassword ? (
                <EyeOff width={22} height={22} />
              ) : (
                <Eye width={22} height={22} />
              )}
            </TouchableOpacity>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleLogin}
            className="w-[362px] bg-[#8E6CEF] rounded-full py-4 mt-6"
          >
            <StyledText
              value="Continue"
              className="text-white text-[15px] text-center font-montserrat"
            />
          </TouchableOpacity>

          <View className="flex-row justify-center mt-3">
            <StyledText
              value="Don’t have an Account?"
              className={`text-[13px] ${darkmode ? "text-gray-300" : "text-black"}`}
            />
            <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
              <StyledText
                value=" Create One"
                className={`text-[13px] font-bold ${
                  darkmode ? "text-white" : "text-black"
                }`}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </StyledView>
  );
};

export default Login;
