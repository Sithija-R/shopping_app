import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ViewProduct() {
  const router = useRouter();
  const { product } = useLocalSearchParams();
  const selectedProduct = product ? JSON.parse(product) : null;

  const [cart, setCart] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchCart = async () => {
        try {
          const storedCart = await AsyncStorage.getItem("cart");
          if (storedCart) {
            setCart(JSON.parse(storedCart));
          }
        } catch (error) {
          console.error("Error fetching cart from AsyncStorage:", error);
        }
      };
      fetchCart();
    }, [])
  );

  const addToCart = async () => {
    try {
      const updatedCart = [...cart, selectedProduct];
      setCart(updatedCart);
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      Alert.alert(
        "Added to Wishlist",
        `${selectedProduct.name} has been added to your wishlist.`
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const buyNow = () => {
    router.push({
      pathname: "/buynow",
      params: { product: JSON.stringify(selectedProduct) },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />

      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <Pressable
          style={{
            position: "absolute",
            top: hp(5),
            left: wp(2),
            zIndex: 5,
            flexDirection: "row",
            marginTop: hp(1),
            alignItems: "center",
            width: "85%",
          }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
          <Text
            style={{ fontSize: wp(5), paddingLeft: wp(5), fontWeight: "600" }}
          >
            Product Details
          </Text>
        </Pressable>

        <Image
          style={{ width: hp(27), height: hp(20) }}
          resizeMode="stretch"
          source={require("../../assets/images/elipses.png")}
        />
      </View>

      <View style={styles.productContainer}>
        {selectedProduct ? (
          <>
            <Image source={selectedProduct.image} style={styles.image} />
            <Text style={styles.title}>{selectedProduct.name}</Text>
            <Text style={styles.price}>{selectedProduct.price}</Text>

            <TouchableOpacity style={styles.button1} onPress={addToCart}>
              <Text style={styles.buttonText}>Add to Wishlist</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2} onPress={buyNow}>
              <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={{ textAlign: "center", marginTop: hp(5) }}>
            Loading product...
          </Text>
        )}
      </View>

      <Image
        style={{
          width: hp(15),
          height: hp(14),
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
        resizeMode="stretch"
        source={require("../../assets/images/bottomEllipse.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp(5),
  },
  image: {
    width: wp(60),
    height: hp(30),
    borderRadius: 10,
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600",
    marginTop: hp(2),
  },
  price: {
    fontSize: hp(2.5),
    color: "#EC7117",
    marginTop: hp(1),
  },
  button1: {
    backgroundColor: "#8bbf77",
    padding: 12,
    borderRadius: 10,
    marginTop: hp(2),
    width: "80%",
    alignItems: "center",
  },
  button2: {
    backgroundColor: "#0b9c37",
    padding: 12,
    borderRadius: 10,
    marginTop: hp(2),
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: hp(2),
    fontWeight: "600",
  },
});
