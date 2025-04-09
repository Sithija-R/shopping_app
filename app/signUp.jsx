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

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useAuth(); // Get the signUp function from the context
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const passwordConfirmRef = useRef("");

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !nameRef.current ||
      !passwordConfirmRef.current
    ) {
      return; // Remove alert, just return early if fields are not filled
    }
  
    if (passwordRef.current !== passwordConfirmRef.current) {
      return; // Remove alert, just return early if passwords do not match
    }
  
    setLoading(true);
  
    const user = {
      name: nameRef.current,
      email: emailRef.current.trim(),
      password: passwordRef.current,
    };
  
    try {
      await signUp(user.email, user.password, user.name); // Use the signUp function from context
      router.push("signIn"); // Navigate to Sign In page after successful registration
    } catch (error) {
      // Handle the error (you can log it if needed)
      console.error("Failed to register user:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <CustomKeyboardView>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Image
            style={{
              width: hp(27),
              height: hp(20),
            }}
            resizeMode="stretch"
            source={require("../assets/images/elipses.png")}
          />
        </View>

        <View style={{ alignItems: "center", flex: 5, marginTop: hp(8) }}>
          <View style={{ width: "100%", paddingHorizontal: wp(7) }}>
            <Text style={{ fontSize: hp(3), fontWeight: "600" }}>Sign Up</Text>
            <Text style={{ fontSize: hp(2) }}>Create your NextWay account</Text>
            <View style={{ marginTop: hp(2), paddingVertical: hp(2), gap: hp(1) }}>
              <TextInput
                onChangeText={(value) => (nameRef.current = value)}
                style={{
                  fontSize: hp(2),
                  backgroundColor: "#D9D9D9",
                  paddingHorizontal: wp(3),
                  paddingVertical: hp(2),
                  borderRadius: 20,
                }}
                placeholder="Name"
              />
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
              />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                secureTextEntry
                style={{
                  fontSize: hp(2),
                  backgroundColor: "#D9D9D9",
                  paddingHorizontal: wp(3),
                  paddingVertical: hp(2),
                  borderRadius: 20,
                }}
                placeholder="Create password"
              />
              <TextInput
                onChangeText={(value) => (passwordConfirmRef.current = value)}
                secureTextEntry
                style={{
                  fontSize: hp(2),
                  backgroundColor: "#D9D9D9",
                  paddingHorizontal: wp(3),
                  paddingVertical: hp(2),
                  borderRadius: 20,
                }}
                placeholder="Confirm password"
              />
            </View>

            <View>
              {loading ? (
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  {/* Add loading spinner here */}
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleRegister}
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
                    Sign Up
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: hp(1),
            }}
          >
            <Text style={{ fontSize: hp(2) }}>Already have an account?</Text>
            <Pressable onPress={() => router.push("signIn")}>
              <Text style={{ fontWeight: "bold", fontSize: hp(2) }}>
                {" "}
                Sign In
              </Text>
            </Pressable>
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
