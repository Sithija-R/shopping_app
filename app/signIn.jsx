import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import CustomKeyboardView from "../components/CustomKeyboardView";
import { useAuth } from "../context/authContext"; // Import useAuth hook

// SignIn Component
export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth(); // Get the login function from the context
  const [loading, setLoading] = useState(false);

  // References for email and password input fields
  const emailRef = useRef("");
  const passwordRef = useRef("");

  // Handle user login
  const handleLogin = async () => {
    const email = emailRef.current.trim();
    const password = passwordRef.current;

    // Validation checks
    if (!email || !password) {
      Alert.alert("Sign In", "All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await login(email, password); // Use login from context
      if (response.success) {
        Alert.alert("Sign In", "Login successful!");
        router.push("home"); // Navigate to the home screen after login
      } else {
        Alert.alert("Sign In", response.msg);
      }
    } catch (error) {
     
      Alert.alert("Sign In", "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomKeyboardView>
        <StatusBar style="dark" />
        <View style={{ flex: 5, alignItems: "flex-start" }}>
          <Image
            style={{
              width: hp(27),
              height: hp(20),
            }}
            resizeMode="stretch"
            source={require("../assets/images/elipses.png")}
          />
        </View>

        <View style={{ alignItems: "center", flex: 4 }}>
          <View
            style={{
              width: "100%",
              paddingHorizontal: wp(7),
              paddingVertical: hp(1),
              marginTop: hp(18),
            }}
          >
            <Text style={{ fontSize: hp(3), fontWeight: "600" }}>Sign in</Text>
            <Text style={{ fontSize: hp(2) }}>Log in to your account</Text>
            <View
              style={{ marginTop: hp(2), paddingVertical: hp(2), gap: hp(2) }}
            >
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{
                  fontSize: hp(2),
                  backgroundColor: "#D9D9D9",
                  paddingHorizontal: wp(3),
                  paddingVertical: hp(2),
                  borderRadius: 20,
                }}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={{
                  fontSize: hp(2),
                  backgroundColor: "#D9D9D9",
                  paddingHorizontal: wp(3),
                  paddingVertical: hp(2),
                  borderRadius: 20,
                }}
                placeholder="Password"
                secureTextEntry
              />
            </View>

            <View>
              {loading ? (
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  {/* Add loading spinner here */}
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleLogin}
                  style={{
                    backgroundColor: "#0b9c37",
                    padding: hp(2),
                    borderRadius: 40,
                  }}
                >
                  <Text
                    style={{
                      fontSize: hp(3),
                      fontWeight: "600",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: hp(1),
              }}
            >
              <Text style={{ fontSize: hp(2) }}>Don't have an account?</Text>
              <Pressable onPress={() => router.push("signUp")}>
                <Text style={{ fontWeight: "bold", fontSize: hp(2) }}>
                  {" "}
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </CustomKeyboardView>

      <Image
        style={{
          width: hp(15),
          height: hp(14),
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex:-5
        }}
        resizeMode="stretch"
        source={require("../assets/images/bottomEllipse.png")}
      />
    </View>
  );
}
