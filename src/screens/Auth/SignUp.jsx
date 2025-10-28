import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useMMKVBoolean } from "react-native-mmkv";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../../components/StyledText";
import StyledView from "../../components/StyledView";
import api from "../../utils/api";
import BackArrow from "../../assets/icons/back-arrow.svg";  // Arrow icon

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [darkmode] = useMMKVBoolean("darkmode");
  const navigation = useNavigation(); // Navigation object

  // Handle input changes
  const handleInput = (text, field) => {
    setFormData((prev) => ({ ...prev, [field]: text }));
  };

  // Sign-up API request handler
  const handleSignUp = async () => {
    setError("");  // Reset error message on each request attempt
    // Basic validation
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    // // Email format validation
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailPattern.test(formData.email)) {
    //   setError("Please enter a valid email address.");
    //   return;
    // }

    try {
      const { data } = await api.post("/auth/signup", formData);
      console.log("Signup successful:", data);
      navigation.navigate("LoginScreen");  // Navigate to login after successful signup
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      // Handle different error cases
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Signup failed. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <StyledView>
      <View
        className={`flex-1 items-center ${darkmode ? "bg-[#1C1A22]" : "bg-[#F9F9F9]"}`}
      >
        <View className="w-full mt-20 px-6 items-center">
          {/* Back Arrow Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute justify-center items-center -top-10 left-4 bg-[#F4F4F4] w-[40px] h-[40px] rounded-[100px]"
          >
            <BackArrow width={30} height={30} />
          </TouchableOpacity>

          {/* Title */}
          <StyledText
            value="Create Account"
            className={`text-[33px] font-montserrat-semibold mt-4 self-start mb-8 ${darkmode ? "text-white" : "text-black"}`}
          />

          {/* Firstname Input */}
          <TextInput
            placeholder="Firstname"
            placeholderTextColor={darkmode ? "#C9C9C9" : "#9CA3AF"}
            value={formData.firstname}
            onChangeText={(t) => handleInput(t, "firstname")}
            className={`font-roboto h-[56px] w-[362px] pl-4 rounded-sm mb-4 ${darkmode ? "bg-[#342F3F] text-white" : "bg-[#F4F4F4] text-black"}`}
          />

          {/* Lastname Input */}
          <TextInput
            placeholder="Lastname"
            placeholderTextColor={darkmode ? "#C9C9C9" : "#9CA3AF"}
            value={formData.lastname}
            onChangeText={(t) => handleInput(t, "lastname")}
            className={`font-montserrat h-[56px] w-[362px] pl-4 rounded-sm mb-4 ${darkmode ? "bg-[#342F3F] text-white" : "bg-[#F4F4F4] text-black"}`}
          />

          {/* Email Input */}
          <TextInput
            placeholder="Email Address"
            placeholderTextColor={darkmode ? "#C9C9C9" : "#9CA3AF"}
            value={formData.email}
            onChangeText={(t) => handleInput(t, "email")}
            className={`font-montserrat h-[56px] w-[362px] pl-4 rounded-sm mb-4 ${darkmode ? "bg-[#342F3F] text-white" : "bg-[#F4F4F4] text-black"}`}
          />

          {/* Password Input */}
          <TextInput
            placeholder="Password"
            placeholderTextColor={darkmode ? "#C9C9C9" : "#9CA3AF"}
            secureTextEntry
            value={formData.password}
            onChangeText={(t) => handleInput(t, "password")}
            className={`font-montserrat h-[56px] w-[362px] pl-4 rounded-sm mb-6 ${darkmode ? "bg-[#342F3F] text-white" : "bg-[#F4F4F4] text-black"}`}
          />

          {/* Error Message */}
          {error ? (
            <Text className="text-red-500 text-sm mb-4">{error}</Text>
          ) : null}

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            className="w-[362px] bg-[#8E6CEF] rounded-full py-4"
          >
            <StyledText value="Continue" className="text-white text-[15px] text-center font-montserrat" />
          </TouchableOpacity>

          {/* "Already have an Account?" Section - Left aligned */}
          <View className="flex-row justify-start mt-3 w-[362px]">
            <StyledText value="Already have an Account?" className={`text-[13px] ${darkmode ? "text-gray-300" : "text-black"}`} />
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <StyledText value=" Sign In" className={`text-[13px] font-bold ${darkmode ? "text-white" : "text-black"}`} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </StyledView>
  );
};

export default SignUp;
