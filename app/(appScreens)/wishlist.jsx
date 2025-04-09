import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";

export default function Whishlist() {
  const [cart, setCart] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
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

  const removeFromCart = async (itemId) => {
    try {
      const updatedCart = cart.filter((item) => item.id !== itemId);

      setCart(updatedCart);

      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));

      console.log("Updated Cart after removal:", updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const renderCartItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        padding: wp(3),
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <Image
        source={item.image}
        style={{ width: hp(8), height: hp(8), marginRight: wp(4) }}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "600", fontSize: hp(2.2) }}>
          {item.name}
        </Text>
        <Text style={{ fontSize: hp(2), color: "#777" }}>{item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <Text style={{ color: "#EC7117", fontWeight: "600", fontSize: hp(2) }}>
          Remove
        </Text>
      </TouchableOpacity>
    </View>
  );

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
        >
          <Text
            style={{ fontSize: wp(5), paddingLeft: wp(5), fontWeight: "600" }}
          >
            Wishlist
          </Text>
        </Pressable>

        <Image
          style={{
            width: hp(27),
            height: hp(20),
          }}
          resizeMode="stretch"
          source={require("../../assets/images/elipses.png")}
        />
      </View>

      <View style={{ flex: 5 }}>
        {cart.length > 0 ? (
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: hp(2.5), fontWeight: "600" }}>
              Your wishlist is empty
            </Text>
          </View>
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
