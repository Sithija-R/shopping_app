import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BuyNow({ route, navigation }) {
  const router = useRouter();
  const { product } = useLocalSearchParams();
  const parsedProduct = product ? JSON.parse(product) : null;

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const productPrice = parsedProduct?.price
    ? parseFloat(parsedProduct?.price.replace("$", ""))
    : 0;

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const placeOrder = async () => {
    if (!address) {
      Alert.alert("Error", "Please enter your delivery address.");
      return;
    }

    if (productPrice === 0) {
      Alert.alert("Error", "Invalid price for the product.");
      return;
    }

    const orderDetails = {
      id: Date.now(),
      product: parsedProduct?.name,
      price: parsedProduct?.price,
      image: parsedProduct?.image,
      quantity,
      totalAmount: (productPrice * quantity).toFixed(2),
      address,
      paymentMethod,
      date: new Date().toISOString(),
    };

    Alert.alert(
      "Confirm Order",
      `Product: ${orderDetails.product}\nQuantity: ${orderDetails.quantity}\nTotal: $${orderDetails.totalAmount}\nDelivery Address: ${orderDetails.address}\nPayment Method: ${orderDetails.paymentMethod}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Order cancelled"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: async () => {
            try {
              const existingOrders = await AsyncStorage.getItem("orderDetails");
              let ordersArray = [];

              if (existingOrders) {
                const parsed = JSON.parse(existingOrders);
                if (Array.isArray(parsed)) {
                  ordersArray = parsed;
                } else {
                  console.warn("Existing data was not an array. Overwriting.");
                }
              }

              ordersArray.push(orderDetails);

              await AsyncStorage.setItem(
                "orderDetails",
                JSON.stringify(ordersArray)
              );

              Alert.alert(
                "Order Placed",
                "Your order has been placed successfully!"
              );
              router.push("home");
            } catch (error) {
              console.error("Error placing order:", error);
              Alert.alert("Error", "There was an issue placing your order.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
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
            Buy Now
          </Text>
        </Pressable>

        <Image
          style={{ width: hp(27), height: hp(20) }}
          resizeMode="stretch"
          source={require("../../assets/images/elipses.png")}
        />
      </View>
      <View style={{ flex: 10, paddingHorizontal: wp(6) }}>
        <View style={styles.productContainer}>
          <Image
            source={parsedProduct?.image}
            style={{ width: hp(20), height: hp(20), marginRight: wp(4) }}
            resizeMode="contain"
          />
          <Text style={styles.productTitle}>{parsedProduct?.name}</Text>
          <Text style={styles.productPrice}>{parsedProduct?.price}</Text>
        </View>

       
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={decreaseQuantity}
            style={styles.quantityButton}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={increaseQuantity}
            style={styles.quantityButton}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Delivery Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        
        <View style={styles.paymentContainer}>
          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.paymentMethodContainer}>
            <Text style={styles.paymentText}>{paymentMethod}</Text>
          </View>
        </View>
        <Text style={styles.totalAmount}>
          Total: ${(productPrice * quantity).toFixed(2)}
        </Text>
        <TouchableOpacity
          onPress={placeOrder}
          style={{
            backgroundColor: "#0b9c37",
            padding: hp(2),
            borderRadius: 40,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: hp(2),
              color: "white",
              textAlign: "center",
            }}
          >
            Place Order
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
          zIndex: -5,
        }}
        resizeMode="stretch"
        source={require("../../assets/images/bottomEllipse.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600",
    textAlign: "center",
    marginVertical: hp(2),
  },
  productContainer: {
    alignItems: "center",
    marginTop: hp(9),
    marginVertical: hp(2),
  },
  productTitle: {
    fontSize: hp(2.5),
    fontWeight: "600",
  },
  productPrice: {
    fontSize: hp(2),
    color: "#EC7117",
    marginTop: hp(1),
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(2),
    justifyContent: "center",
  },
  quantityButton: {
    backgroundColor: "#EC7117",
    width: wp(8),
    height: wp(8),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  quantityText: {
    fontSize: hp(2),
    marginHorizontal: wp(4),
  },
  buttonText: {
    color: "#fff",
    fontSize: hp(2),
  },
  inputContainer: {
    marginVertical: hp(2),
  },
  label: {
    fontSize: hp(2),
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: wp(3),
    marginTop: hp(1),
    fontSize: hp(2),
  },
  paymentContainer: {
    marginVertical: hp(2),
  },
  paymentMethodContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: wp(3),
    marginTop: hp(1),
    borderRadius: 10,
  },
  paymentText: {
    fontSize: hp(2),
    fontWeight: "500",
  },
  totalAmount: {
    fontSize: hp(2.5),
    fontWeight: "600",
    textAlign: "center",
    marginVertical: hp(2),
    color: "#EC7117",
  },
});
