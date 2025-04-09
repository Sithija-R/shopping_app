import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { BluetoothSpeaker, Camera, Drone, Headphones, Laptop, SmartBulb, Smartphone, Smartwatch, TV, Tablet } from "../../assets";



const products = [
  { id: 1, name: "Smartphone", price: "$499", image: Smartphone },
  { id: 2, name: "Laptop", price: "$899", image: Laptop },
  { id: 3, name: "Headphones", price: "$199", image: Headphones},
  { id: 4, name: "Smartwatch", price: "$199", image: Smartwatch},
  { id: 5, name: "TV", price: "$1199", image: TV },
  { id: 6, name: "Tablet", price: "$299", image: Tablet},
  { id: 7, name: "Camera", price: "$499", image:Camera },
  { id: 8, name: "Bluetooth Speaker", price: "$99", image: BluetoothSpeaker},
  { id: 9, name: "Drone", price: "$699", image: Drone },
  { id: 10, name: "Smart Bulb", price: "$25", image: SmartBulb },
];

export default function Home() {
  const router = useRouter();

  const viewProduct = (product) => {
    router.push({
      pathname: "/viewproduct",
      params: { product: JSON.stringify(product) },
    });
  };

  const renderProductCard = ({ item }) => (
    <Pressable style={styles.productCard} onPress={() => viewProduct(item)}>
     <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </Pressable>
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />

      <View style={{ flex: 1, alignItems: "flex-start" }}>
   
          <Image 
           style={{position:'absolute', top:hp(1), left:"25%", width: hp(25), height:hp(21) }}
          source={require("../../assets/images/logo.png")}
          resizeMode="stretch"/>

        <Image
          style={{ width: hp(27), height: hp(20) }}
          resizeMode="stretch"
          source={require("../../assets/images/elipses.png")}
        />
      </View>

      <View style={{ flex: 5 }}>
        <FlatList
          data={products}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
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
  productList: {
    paddingHorizontal: wp(3),
    paddingBottom: hp(10),
  },
  productCard: {
    flex: 1,
    margin: wp(2),
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
    padding: hp(1),
  },
  productImage: {
    width: wp(30),
    height: hp(15),
    borderRadius: 10,
  },
  productTitle: {
    fontSize: hp(2.2),
    fontWeight: "600",
    marginTop: hp(1),
  },
  productPrice: {
    fontSize: hp(2),
    color: "#EC7117",
    marginTop: hp(1),
  },
});
