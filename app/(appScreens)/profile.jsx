import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../../context/authContext";

export default function OrdersScreen() {
  const { user, logout } = useAuth();
console.log(user)
  const [orders, setOrders] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        try {
          const storedOrders = await AsyncStorage.getItem("orderDetails");
          if (storedOrders) {
            const parsed = JSON.parse(storedOrders);
            setOrders(Array.isArray(parsed) ? parsed : []);
          } else {
            setOrders([]);
          }
        } catch (error) {
          console.error("Error fetching orders from AsyncStorage:", error);
        }
      };

      fetchOrders();
    }, [])
  );
  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderDetailsContainer}>
        {item.image && (
          <Image
            source={item?.image}
            style={styles.orderImage}
            resizeMode="contain"
          />
        )}

        {/* Details on the right side */}
        <View style={styles.orderTextContainer}>
          <Text style={styles.product}>{item.product}</Text>
          <Text style={styles.text}>Price: {item.price}</Text>
          <Text style={styles.text}>Quantity: {item.quantity}</Text>
          <Text style={styles.text}>Total: ${item.totalAmount}</Text>
          <Text style={styles.text}>Address: {item.address}</Text>
          <Text style={styles.text}>Payment: {item.paymentMethod}</Text>
          <Text style={styles.text}>
            Date: {new Date(item.date).toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
            Profile
          </Text>
        </Pressable>

        <Image
          style={{ width: hp(27), height: hp(20) }}
          resizeMode="stretch"
          source={require("../../assets/images/elipses.png")}
        />
      </View>

      <View
        style={{
          paddingHorizontal: wp(8),
          marginBottom: hp(2),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: hp(3), fontWeight: "600", color: "#333" }}>
          Hi,{" "}
          <Text
            style={{ fontSize: hp(3), fontWeight: "700", color: "#0b9c37" }}
          >
            {user?.name}{" "}
            <Text style={{ fontSize: hp(3), fontWeight: "600", color: "#333" }}>
              Welcome back
            </Text>
          </Text>
          !
        </Text>
      </View>

      <View style={{ flex: 4 }}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontWeight: "600",
            color: "#333",
            marginLeft: wp(5),
          }}
        >
          Your Orders
        </Text>
        {orders.length === 0 ? (
          <Text style={styles.emptyText}>No orders yet</Text>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            renderItem={renderOrder}
            contentContainerStyle={{ padding: wp(4) }}
          />
        )}
      </View>
      <View style={{ flex: 0.9, paddingHorizontal: wp(20), paddingTop: hp(5) }}>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: "#0b9c37",
            padding: hp(1.5),
            borderRadius: 40,
            zIndex: 5,
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
            Logout
          </Text>
        </TouchableOpacity>
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
  orderCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    padding: wp(4),
    marginBottom: hp(2),
    elevation: 3,
  },
  orderDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderImage: {
    width: wp(20),
    height: wp(20),
    marginRight: wp(4),
  },
  orderTextContainer: {
    flex: 1,
  },
  product: {
    fontSize: hp(2.3),
    fontWeight: "600",
    marginBottom: hp(0.5),
  },
  text: {
    fontSize: hp(1.8),
    color: "#333",
    marginBottom: hp(0.5),
  },
  emptyText: {
    textAlign: "center",
    fontSize: hp(2.2),
    marginTop: hp(10),
    color: "#999",
  },
});
